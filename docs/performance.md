# Performance Optimization Guide - Sun eCommerce MCP Server

Hướng dẫn tối ưu hóa hiệu năng cho Sun eCommerce MCP Server để đạt được hiệu suất tốt nhất.

## 📊 Performance Metrics

### Key Performance Indicators (KPIs)

```typescript
interface PerformanceMetrics {
  // Response Time Metrics
  averageResponseTime: number;     // < 200ms (excellent), < 500ms (good)
  p95ResponseTime: number;         // < 1000ms
  p99ResponseTime: number;         // < 2000ms
  
  // Throughput Metrics
  requestsPerSecond: number;       // Target: > 100 RPS
  concurrentUsers: number;         // Target: > 1000
  
  // Error Metrics
  errorRate: number;               // < 1%
  timeoutRate: number;             // < 0.1%
  
  // Resource Metrics
  memoryUsage: number;             // < 80% of available
  cpuUsage: number;                // < 70% average
  networkLatency: number;          // < 50ms
}
```

### Performance Monitoring

```typescript
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private startTimes: Map<string, number> = new Map();
  
  startTimer(operation: string): string {
    const timerId = `${operation}_${Date.now()}_${Math.random()}`;
    this.startTimes.set(timerId, Date.now());
    return timerId;
  }
  
  endTimer(timerId: string, operation: string): number {
    const startTime = this.startTimes.get(timerId);
    if (!startTime) return 0;
    
    const duration = Date.now() - startTime;
    this.startTimes.delete(timerId);
    
    // Store metric
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }
    this.metrics.get(operation)!.push(duration);
    
    // Keep only last 1000 measurements
    const measurements = this.metrics.get(operation)!;
    if (measurements.length > 1000) {
      measurements.splice(0, measurements.length - 1000);
    }
    
    return duration;
  }
  
  getStats(operation: string): PerformanceStats {
    const measurements = this.metrics.get(operation) || [];
    if (measurements.length === 0) {
      return { count: 0, avg: 0, min: 0, max: 0, p95: 0, p99: 0 };
    }
    
    const sorted = [...measurements].sort((a, b) => a - b);
    const count = sorted.length;
    
    return {
      count,
      avg: Math.round(sorted.reduce((a, b) => a + b) / count),
      min: sorted[0],
      max: sorted[count - 1],
      p95: sorted[Math.floor(count * 0.95)],
      p99: sorted[Math.floor(count * 0.99)]
    };
  }
  
  generateReport(): string {
    const report = ['Performance Report', '='.repeat(50)];
    
    for (const [operation, _] of this.metrics) {
      const stats = this.getStats(operation);
      report.push(`\n${operation}:`);
      report.push(`  Count: ${stats.count}`);
      report.push(`  Average: ${stats.avg}ms`);
      report.push(`  Min: ${stats.min}ms`);
      report.push(`  Max: ${stats.max}ms`);
      report.push(`  P95: ${stats.p95}ms`);
      report.push(`  P99: ${stats.p99}ms`);
    }
    
    return report.join('\n');
  }
}

// Usage
const monitor = new PerformanceMonitor();

async function monitoredApiCall<T>(operation: string, apiCall: () => Promise<T>): Promise<T> {
  const timerId = monitor.startTimer(operation);
  
  try {
    const result = await apiCall();
    const duration = monitor.endTimer(timerId, operation);
    
    // Log slow operations
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${operation} took ${duration}ms`);
    }
    
    return result;
  } catch (error) {
    monitor.endTimer(timerId, `${operation}_error`);
    throw error;
  }
}
```

## 🚀 Client-Side Optimizations

### Connection Pooling

```typescript
// Optimized HTTP client with connection pooling
import { Agent } from 'https';
import { Agent as HttpAgent } from 'http';

class OptimizedApiClient {
  private httpsAgent: Agent;
  private httpAgent: HttpAgent;
  
