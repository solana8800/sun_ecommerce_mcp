# Best Practices - Sun eCommerce MCP Server

Hướng dẫn các thực hành tốt nhất khi sử dụng Sun eCommerce MCP Server để đảm bảo hiệu năng, bảo mật và khả năng mở rộng tối ưu.

## 🏗️ Architecture & Design

### API Client Design

#### Connection Management
```typescript
// ✅ Good: Sử dụng connection pooling
const apiClient = new SunEcommerceClient({
  baseURL: process.env.SUN_ECOMMERCE_BASE_URL,
  timeout: 30000,
  retries: 3,
  keepAlive: true,
  maxConnections: 10
});

// ❌ Bad: Tạo connection mới cho mỗi request
const makeRequest = () => {
  const client = new SunEcommerceClient(config);
  return client.createProduct(data);
};
```

#### Error Handling Strategy
```typescript
// ✅ Good: Comprehensive error handling
async function createProductSafely(productData) {
  try {
    const result = await apiClient.createProduct(productData);
    
    if (!result.success) {
      // Log business logic errors
      logger.warn('Product creation failed', {
        error: result.error,
        productData: sanitizeForLogging(productData)
      });
      
      // Handle specific error types
      switch (result.error.code) {
        case 'VALIDATION_ERROR':
          return handleValidationError(result.error);
        case 'DUPLICATE_SKU':
          return handleDuplicateError(result.error);
        default:
          throw new BusinessError(result.error.message);
      }
    }
    
    return result.data;
  } catch (error) {
    // Log system errors
    logger.error('API call failed', {
      error: error.message,
      stack: error.stack,
      operation: 'createProduct'
    });
    
    // Implement retry logic for transient errors
    if (isRetryableError(error)) {
      return retryWithBackoff(() => createProductSafely(productData));
    }
    
    throw error;
  }
}

// ❌ Bad: Minimal error handling
async function createProduct(data) {
  const result = await apiClient.createProduct(data);
  return result.data; // Không kiểm tra success
}
```

### Batch Operations

#### Efficient Bulk Processing
```typescript
// ✅ Good: Batch processing với rate limiting
async function bulkCreateProducts(products) {
  const BATCH_SIZE = 10;
  const DELAY_BETWEEN_BATCHES = 1000; // 1 second
  
  const results = [];
  
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    
    // Process batch concurrently
    const batchPromises = batch.map(product => 
      createProductSafely(product)
    );
    
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);
    
    // Rate limiting
    if (i + BATCH_SIZE < products.length) {
      await delay(DELAY_BETWEEN_BATCHES);
    }
  }
  
  return results;
}

// ❌ Bad: Xử lý tuần tự hoặc quá nhiều concurrent requests
async function bulkCreateProductsBad(products) {
  // Tuần tự - chậm
  const results = [];
  for (const product of products) {
    results.push(await createProduct(product));
  }
  
  // Hoặc quá nhiều concurrent - có thể bị rate limit
  return Promise.all(products.map(createProduct));
}
```

## 🔐 Security Best Practices

### Authentication & Authorization

#### Token Management
```typescript
// ✅ Good: Secure token handling
class TokenManager {
  private token: string;
  private expiresAt: Date;
  
  constructor() {
    // Đọc token từ secure storage, không hardcode
    this.token = process.env.SUN_ECOMMERCE_AUTH_TOKEN;
    if (!this.token) {
      throw new Error('Authentication token not configured');
    }
  }
  
  getToken(): string {
    if (this.isExpired()) {
      this.refreshToken();
    }
    return this.token;
  }
  
  private isExpired(): boolean {
    return this.expiresAt && new Date() > this.expiresAt;
  }
  
  private refreshToken(): void {
    // Implement token refresh logic
  }
}

// ❌ Bad: Hardcoded tokens
const API_TOKEN = 'sun-ecommerce-token-123'; // Không bao giờ làm thế này!
```

