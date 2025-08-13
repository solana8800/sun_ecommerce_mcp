# Troubleshooting Guide - Sun eCommerce MCP Server

Hướng dẫn xử lý các sự cố thường gặp khi sử dụng Sun eCommerce MCP Server.

## 🔧 Common Issues

### Connection Issues

#### Problem: Connection Timeout
```
Error: Request timeout after 30000ms
Code: TIMEOUT_ERROR
```

**Possible Causes:**
- Network connectivity issues
- Server overload
- Firewall blocking requests
- DNS resolution problems

**Solutions:**
```typescript
// 1. Increase timeout
const client = new SunEcommerceClient({
  baseURL: process.env.SUN_ECOMMERCE_BASE_URL,
  timeout: 60000, // Increase to 60 seconds
  retries: 3
});

// 2. Implement exponential backoff
async function makeRequestWithBackoff(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (error.code === 'TIMEOUT_ERROR' && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

// 3. Check network connectivity
async function checkConnectivity() {
  try {
    const response = await fetch(`${baseURL}/health`, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.error('Connectivity check failed:', error.message);
    return false;
  }
}
```

#### Problem: SSL/TLS Certificate Errors
```
Error: unable to verify the first certificate
Code: CERT_UNTRUSTED
```

**Solutions:**
```typescript
// For development only - DO NOT use in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Better solution: Configure proper certificates
const https = require('https');
const fs = require('fs');

const agent = new https.Agent({
  ca: fs.readFileSync('path/to/ca-certificate.pem'),
  cert: fs.readFileSync('path/to/client-certificate.pem'),
  key: fs.readFileSync('path/to/client-key.pem')
});

const client = new SunEcommerceClient({
  baseURL: process.env.SUN_ECOMMERCE_BASE_URL,
  httpsAgent: agent
});
```

### Authentication Issues

#### Problem: Invalid Authentication Token
```
Error: Authentication failed
Code: AUTH_INVALID_TOKEN
Status: 401
```

**Diagnostic Steps:**
```typescript
// 1. Verify token format
function validateTokenFormat(token) {
  if (!token) {
    throw new Error('Token is missing');
  }
  
  if (!token.startsWith('sun_')) {
    throw new Error('Invalid token format - should start with "sun_"');
  }
  
  if (token.length < 32) {
    throw new Error('Token too short - minimum 32 characters');
  }
  
  return true;
}

// 2. Test token validity
async function testTokenValidity(token) {
  try {
    const response = await fetch(`${baseURL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 401) {
      throw new Error('Token is invalid or expired');
    }
    
    if (response.status === 403) {
      throw new Error('Token lacks required permissions');
    }
    
    return response.ok;
  } catch (error) {
    console.error('Token validation failed:', error.message);
    return false;
  }
}

// 3. Check token expiration
function checkTokenExpiration(token) {
  try {
    // Decode JWT token (if applicable)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    
    if (currentTime >= expirationTime) {
      throw new Error('Token has expired');
    }
    
    const timeUntilExpiration = expirationTime - currentTime;
    console.log(`Token expires in ${Math.floor(timeUntilExpiration / 1000 / 60)} minutes`);
    
    return true;
  } catch (error) {
    console.error('Token expiration check failed:', error.message);
    return false;
  }
}
```

**Solutions:**
```typescript
// 1. Refresh expired token
class TokenManager {
  private token: string;
  private refreshToken: string;
  private expiresAt: Date;
  
  async getValidToken(): Promise<string> {
    if (this.isTokenExpired()) {
      await this.refreshAccessToken();
    }
    return this.token;
  }
  
  private isTokenExpired(): boolean {
    return this.expiresAt && new Date() > this.expiresAt;
  }
  