  constructor(config: ClientConfig) {
    // Configure connection pooling
    this.httpsAgent = new Agent({
      keepAlive: true,
      keepAliveMsecs: 30000,
      maxSockets: 50,        // Max connections per host
      maxFreeSockets: 10,    // Max idle connections
      timeout: 60000,        // Socket timeout
      freeSocketTimeout: 30000 // Idle socket timeout
    });
    
    this.httpAgent = new HttpAgent({
      keepAlive: true,
      keepAliveMsecs: 30000,
      maxSockets: 50,
      maxFreeSockets: 10,
      timeout: 60000,
      freeSocketTimeout: 30000
    });
  }
  
  async makeRequest(options: RequestOptions): Promise<any> {
    const agent = options.url.startsWith('https:') ? this.httpsAgent : this.httpAgent;
    
    return fetch(options.url, {
      ...options,
      agent,
      // Enable compression
      headers: {
        ...options.headers,
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });
  }
  
  // Cleanup connections when done
  destroy(): void {
    this.httpsAgent.destroy();
    this.httpAgent.destroy();
  }
}
```

### Request Batching

```typescript
// Batch multiple requests to reduce overhead
class BatchRequestManager {
  private batchQueue: Map<string, BatchRequest[]> = new Map();
  private batchTimers: Map<string, NodeJS.Timeout> = new Map();
  private batchSize = 10;
  private batchDelay = 100; // ms
  