#### Data Sanitization
```typescript
// ✅ Good: Sanitize input data
function sanitizeProductData(input: any): ProductData {
  return {
    name: validator.escape(input.name?.trim()),
    description: validator.escape(input.description?.trim()),
    price: parseFloat(input.price) || 0,
    sku: input.sku?.replace(/[^a-zA-Z0-9-_]/g, ''),
    // Validate và sanitize tất cả fields
  };
}

// ❌ Bad: Sử dụng raw input
function createProduct(rawInput) {
  return apiClient.createProduct(rawInput); // Nguy hiểm!
}
```

### Sensitive Data Handling

```typescript
// ✅ Good: Không log sensitive data
function sanitizeForLogging(data: any): any {
  const sanitized = { ...data };
  
  // Remove sensitive fields
  delete sanitized.password;
  delete sanitized.creditCard;
  delete sanitized.ssn;
  
  // Mask email
  if (sanitized.email) {
    sanitized.email = maskEmail(sanitized.email);
  }
  
  return sanitized;
}

// ❌ Bad: Log toàn bộ data
logger.info('Creating product', { productData }); // Có thể chứa sensitive data
```

## ⚡ Performance Optimization

### Caching Strategies

#### Multi-level Caching
```typescript
// ✅ Good: Implement caching layers
class ProductService {
  private memoryCache = new Map();
  private redisCache: Redis;
  
  async getProduct(id: string): Promise<Product> {
    // Level 1: Memory cache (fastest)
    if (this.memoryCache.has(id)) {
      return this.memoryCache.get(id);
    }
    
    // Level 2: Redis cache
    const cached = await this.redisCache.get(`product:${id}`);
    if (cached) {
      const product = JSON.parse(cached);
      this.memoryCache.set(id, product);
      return product;
    }
    
    // Level 3: API call
    const product = await apiClient.getProduct({ product_id: id });
    
    // Cache the result
    await this.redisCache.setex(`product:${id}`, 3600, JSON.stringify(product));
    this.memoryCache.set(id, product);
    
    return product;
  }
  
  async invalidateCache(id: string): Promise<void> {
    this.memoryCache.delete(id);
    await this.redisCache.del(`product:${id}`);
  }
}
```

#### Smart Cache Invalidation
```typescript
// ✅ Good: Intelligent cache invalidation
class CacheManager {
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const result = await apiClient.updateProduct({ product_id: id, ...updates });
    
    if (result.success) {
      // Invalidate related caches
      await this.invalidateProductCache(id);
      await this.invalidateCategoryCache(result.data.category_id);
      await this.invalidateSearchCache(); // If product affects search results
    }
    
    return result;
  }
}
```

### Database Query Optimization

#### Efficient Search Patterns
```typescript
// ✅ Good: Optimized search with pagination
async function searchProducts(criteria: SearchCriteria) {
  const params = {
    query: criteria.query,
    limit: Math.min(criteria.limit || 20, 100), // Cap limit
    offset: criteria.offset || 0,
    sort_by: criteria.sortBy || 'created_at',
    sort_order: criteria.sortOrder || 'desc',
    // Only include necessary fields
    fields: ['id', 'name', 'price', 'image_url']
  };
  
  return apiClient.searchProducts(params);
}

// ❌ Bad: Inefficient search
async function searchProductsBad(query: string) {
  // Lấy tất cả products rồi filter client-side
  const allProducts = await apiClient.searchProducts({ limit: 10000 });
  return allProducts.filter(p => p.name.includes(query));
}
```

## 📊 Data Management

### Product Data Modeling