  private async refreshAccessToken(): Promise<void> {
    try {
      const response = await fetch(`${baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh_token: this.refreshToken
        })
      });
      
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      
      const data = await response.json();
      this.token = data.access_token;
      this.expiresAt = new Date(Date.now() + data.expires_in * 1000);
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new Error('Authentication required - please login again');
    }
  }
}
```

### API Response Issues

#### Problem: Malformed JSON Response
```
Error: Unexpected token < in JSON at position 0
Code: JSON_PARSE_ERROR
```

**Diagnostic Steps:**
```typescript
// 1. Check response content type
async function debugResponse(url, options) {
  const response = await fetch(url, options);
  
  console.log('Response Status:', response.status);
  console.log('Response Headers:', Object.fromEntries(response.headers));
  
  const contentType = response.headers.get('content-type');
  
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.log('Non-JSON Response:', text);
    throw new Error(`Expected JSON but received ${contentType}: ${text}`);
  }
  
  try {
    return await response.json();
  } catch (error) {
    const text = await response.text();
    console.error('JSON Parse Error. Raw response:', text);
    throw new Error(`Invalid JSON response: ${text}`);
  }
}

// 2. Handle different response types
async function safeApiCall(url, options) {
  try {
    const response = await fetch(url, options);
    
    // Handle different status codes
    switch (response.status) {
      case 200:
      case 201:
        return await response.json();
      
      case 204:
        return null; // No content
      
      case 400:
        const errorData = await response.json();
        throw new ValidationError(errorData.message, errorData.errors);
      
      case 401:
        throw new AuthenticationError('Authentication required');
      
      case 403:
        throw new AuthorizationError('Insufficient permissions');
      
      case 404:
        throw new NotFoundError('Resource not found');
      
      case 429:
        const retryAfter = response.headers.get('retry-after');
        throw new RateLimitError(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerError(`Server error: ${response.status}`);
      
      default:
        throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network request failed');
    }
    throw error;
  }
}
```

### Data Validation Issues

#### Problem: Product Creation Fails
```
Error: Validation failed
Code: VALIDATION_ERROR
Details: {
  "sku": ["SKU already exists"],
  "price": ["Price must be greater than 0"]
}
```

**Solutions:**
```typescript
// 1. Pre-validate data before API call
const productValidationSchema = {
  name: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 255
  },
  sku: {
    required: true,
    type: 'string',
    pattern: /^[A-Z0-9-_]+$/,
    maxLength: 50
  },
  price: {
    required: true,
    type: 'number',
    minimum: 0.01
  },
  description: {
    type: 'string',
    maxLength: 5000
  }
};

function validateProductData(data) {
  const errors = [];
  
  for (const [field, rules] of Object.entries(productValidationSchema)) {
    const value = data[field];
    
    // Check required fields
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    
    // Skip validation if field is optional and empty
    if (!rules.required && (value === undefined || value === null || value === '')) {
      continue;
    }
    
    // Type validation
    if (rules.type === 'string' && typeof value !== 'string') {
      errors.push(`${field} must be a string`);
    }
    
    if (rules.type === 'number' && typeof value !== 'number') {
      errors.push(`${field} must be a number`);
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${field} must be at least ${rules.minLength} characters`);
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${field} must be no more than ${rules.maxLength} characters`);
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(`${field} format is invalid`);
    }
    
    // Numeric validation
    if (rules.minimum && value < rules.minimum) {
      errors.push(`${field} must be at least ${rules.minimum}`);
    }
  }
  
  if (errors.length > 0) {
    throw new ValidationError('Validation failed', errors);
  }
  
  return true;
}

// 2. Handle duplicate SKU errors
async function createProductWithUniqueSkU(productData) {
  try {
    validateProductData(productData);
    return await apiClient.createProduct(productData);
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR' && error.details?.sku?.includes('SKU already exists')) {
      // Generate new SKU
      const timestamp = Date.now().toString().slice(-6);
      const newSku = `${productData.sku}-${timestamp}`;
      
      console.warn(`SKU ${productData.sku} already exists, trying ${newSku}`);
      
      return createProductWithUniqueSkU({
        ...productData,
        sku: newSku
      });
    }
    throw error;
  }
}
```

### Performance Issues

#### Problem: Slow API Responses
```
Warning: API response time > 5000ms
Operation: searchProducts
Duration: 8234ms
```

**Diagnostic Steps:**
```typescript
// 1. Measure and log performance
class PerformanceMonitor {
  async measureApiCall(operation, apiCall) {
    const startTime = Date.now();
    
    try {
      const result = await apiCall();
      const duration = Date.now() - startTime;
      
      // Log slow operations
      if (duration > 5000) {
        console.warn(`Slow API call detected`, {
          operation,
          duration,
          timestamp: new Date().toISOString()
        });
      }
      
      // Track metrics
      this.recordMetric(`api.${operation}.duration`, duration);
      this.recordMetric(`api.${operation}.success`, 1);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.recordMetric(`api.${operation}.error`, 1);
      this.recordMetric(`api.${operation}.duration`, duration);
      throw error;
    }
  }
}

// 2. Optimize search queries
function optimizeSearchQuery(query) {
  return {
    ...query,
    // Limit results
    limit: Math.min(query.limit || 20, 100),
    
    // Only fetch necessary fields
    fields: query.fields || ['id', 'name', 'price', 'image_url'],
    
    // Use indexes
    sort_by: query.sort_by || 'created_at',
    
    // Add filters to reduce dataset
    filters: {
      ...query.filters,
      status: 'active' // Only search active products
    }
  };
}

// 3. Implement caching
class CachedApiClient {
  private cache = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes
  
  async searchProducts(query) {
    const cacheKey = JSON.stringify(query);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      console.log('Cache hit for search query');
      return cached.data;
    }
    
    const result = await apiClient.searchProducts(optimizeSearchQuery(query));
    
    this.cache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });
    
    return result;
  }
}
```

### Rate Limiting Issues

#### Problem: Rate Limit Exceeded
```
Error: Rate limit exceeded
Code: RATE_LIMIT_EXCEEDED
Status: 429
Retry-After: 60
```

**Solutions:**
```typescript
// 1. Implement rate limiting with queue
class RateLimitedClient {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private requestsPerSecond = 10;
  private lastRequestTime = 0;
  
  async makeRequest(apiCall) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await apiCall();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }
  
  private async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return;
    }
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      const minInterval = 1000 / this.requestsPerSecond;
      
      if (timeSinceLastRequest < minInterval) {
        await new Promise(resolve => 
          setTimeout(resolve, minInterval - timeSinceLastRequest)
        );
      }
      
      const request = this.queue.shift();
      this.lastRequestTime = Date.now();
      
      try {
        await request();
      } catch (error) {
        if (error.status === 429) {
          // Re-queue the request
          this.queue.unshift(request);
          
          // Wait for retry-after period
          const retryAfter = parseInt(error.headers['retry-after'] || '60');
          console.log(`Rate limited, waiting ${retryAfter} seconds`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        }
      }
    }
    
    this.processing = false;
  }
}

// 2. Batch operations to reduce API calls
class BatchProcessor {
  private batchSize = 10;
  private batchDelay = 1000;
  
  async batchCreateProducts(products) {
    const results = [];
    
    for (let i = 0; i < products.length; i += this.batchSize) {
      const batch = products.slice(i, i + this.batchSize);
      
      console.log(`Processing batch ${Math.floor(i / this.batchSize) + 1}/${Math.ceil(products.length / this.batchSize)}`);
      
      const batchPromises = batch.map(product => 
        rateLimitedClient.makeRequest(() => apiClient.createProduct(product))
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
      
      // Delay between batches
      if (i + this.batchSize < products.length) {
        await new Promise(resolve => setTimeout(resolve, this.batchDelay));
      }
    }
    
    return results;
  }
}
```

## 🔍 Debugging Tools

### Debug Mode

```typescript
// Enable debug logging
const client = new SunEcommerceClient({
  baseURL: process.env.SUN_ECOMMERCE_BASE_URL,
  debug: true, // Enable debug mode
  logLevel: 'debug'
});

// Custom debug logger
class DebugLogger {
  static logRequest(method, url, headers, body) {
    if (process.env.DEBUG_API === 'true') {
      console.log('🔵 API Request:', {
        method,
        url,
        headers: this.sanitizeHeaders(headers),
        body: this.sanitizeBody(body)
      });
    }
  }
  
  static logResponse(status, headers, body, duration) {
    if (process.env.DEBUG_API === 'true') {
      console.log('🟢 API Response:', {
        status,
        headers: Object.fromEntries(headers),
        body: this.truncateBody(body),
        duration: `${duration}ms`
      });
    }
  }
  
  private static sanitizeHeaders(headers) {
    const sanitized = { ...headers };
    if (sanitized.authorization) {
      sanitized.authorization = 'Bearer ***';
    }
    return sanitized;
  }
  
  private static sanitizeBody(body) {
    if (typeof body === 'string') {
      try {
        const parsed = JSON.parse(body);
        return this.sanitizeObject(parsed);
      } catch {
        return body.length > 1000 ? body.substring(0, 1000) + '...' : body;
      }
    }
    return this.sanitizeObject(body);
  }
  
  private static sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    const sanitized = { ...obj };
    ['password', 'token', 'secret', 'key'].forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***';
      }
    });
    
    return sanitized;
  }
  
  private static truncateBody(body) {
    const str = typeof body === 'string' ? body : JSON.stringify(body);
    return str.length > 2000 ? str.substring(0, 2000) + '...' : str;
  }
}
```

### Health Check Utility

```typescript
// Comprehensive health check
class HealthChecker {
  async runDiagnostics() {
    console.log('🔍 Running Sun eCommerce API Diagnostics...');
    
    const results = {
      connectivity: await this.checkConnectivity(),
      authentication: await this.checkAuthentication(),
      apiEndpoints: await this.checkApiEndpoints(),
      performance: await this.checkPerformance()
    };
    
    this.printDiagnosticReport(results);
    return results;
  }
  
  private async checkConnectivity() {
    try {
      const start = Date.now();
      const response = await fetch(`${baseURL}/health`, { timeout: 5000 });
      const duration = Date.now() - start;
      
      return {
        status: response.ok ? 'healthy' : 'unhealthy',
        responseTime: duration,
        statusCode: response.status
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }
  
  private async checkAuthentication() {
    try {
      const response = await apiClient.getProducts({ limit: 1 });
      return {
        status: response.success ? 'valid' : 'invalid',
        error: response.success ? null : response.error
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }
  
  private async checkApiEndpoints() {
    const endpoints = [
      { name: 'getProducts', call: () => apiClient.getProducts({ limit: 1 }) },
      { name: 'getCategories', call: () => apiClient.getCategories({ limit: 1 }) },
      { name: 'getPricingRules', call: () => apiClient.getPricingRules({ limit: 1 }) }
    ];
    
    const results = {};
    
    for (const endpoint of endpoints) {
      try {
        const start = Date.now();
        const result = await endpoint.call();
        const duration = Date.now() - start;
        
        results[endpoint.name] = {
          status: result.success ? 'working' : 'error',
          responseTime: duration,
          error: result.success ? null : result.error
        };
      } catch (error) {
        results[endpoint.name] = {
          status: 'error',
          error: error.message
        };
      }
    }
    
    return results;
  }
  
  private async checkPerformance() {
    const tests = [
      {
        name: 'Small Query',
        test: () => apiClient.getProducts({ limit: 10 })
      },
      {
        name: 'Search Query',
        test: () => apiClient.searchProducts({ query: 'test', limit: 20 })
      }
    ];
    
    const results = {};
    
    for (const test of tests) {
      const times = [];
      
      // Run test 3 times
      for (let i = 0; i < 3; i++) {
        try {
          const start = Date.now();
          await test.test();
          times.push(Date.now() - start);
        } catch (error) {
          times.push(null);
        }
      }
      
      const validTimes = times.filter(t => t !== null);
      results[test.name] = {
        averageTime: validTimes.length > 0 
          ? Math.round(validTimes.reduce((a, b) => a + b) / validTimes.length)
          : null,
        successRate: `${validTimes.length}/3`
      };
    }
    
    return results;
  }
  
  private printDiagnosticReport(results) {
    console.log('\n📊 Diagnostic Report:');
    console.log('='.repeat(50));
    
    // Connectivity
    console.log(`\n🌐 Connectivity: ${results.connectivity.status}`);
    if (results.connectivity.responseTime) {
      console.log(`   Response Time: ${results.connectivity.responseTime}ms`);
    }
    if (results.connectivity.error) {
      console.log(`   Error: ${results.connectivity.error}`);
    }
    
    // Authentication
    console.log(`\n🔐 Authentication: ${results.authentication.status}`);
    if (results.authentication.error) {
      console.log(`   Error: ${results.authentication.error}`);
    }
    
    // API Endpoints
    console.log('\n🔌 API Endpoints:');
    for (const [endpoint, result] of Object.entries(results.apiEndpoints)) {
      console.log(`   ${endpoint}: ${result.status} (${result.responseTime}ms)`);
      if (result.error) {
        console.log(`     Error: ${result.error}`);
      }
    }
    
    // Performance
    console.log('\n⚡ Performance:');
    for (const [test, result] of Object.entries(results.performance)) {
      console.log(`   ${test}: ${result.averageTime}ms avg (${result.successRate})`);
    }
    
    console.log('\n' + '='.repeat(50));
  }
}

// Usage
const healthChecker = new HealthChecker();
healthChecker.runDiagnostics();
```

## 📞 Getting Help

### Support Channels

1. **Documentation**: Check the [API Reference](./api-reference.md) and [Integration Guide](./integration-guide.md)
2. **GitHub Issues**: Report bugs and request features
3. **Community Forum**: Ask questions and share solutions
4. **Email Support**: technical-support@sunecommerce.com

### When Reporting Issues

Include the following information:

```typescript
// Error report template
const errorReport = {
  // Environment
  environment: process.env.NODE_ENV,
  nodeVersion: process.version,
  clientVersion: '1.0.0',
  
  // Error details
  error: {
    message: error.message,
    code: error.code,
    stack: error.stack
  },
  
  // Request details
  request: {
    method: 'POST',
    endpoint: '/api/products',
    headers: sanitizeHeaders(headers),
    body: sanitizeBody(body)
  },
  
  // Response details (if any)
  response: {
    status: response?.status,
    headers: response?.headers,
    body: response?.body
  },
  
  // Timing
  timestamp: new Date().toISOString(),
  duration: requestDuration
};
```

### Emergency Contacts

- **Critical Issues**: emergency@sunecommerce.com
- **Security Issues**: security@sunecommerce.com
- **Phone Support**: +1-800-SUN-ECOM (business hours)

---

*Nếu bạn gặp vấn đề không được đề cập trong hướng dẫn này, vui lòng liên hệ với đội ngũ hỗ trợ kỹ thuật.*