  async batchRequest<T>(endpoint: string, request: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const batchKey = this.getBatchKey(endpoint);
      
      if (!this.batchQueue.has(batchKey)) {
        this.batchQueue.set(batchKey, []);
      }
      
      const batch = this.batchQueue.get(batchKey)!;
      batch.push({ request, resolve, reject });
      
      // Process batch if it's full
      if (batch.length >= this.batchSize) {
        this.processBatch(batchKey);
      } else {
        // Set timer to process batch after delay
        this.scheduleBatchProcessing(batchKey);
      }
    });
  }
  
  private getBatchKey(endpoint: string): string {
    // Group similar requests together
    if (endpoint.includes('/products/')) {
      return 'products';
    }
    if (endpoint.includes('/categories/')) {
      return 'categories';
    }
    return 'default';
  }
  
  private scheduleBatchProcessing(batchKey: string): void {
    if (this.batchTimers.has(batchKey)) {
      return; // Timer already set
    }
    
    const timer = setTimeout(() => {
      this.processBatch(batchKey);
    }, this.batchDelay);
    
    this.batchTimers.set(batchKey, timer);
  }
  
  private async processBatch(batchKey: string): Promise<void> {
    const batch = this.batchQueue.get(batchKey);
    if (!batch || batch.length === 0) return;
    
    // Clear timer and queue
    const timer = this.batchTimers.get(batchKey);
    if (timer) {
      clearTimeout(timer);
      this.batchTimers.delete(batchKey);
    }
    this.batchQueue.set(batchKey, []);
    
    try {
      // Execute batch request
      const requests = batch.map(item => item.request);
      const results = await this.executeBatchRequest(batchKey, requests);
      
      // Resolve individual promises
      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      // Reject all promises in batch
      batch.forEach(item => {
        item.reject(error);
      });
    }
  }
  
  private async executeBatchRequest(batchKey: string, requests: any[]): Promise<any[]> {
    // Implement batch API calls based on endpoint type
    switch (batchKey) {
      case 'products':
        return this.batchGetProducts(requests);
      case 'categories':
        return this.batchGetCategories(requests);
      default:
        // Fallback to individual requests
        return Promise.all(requests.map(req => this.makeIndividualRequest(req)));
    }
  }
}
```

### Intelligent Caching

```typescript
// Multi-level caching strategy
class CacheManager {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private redisClient?: Redis;
  private cacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0
  };
  
  constructor(redisClient?: Redis) {
    this.redisClient = redisClient;
    
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanupExpiredEntries(), 5 * 60 * 1000);
  }
  
  async get<T>(key: string): Promise<T | null> {
    // Level 1: Memory cache (fastest)
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      this.cacheStats.hits++;
      return memoryEntry.data as T;
    }
    
    // Level 2: Redis cache (fast)
    if (this.redisClient) {
      try {
        const redisData = await this.redisClient.get(key);
        if (redisData) {
          const parsed = JSON.parse(redisData);
          
          // Store in memory cache for next time
          this.memoryCache.set(key, {
            data: parsed,
            timestamp: Date.now(),
            ttl: 5 * 60 * 1000 // 5 minutes in memory
          });
          
          this.cacheStats.hits++;
          return parsed as T;
        }
      } catch (error) {
        console.warn('Redis cache error:', error.message);
      }
    }
    
    this.cacheStats.misses++;
    return null;
  }
  
  async set<T>(key: string, data: T, ttl: number = 3600): Promise<void> {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000
    };
    
    // Store in memory cache
    this.memoryCache.set(key, entry);
    
    // Store in Redis cache
    if (this.redisClient) {
      try {
        await this.redisClient.setex(key, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn('Redis cache set error:', error.message);
      }
    }
    
    this.cacheStats.sets++;
  }
  
  async invalidate(pattern: string): Promise<void> {
    // Invalidate memory cache
    for (const key of this.memoryCache.keys()) {
      if (this.matchesPattern(key, pattern)) {
        this.memoryCache.delete(key);
        this.cacheStats.deletes++;
      }
    }
    
    // Invalidate Redis cache
    if (this.redisClient) {
      try {
        const keys = await this.redisClient.keys(pattern);
        if (keys.length > 0) {
          await this.redisClient.del(...keys);
        }
      } catch (error) {
        console.warn('Redis cache invalidation error:', error.message);
      }
    }
  }
  
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }
  
  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.memoryCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.memoryCache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired cache entries`);
    }
  }
  
  private matchesPattern(key: string, pattern: string): boolean {
    // Simple pattern matching (supports * wildcard)
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(key);
  }
  
  getStats(): CacheStats {
    const hitRate = this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses) * 100;
    
    return {
      ...this.cacheStats,
      hitRate: Math.round(hitRate * 100) / 100,
      memoryEntries: this.memoryCache.size
    };
  }
}

// Smart caching for different data types
class SmartCache {
  private cache: CacheManager;
  
  constructor(cache: CacheManager) {
    this.cache = cache;
  }
  
  // Products: Cache for 1 hour, invalidate on updates
  async getProduct(id: string): Promise<Product | null> {
    const key = `product:${id}`;
    let product = await this.cache.get<Product>(key);
    
    if (!product) {
      product = await apiClient.getProduct({ product_id: id });
      if (product) {
        await this.cache.set(key, product, 3600); // 1 hour
      }
    }
    
    return product;
  }
  
  // Search results: Cache for 5 minutes
  async searchProducts(query: SearchQuery): Promise<SearchResult> {
    const key = `search:${this.hashQuery(query)}`;
    let result = await this.cache.get<SearchResult>(key);
    
    if (!result) {
      result = await apiClient.searchProducts(query);
      if (result) {
        await this.cache.set(key, result, 300); // 5 minutes
      }
    }
    
    return result;
  }
  
  // Categories: Cache for 24 hours (rarely change)
  async getCategories(): Promise<Category[]> {
    const key = 'categories:all';
    let categories = await this.cache.get<Category[]>(key);
    
    if (!categories) {
      categories = await apiClient.getCategories();
      if (categories) {
        await this.cache.set(key, categories, 86400); // 24 hours
      }
    }
    
    return categories;
  }
  
  private hashQuery(query: any): string {
    return Buffer.from(JSON.stringify(query)).toString('base64');
  }
}
```

## 🔄 Request Optimization

### Parallel Processing