#### Consistent Data Structure
```typescript
// ✅ Good: Well-structured product data
interface ProductData {
  // Required fields
  name: string;
  sku: string;
  price: number;
  
  // Optional but recommended
  description?: string;
  category_id?: string;
  images?: ProductImage[];
  
  // Variants for configurable products
  variants?: ProductVariant[];
  
  // SEO fields
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  
  // Metadata
  metadata?: Record<string, any>;
}

// Validation schema
const productSchema = z.object({
  name: z.string().min(1).max(255),
  sku: z.string().regex(/^[A-Z0-9-_]+$/),
  price: z.number().positive(),
  description: z.string().max(5000).optional(),
  // ... other validations
});
```

#### Inventory Management
```typescript
// ✅ Good: Proactive inventory management
class InventoryManager {
  async checkAndReserveInventory(items: CartItem[]): Promise<ReservationResult> {
    // Check availability first
    const availabilityChecks = await Promise.all(
      items.map(item => 
        apiClient.checkInventory({
          product_id: item.product_id,
          variant_id: item.variant_id,
          check_reservations: true
        })
      )
    );
    
    // Validate all items are available
    const unavailableItems = availabilityChecks
      .filter(check => check.available_quantity < items[check.index].quantity);
    
    if (unavailableItems.length > 0) {
      throw new InsufficientInventoryError(unavailableItems);
    }
    
    // Reserve inventory
    return apiClient.reserveInventory({
      items: items.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity
      })),
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    });
  }
}
```

### Pricing Strategy

#### Dynamic Pricing Implementation
```typescript
// ✅ Good: Flexible pricing system
class PricingEngine {
  async calculatePrice(items: PriceCalculationItem[], context: PricingContext): Promise<PriceResult> {
    // Apply pricing rules in order of priority
    const pricingRules = await this.getActivePricingRules(context);
    
    let totalPrice = 0;
    let totalDiscount = 0;
    const appliedRules: string[] = [];
    
    for (const item of items) {
      let itemPrice = item.base_price * item.quantity;
      let itemDiscount = 0;
      
      // Apply rules in priority order
      for (const rule of pricingRules) {
        if (this.isRuleApplicable(rule, item, context)) {
          const discount = this.calculateRuleDiscount(rule, item, context);
          itemDiscount += discount;
          appliedRules.push(rule.id);
        }
      }
      
      totalPrice += itemPrice;
      totalDiscount += itemDiscount;
    }
    
    return {
      subtotal: totalPrice,
      discount: totalDiscount,
      total: totalPrice - totalDiscount,
      applied_rules: appliedRules
    };
  }
}
```

## 🌐 Internationalization

### Multi-language Support

#### Translation Management
```typescript
// ✅ Good: Systematic translation approach
class TranslationManager {
  async createProductWithTranslations(
    productData: ProductData,
    translations: Record<string, Partial<ProductData>>
  ): Promise<Product> {
    // Create base product first
    const product = await apiClient.createProduct(productData);
    
    if (!product.success) {
      throw new Error('Failed to create base product');
    }
    
    // Create translations
    const translationPromises = Object.entries(translations).map(
      ([languageCode, translationData]) =>
        apiClient.createProductTranslation({
          product_id: product.data.id,
          language_code: languageCode,
          ...translationData
        })
    );
    
    await Promise.allSettled(translationPromises);
    
    return product.data;
  }
  
  async getLocalizedProduct(productId: string, language: string): Promise<Product> {
    const [product, translation] = await Promise.all([
      apiClient.getProduct({ product_id: productId }),
      apiClient.getProductTranslation({ product_id: productId, language_code: language })
    ]);
    
    if (translation.success) {
      // Merge translation data
      return {
        ...product.data,
        ...translation.data
      };
    }
    
    return product.data;
  }
}
```

### Currency Handling

```typescript
// ✅ Good: Proper currency handling
class CurrencyManager {
  private exchangeRates: Map<string, number> = new Map();
  
  async convertPrice(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    if (fromCurrency === toCurrency) {
      return amount;
    }
    
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    return Math.round(amount * rate * 100) / 100; // Round to 2 decimal places
  }
  
  formatPrice(amount: number, currency: string, locale: string): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
}
```