```typescript
// Optimize concurrent requests
class ConcurrentRequestManager {
  private maxConcurrency = 10;
  private activeRequests = 0;
  private requestQueue: Array<() => Promise<any>> = [];
  
  async executeWithConcurrencyLimit<T>(requests: Array<() => Promise<T>>): Promise<T[]> {
    const results: T[] = new Array(requests.length);
    const promises: Promise<void>[] = [];
    
    for (let i = 0; i < requests.length; i++) {
      const promise = this.executeRequest(requests[i], i, results);
      promises.push(promise);
    }
    
    await Promise.all(promises);
    return results;
  }
  
  private async executeRequest<T>(
    request: () => Promise<T>,
    index: number,
    results: T[]
  ): Promise<void> {
    // Wait for available slot
    while (this.activeRequests >= this.maxConcurrency) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    this.activeRequests++;
    
    try {
      results[index] = await request();
    } finally {
      this.activeRequests--;
    }
  }
}

// Usage example
async function bulkGetProducts(productIds: string[]): Promise<Product[]> {
  const manager = new ConcurrentRequestManager();
  
  const requests = productIds.map(id => 
    () => apiClient.getProduct({ product_id: id })
  );
  
  return manager.executeWithConcurrencyLimit(requests);
}
```

### Request Deduplication

```typescript
// Prevent duplicate requests
class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<any>> = new Map();
  
  async deduplicate<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key) as Promise<T>;
    }
    
    // Create new request
    const promise = requestFn().finally(() => {
      // Clean up when request completes
      this.pendingRequests.delete(key);
    });
    
    this.pendingRequests.set(key, promise);
    return promise;
  }
  
  // Generate cache key for requests
  generateKey(method: string, endpoint: string, params?: any): string {
    const paramsStr = params ? JSON.stringify(params) : '';
    return `${method}:${endpoint}:${Buffer.from(paramsStr).toString('base64')}`;
  }
}

// Enhanced API client with deduplication
class DeduplicatedApiClient {
  private deduplicator = new RequestDeduplicator();
  
  async getProduct(params: { product_id: string }): Promise<Product> {
    const key = this.deduplicator.generateKey('GET', '/products', params);
    
    return this.deduplicator.deduplicate(key, () => 
      apiClient.getProduct(params)
    );
  }
  
  async searchProducts(params: SearchQuery): Promise<SearchResult> {
    const key = this.deduplicator.generateKey('GET', '/search', params);
    
    return this.deduplicator.deduplicate(key, () => 
      apiClient.searchProducts(params)
    );
  }
}
```

### Response Compression

```typescript
// Handle compressed responses efficiently
class CompressionHandler {
  static async handleCompressedResponse(response: Response): Promise<any> {
    const encoding = response.headers.get('content-encoding');
    
    if (!encoding) {
      return response.json();
    }
    
    const buffer = await response.arrayBuffer();
    
    switch (encoding) {
      case 'gzip':
        return this.decompressGzip(buffer);
      case 'deflate':
        return this.decompressDeflate(buffer);
      case 'br':
        return this.decompressBrotli(buffer);
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  }
  
  private static async decompressGzip(buffer: ArrayBuffer): Promise<any> {
    const zlib = await import('zlib');
    const decompressed = zlib.gunzipSync(Buffer.from(buffer));
    return JSON.parse(decompressed.toString());
  }
  
  private static async decompressDeflate(buffer: ArrayBuffer): Promise<any> {
    const zlib = await import('zlib');
    const decompressed = zlib.inflateSync(Buffer.from(buffer));
    return JSON.parse(decompressed.toString());
  }
  
  private static async decompressBrotli(buffer: ArrayBuffer): Promise<any> {
    const zlib = await import('zlib');
    const decompressed = zlib.brotliDecompressSync(Buffer.from(buffer));
    return JSON.parse(decompressed.toString());
  }
}
```

## 📈 Data Optimization

### Efficient Data Structures

```typescript
// Optimize data structures for performance
class OptimizedDataStructures {
  // Use Map for O(1) lookups instead of Array.find()
  private productCache = new Map<string, Product>();
  private categoryCache = new Map<string, Category>();
  
  // Index products by multiple fields for fast lookups
  private productBySku = new Map<string, Product>();
  private productsByCategory = new Map<string, Set<string>>();
  
  addProduct(product: Product): void {
    this.productCache.set(product.id, product);
    this.productBySku.set(product.sku, product);
    
    // Index by category
    if (product.category_id) {
      if (!this.productsByCategory.has(product.category_id)) {
        this.productsByCategory.set(product.category_id, new Set());
      }
      this.productsByCategory.get(product.category_id)!.add(product.id);
    }
  }
  
  getProductById(id: string): Product | undefined {
    return this.productCache.get(id); // O(1)
  }
  
  getProductBySku(sku: string): Product | undefined {
    return this.productBySku.get(sku); // O(1)
  }
  
  getProductsByCategory(categoryId: string): Product[] {
    const productIds = this.productsByCategory.get(categoryId);
    if (!productIds) return [];
    
    return Array.from(productIds)
      .map(id => this.productCache.get(id))
      .filter(Boolean) as Product[];
  }
  
  // Bulk operations for better performance
  addProducts(products: Product[]): void {
    for (const product of products) {
      this.addProduct(product);
    }
  }
  
  removeProduct(id: string): void {
    const product = this.productCache.get(id);
    if (!product) return;
    
    this.productCache.delete(id);
    this.productBySku.delete(product.sku);
    
    if (product.category_id) {
      const categoryProducts = this.productsByCategory.get(product.category_id);
      if (categoryProducts) {
        categoryProducts.delete(id);
        if (categoryProducts.size === 0) {
          this.productsByCategory.delete(product.category_id);
        }
      }
    }
  }
}
```

### Lazy Loading

```typescript
// Implement lazy loading for large datasets
class LazyProductLoader {
  private loadedProducts = new Map<string, Product>();
  private loadingPromises = new Map<string, Promise<Product>>();
  private pageSize = 50;
  
  async getProduct(id: string): Promise<Product> {
    // Return cached product
    if (this.loadedProducts.has(id)) {
      return this.loadedProducts.get(id)!;
    }
    
    // Return existing loading promise
    if (this.loadingPromises.has(id)) {
      return this.loadingPromises.get(id)!;
    }
    
    // Start loading
    const loadingPromise = this.loadProduct(id);
    this.loadingPromises.set(id, loadingPromise);
    
    try {
      const product = await loadingPromise;
      this.loadedProducts.set(id, product);
      return product;
    } finally {
      this.loadingPromises.delete(id);
    }
  }
  
  async getProducts(ids: string[]): Promise<Product[]> {
    const results: Product[] = [];
    const toLoad: string[] = [];
    
    // Separate cached from uncached
    for (const id of ids) {
      if (this.loadedProducts.has(id)) {
        results.push(this.loadedProducts.get(id)!);
      } else {
        toLoad.push(id);
      }
    }
    
    // Load missing products in batches
    if (toLoad.length > 0) {
      const loaded = await this.loadProductsBatch(toLoad);
      results.push(...loaded);
    }
    
    return results;
  }
  
  private async loadProduct(id: string): Promise<Product> {
    const result = await apiClient.getProduct({ product_id: id });
    return result.data;
  }
  
  private async loadProductsBatch(ids: string[]): Promise<Product[]> {
    const batches: string[][] = [];
    
    // Split into batches
    for (let i = 0; i < ids.length; i += this.pageSize) {
      batches.push(ids.slice(i, i + this.pageSize));
    }
    
    // Load batches in parallel
    const batchPromises = batches.map(batch => 
      apiClient.getProducts({ product_ids: batch })
    );
    
    const batchResults = await Promise.all(batchPromises);
    
    // Flatten results and cache
    const products: Product[] = [];
    for (const result of batchResults) {
      if (result.success) {
        for (const product of result.data) {
          this.loadedProducts.set(product.id, product);
          products.push(product);
        }
      }
    }
    
    return products;
  }
}
```

## 🎯 Query Optimization

### Smart Pagination