## 🔄 Integration Patterns

### Event-Driven Architecture

#### Webhook Implementation
```typescript
// ✅ Good: Robust webhook handling
class WebhookHandler {
  async handleProductUpdate(webhook: WebhookPayload): Promise<void> {
    try {
      // Verify webhook signature
      if (!this.verifySignature(webhook)) {
        throw new Error('Invalid webhook signature');
      }
      
      // Process idempotently
      const processed = await this.isAlreadyProcessed(webhook.id);
      if (processed) {
        return; // Already processed
      }
      
      // Handle the event
      await this.processProductUpdate(webhook.data);
      
      // Mark as processed
      await this.markAsProcessed(webhook.id);
      
    } catch (error) {
      // Log error and potentially retry
      logger.error('Webhook processing failed', {
        webhookId: webhook.id,
        error: error.message
      });
      
      throw error; // Let the webhook sender know to retry
    }
  }
}
```

### Third-party Integrations

#### External Service Integration
```typescript
// ✅ Good: Resilient external service integration
class ExternalServiceClient {
  private circuitBreaker: CircuitBreaker;
  
  constructor() {
    this.circuitBreaker = new CircuitBreaker(this.makeRequest.bind(this), {
      timeout: 5000,
      errorThresholdPercentage: 50,
      resetTimeout: 30000
    });
  }
  
  async syncProduct(product: Product): Promise<void> {
    try {
      await this.circuitBreaker.fire(product);
    } catch (error) {
      if (error.name === 'CircuitBreakerOpenError') {
        // Queue for later processing
        await this.queueForRetry(product);
      } else {
        throw error;
      }
    }
  }
  
  private async makeRequest(product: Product): Promise<void> {
    // Actual API call to external service
    const response = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(product)
    });
    
    if (!response.ok) {
      throw new Error(`External service error: ${response.status}`);
    }
  }
}
```

## 📈 Monitoring & Observability

### Logging Best Practices

```typescript
// ✅ Good: Structured logging
class Logger {
  info(message: string, context: Record<string, any> = {}): void {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      service: 'ecommerce-api',
      ...context
    }));
  }
  
  error(message: string, context: Record<string, any> = {}): void {
    console.error(JSON.stringify({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      service: 'ecommerce-api',
      ...context
    }));
  }
}

// Usage
logger.info('Product created successfully', {
  productId: product.id,
  sku: product.sku,
  userId: user.id,
  duration: Date.now() - startTime
});
```

### Metrics Collection

```typescript
// ✅ Good: Performance metrics
class MetricsCollector {
  private metrics: Map<string, number> = new Map();
  
  async trackApiCall<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const startTime = Date.now();
    
    try {
      const result = await fn();
      
      // Track success metrics
      this.incrementCounter(`api.${operation}.success`);
      this.recordDuration(`api.${operation}.duration`, Date.now() - startTime);
      
      return result;
    } catch (error) {
      // Track error metrics
      this.incrementCounter(`api.${operation}.error`);
      this.incrementCounter(`api.${operation}.error.${error.constructor.name}`);
      
      throw error;
    }
  }
}
```

## 🧪 Testing Strategies

### Unit Testing

```typescript
// ✅ Good: Comprehensive unit tests
describe('ProductService', () => {
  let productService: ProductService;
  let mockApiClient: jest.Mocked<ApiClient>;
  
  beforeEach(() => {
    mockApiClient = createMockApiClient();
    productService = new ProductService(mockApiClient);
  });
  
  describe('createProduct', () => {
    it('should create product successfully', async () => {
      // Arrange
      const productData = createTestProductData();
      const expectedResult = createTestProduct();
      mockApiClient.createProduct.mockResolvedValue({
        success: true,
        data: expectedResult
      });
      
      // Act
      const result = await productService.createProduct(productData);
      
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockApiClient.createProduct).toHaveBeenCalledWith(productData);
    });
    
    it('should handle validation errors', async () => {
      // Test error scenarios
    });
  });
});
```