```typescript
// Implement efficient pagination
class SmartPagination {
  private defaultPageSize = 20;
  private maxPageSize = 100;
  
  async paginateResults<T>(
    query: PaginationQuery,
    fetcher: (params: any) => Promise<PaginatedResult<T>>
  ): Promise<PaginatedResult<T>> {
    const pageSize = Math.min(
      query.limit || this.defaultPageSize,
      this.maxPageSize
    );
    
    const offset = query.offset || 0;
    
    // Optimize query parameters
    const optimizedParams = {
      ...query,
      limit: pageSize,
      offset,
      // Only fetch necessary fields for list views
      fields: query.fields || this.getDefaultFields(query.type)
    };
    
    return fetcher(optimizedParams);
  }
  
  private getDefaultFields(type: string): string[] {
    switch (type) {
      case 'product':
        return ['id', 'name', 'sku', 'price', 'image_url', 'status'];
      case 'category':
        return ['id', 'name', 'slug', 'parent_id'];
      default:
        return [];
    }
  }
  
  // Cursor-based pagination for large datasets
  async paginateWithCursor<T>(
    query: CursorQuery,
    fetcher: (params: any) => Promise<CursorResult<T>>
  ): Promise<CursorResult<T>> {
    const pageSize = Math.min(
      query.limit || this.defaultPageSize,
      this.maxPageSize
    );
    
    return fetcher({
      ...query,
      limit: pageSize,
      cursor: query.cursor
    });
  }
}
```

### Search Optimization

```typescript
// Optimize search queries
class SearchOptimizer {
  private searchCache = new Map<string, SearchResult>();
  private popularQueries = new Map<string, number>();
  
  async optimizeSearch(query: SearchQuery): Promise<SearchResult> {
    // Track popular queries
    this.trackQuery(query.query);
    
    // Optimize query parameters
    const optimizedQuery = this.optimizeQuery(query);
    
    // Check cache first
    const cacheKey = this.generateCacheKey(optimizedQuery);
    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey)!;
    }
    
    // Execute search
    const result = await apiClient.searchProducts(optimizedQuery);
    
    // Cache result
    this.searchCache.set(cacheKey, result);
    
    return result;
  }
  
  private optimizeQuery(query: SearchQuery): SearchQuery {
    return {
      ...query,
      // Limit results for performance
      limit: Math.min(query.limit || 20, 100),
      
      // Add filters to reduce search space
      filters: {
        ...query.filters,
        status: 'active' // Only search active products
      },
      
      // Optimize sorting
      sort_by: query.sort_by || 'relevance',
      
      // Only fetch necessary fields
      fields: query.fields || [
        'id', 'name', 'sku', 'price', 'image_url', 'description'
      ]
    };
  }
  
  private trackQuery(query: string): void {
    const normalized = query.toLowerCase().trim();
    const count = this.popularQueries.get(normalized) || 0;
    this.popularQueries.set(normalized, count + 1);
  }
  
  private generateCacheKey(query: SearchQuery): string {
    return Buffer.from(JSON.stringify(query)).toString('base64');
  }
  
  getPopularQueries(limit: number = 10): Array<{ query: string; count: number }> {
    return Array.from(this.popularQueries.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
}
```

## 📊 Performance Testing

### Load Testing

```typescript
// Load testing utilities
class LoadTester {
  async runLoadTest(config: LoadTestConfig): Promise<LoadTestResult> {
    const results: RequestResult[] = [];
    const startTime = Date.now();
    
    console.log(`Starting load test: ${config.concurrency} concurrent users, ${config.duration}ms duration`);
    
    // Create concurrent users
    const userPromises: Promise<void>[] = [];
    
    for (let i = 0; i < config.concurrency; i++) {
      userPromises.push(this.simulateUser(config, results, startTime));
    }
    
    // Wait for test completion
    await Promise.all(userPromises);
    
    return this.analyzeResults(results, config);
  }
  
  private async simulateUser(
    config: LoadTestConfig,
    results: RequestResult[],
    startTime: number
  ): Promise<void> {
    while (Date.now() - startTime < config.duration) {
      const requestStart = Date.now();
      
      try {
        await this.executeRandomRequest(config.scenarios);
        
        results.push({
          success: true,
          duration: Date.now() - requestStart,
          timestamp: requestStart
        });
      } catch (error) {
        results.push({
          success: false,
          duration: Date.now() - requestStart,
          timestamp: requestStart,
          error: error.message
        });
      }
      
      // Wait between requests
      if (config.requestDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, config.requestDelay));
      }
    }
  }
  
  private async executeRandomRequest(scenarios: TestScenario[]): Promise<any> {
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    switch (scenario.type) {
      case 'getProduct':
        return apiClient.getProduct({ product_id: this.randomProductId() });
      case 'searchProducts':
        return apiClient.searchProducts({ query: this.randomSearchQuery() });
      case 'getCategories':
        return apiClient.getCategories();
      default:
        throw new Error(`Unknown scenario: ${scenario.type}`);
    }
  }
  
  private analyzeResults(results: RequestResult[], config: LoadTestConfig): LoadTestResult {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    const durations = successful.map(r => r.duration);
    
    durations.sort((a, b) => a - b);
    
    const totalRequests = results.length;
    const successRate = (successful.length / totalRequests) * 100;
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const p95Duration = durations[Math.floor(durations.length * 0.95)];
    const p99Duration = durations[Math.floor(durations.length * 0.99)];
    const rps = totalRequests / (config.duration / 1000);
    
    return {
      totalRequests,
      successfulRequests: successful.length,
      failedRequests: failed.length,
      successRate,
      averageResponseTime: Math.round(avgDuration),
      p95ResponseTime: p95Duration,
      p99ResponseTime: p99Duration,
      requestsPerSecond: Math.round(rps),
      errors: this.groupErrors(failed)
    };
  }
  
  private groupErrors(failed: RequestResult[]): Record<string, number> {
    const errors: Record<string, number> = {};
    
    for (const result of failed) {
      const error = result.error || 'Unknown error';
      errors[error] = (errors[error] || 0) + 1;
    }
    
    return errors;
  }
}

// Usage
const loadTester = new LoadTester();

const testConfig: LoadTestConfig = {
  concurrency: 50,
  duration: 60000, // 1 minute
  requestDelay: 100, // 100ms between requests per user
  scenarios: [
    { type: 'getProduct', weight: 40 },
    { type: 'searchProducts', weight: 40 },
    { type: 'getCategories', weight: 20 }
  ]
};

loadTester.runLoadTest(testConfig).then(result => {
  console.log('Load Test Results:', result);
});
```

## 📋 Performance Checklist

### Pre-Production Checklist

- [ ] **Connection Optimization**
  - [ ] Connection pooling enabled
  - [ ] Keep-alive configured
  - [ ] Appropriate timeout values set
  - [ ] Compression enabled

- [ ] **Caching Strategy**
  - [ ] Multi-level caching implemented
  - [ ] Cache invalidation strategy defined
  - [ ] Cache hit rate > 80%
  - [ ] TTL values optimized

- [ ] **Request Optimization**
  - [ ] Request batching implemented
  - [ ] Deduplication in place
  - [ ] Parallel processing used
  - [ ] Rate limiting respected

- [ ] **Data Optimization**
  - [ ] Efficient data structures used
  - [ ] Lazy loading implemented
  - [ ] Pagination optimized
  - [ ] Field selection minimized

- [ ] **Monitoring**
  - [ ] Performance metrics collected
  - [ ] Slow query alerts configured
  - [ ] Load testing performed
  - [ ] Baseline performance established

### Performance Targets

| Metric | Target | Excellent |
|--------|--------|-----------|
| Average Response Time | < 500ms | < 200ms |
| P95 Response Time | < 1000ms | < 500ms |
| P99 Response Time | < 2000ms | < 1000ms |
| Requests per Second | > 100 | > 500 |
| Error Rate | < 1% | < 0.1% |
| Cache Hit Rate | > 80% | > 95% |

---

*Tuân thủ các hướng dẫn tối ưu hóa này sẽ giúp đảm bảo ứng dụng của bạn đạt được hiệu năng tốt nhất có thể.*