### Integration Testing

```typescript
// ✅ Good: Integration tests with real API
describe('Product API Integration', () => {
  let apiClient: ApiClient;
  
  beforeAll(async () => {
    apiClient = new ApiClient({
      baseURL: process.env.TEST_API_URL,
      token: process.env.TEST_API_TOKEN
    });
  });
  
  it('should create and retrieve product', async () => {
    // Create product
    const productData = generateTestProductData();
    const createResult = await apiClient.createProduct(productData);
    
    expect(createResult.success).toBe(true);
    
    // Retrieve product
    const getResult = await apiClient.getProduct({
      product_id: createResult.data.id
    });
    
    expect(getResult.success).toBe(true);
    expect(getResult.data.name).toBe(productData.name);
    
    // Cleanup
    await apiClient.deleteProduct({ product_id: createResult.data.id });
  });
});
```

## 🚀 Deployment & Operations

### Environment Configuration

```typescript
// ✅ Good: Environment-specific configuration
class Config {
  static load(): AppConfig {
    const env = process.env.NODE_ENV || 'development';
    
    const baseConfig = {
      apiUrl: process.env.SUN_ECOMMERCE_BASE_URL,
      apiToken: process.env.SUN_ECOMMERCE_AUTH_TOKEN,
      timeout: parseInt(process.env.API_TIMEOUT || '30000'),
      retries: parseInt(process.env.API_RETRIES || '3')
    };
    
    const envConfigs = {
      development: {
        ...baseConfig,
        logLevel: 'debug',
        enableMetrics: false
      },
      staging: {
        ...baseConfig,
        logLevel: 'info',
        enableMetrics: true
      },
      production: {
        ...baseConfig,
        logLevel: 'warn',
        enableMetrics: true,
        timeout: 15000 // Shorter timeout in production
      }
    };
    
    return envConfigs[env] || envConfigs.development;
  }
}
```

### Health Checks

```typescript
// ✅ Good: Comprehensive health checks
class HealthChecker {
  async checkHealth(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkApiConnectivity(),
      this.checkDatabaseConnection(),
      this.checkCacheConnection(),
      this.checkExternalServices()
    ]);
    
    const results = checks.map((check, index) => ({
      name: ['api', 'database', 'cache', 'external'][index],
      status: check.status === 'fulfilled' ? 'healthy' : 'unhealthy',
      details: check.status === 'fulfilled' ? check.value : check.reason
    }));
    
    const overallStatus = results.every(r => r.status === 'healthy') 
      ? 'healthy' 
      : 'unhealthy';
    
    return {
      status: overallStatus,
      checks: results,
      timestamp: new Date().toISOString()
    };
  }
}
```

## 📋 Checklist

### Pre-Production Checklist

- [ ] **Security**
  - [ ] API tokens stored securely
  - [ ] Input validation implemented
  - [ ] Sensitive data not logged
  - [ ] HTTPS enforced

- [ ] **Performance**
  - [ ] Caching strategy implemented
  - [ ] Rate limiting configured
  - [ ] Batch operations used where appropriate
  - [ ] Database queries optimized

- [ ] **Reliability**
  - [ ] Error handling comprehensive
  - [ ] Retry logic implemented
  - [ ] Circuit breakers for external services
  - [ ] Health checks configured

- [ ] **Monitoring**
  - [ ] Structured logging implemented
  - [ ] Metrics collection configured
  - [ ] Alerting rules defined
  - [ ] Dashboard created

- [ ] **Testing**
  - [ ] Unit tests written
  - [ ] Integration tests implemented
  - [ ] Load testing performed
  - [ ] Security testing completed

---

*Tuân thủ các best practices này sẽ giúp đảm bảo ứng dụng của bạn hoạt động ổn định, bảo mật và có khả năng mở rộng tốt.*