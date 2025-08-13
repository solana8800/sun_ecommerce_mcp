# Resources Reference - Sun eCommerce MCP Server

Tài liệu tham khảo về tất cả các resources có sẵn trong Sun eCommerce MCP Server.

## 📋 Tổng quan Resources

Resources trong MCP Server cung cấp quyền truy cập vào tài liệu, hướng dẫn và thông tin tham khảo. Chúng được tổ chức theo URI scheme và có thể được truy cập thông qua AI assistant.

### Resource Categories

- **Documentation** (`docs://`) - Tài liệu kỹ thuật và hướng dẫn
- **Examples** (`examples://`) - Ví dụ thực tế và code samples
- **Guides** (`guides://`) - Hướng dẫn từng bước
- **References** (`refs://`) - Tài liệu tham khảo nhanh
- **Schemas** (`schemas://`) - Định nghĩa schema và data models

## 📚 Documentation Resources

### `docs://api-reference`
**Mô tả**: Tài liệu API đầy đủ với tất cả endpoints, parameters và responses

**Nội dung bao gồm**:
- Danh sách đầy đủ các tools
- Schema cho request/response
- Error codes và handling
- Authentication requirements
- Rate limiting information

**Khi nào sử dụng**:
- Cần tra cứu syntax của một tool cụ thể
- Hiểu cấu trúc request/response
- Debug API errors
- Implement new integrations

### `docs://integration-guide`
**Mô tả**: Hướng dẫn tích hợp MCP server vào các ứng dụng

**Nội dung bao gồm**:
- Cài đặt và cấu hình
- Authentication setup
- Environment configuration
- Client implementation examples
- Best practices

**Khi nào sử dụng**:
- Lần đầu setup MCP server
- Tích hợp vào ứng dụng mới
- Troubleshoot connection issues
- Optimize performance

### `docs://best-practices`
**Mô tả**: Các thực hành tốt nhất khi sử dụng Sun eCommerce API

**Nội dung bao gồm**:
- Performance optimization
- Security guidelines
- Error handling strategies
- Data modeling recommendations
- Scalability considerations

**Khi nào sử dụng**:
- Thiết kế architecture mới
- Optimize existing implementation
- Security review
- Performance tuning

### `docs://troubleshooting`
**Mô tả**: Hướng dẫn xử lý sự cố phổ biến

**Nội dung bao gồm**:
- Common error scenarios
- Debugging techniques
- Performance issues
- Configuration problems
- Network connectivity issues

**Khi nào sử dụng**:
- Gặp lỗi không rõ nguyên nhân
- Performance degradation
- Connection timeouts
- Authentication failures

### `docs://performance`
**Mô tả**: Hướng dẫn tối ưu hiệu năng

**Nội dung bao gồm**:
- Caching strategies
- Batch operations
- Query optimization
- Resource management
- Monitoring and alerting

**Khi nào sử dụng**:
- System performance issues
- High traffic scenarios
- Resource optimization
- Scalability planning

## 💡 Example Resources

### `examples://product-management`
**Mô tả**: Ví dụ chi tiết về quản lý sản phẩm

**Scenarios bao gồm**:
- Tạo sản phẩm đơn giản
- Sản phẩm có biến thể (size, color)
- Bundle products
- Digital products
- Subscription products
- Import/export products

**Code Examples**:
```typescript
// Simple product creation
const simpleProduct = {
  name: "Áo thun cotton",
  description: "Áo thun 100% cotton cao cấp",
  price: 299000,
  sku: "COTTON-TEE-001"
};

// Configurable product with variants
const configurableProduct = {
  name: "Áo sơ mi",
  variants: [
    { title: "Trắng/S", price: 450000, sku: "SHIRT-WHITE-S" },
    { title: "Xanh/M", price: 450000, sku: "SHIRT-BLUE-M" }
  ]
};
```

### `examples://pricing-rules`
**Mô tả**: Ví dụ thiết lập quy tắc giá và khuyến mãi

**Rule Types**:
- Percentage discounts
- Fixed amount discounts
- Buy X Get Y offers
- Tiered pricing
- Customer group pricing
- Time-based promotions

**Business Scenarios**:
```typescript
// Flash sale - 30% off for 24 hours
const flashSale = {
  name: "Flash Sale 30%",
  rule_type: "percentage",
  value: 30,
  start_date: "2024-12-25T00:00:00Z",
  end_date: "2024-12-25T23:59:59Z",
  conditions: {
    category_ids: ["electronics"]
  }
};

// Volume discount - Buy more, save more
const volumeDiscount = {
  name: "Volume Discount",
  rule_type: "tiered",
  tiers: [
    { min_quantity: 10, discount_percentage: 5 },
    { min_quantity: 50, discount_percentage: 10 },
    { min_quantity: 100, discount_percentage: 15 }
  ]
};
```

### `examples://cart-management`
**Mô tả**: Ví dụ quản lý giỏ hàng và checkout process

**Workflows**:
- Guest checkout
- Registered user checkout
- B2B checkout
- Multi-currency carts
- Abandoned cart recovery

### `examples://api-workflows`
**Mô tả**: Ví dụ các workflow API phổ biến

**Common Workflows**:
- Product catalog sync
- Order processing pipeline
- Inventory management
- Customer data sync
- Reporting and analytics

## 📖 Guide Resources

### `guides://getting-started`
**Mô tả**: Hướng dẫn bắt đầu nhanh cho người mới

**Steps**:
1. Environment setup
2. Authentication configuration
3. First API call
4. Basic product creation
5. Testing and validation

### `guides://product-catalog-setup`
**Mô tả**: Hướng dẫn thiết lập catalog sản phẩm từ đầu

**Process**:
1. Category structure planning
2. Product attribute definition
3. Pricing strategy setup
4. Inventory configuration
5. SEO optimization

### `guides://multi-language-setup`
**Mô tả**: Hướng dẫn thiết lập hỗ trợ đa ngôn ngữ

**Implementation**:
1. Language configuration
2. Translation workflow
3. Content localization
4. SEO for multiple languages
5. Maintenance strategies

### `guides://pricing-strategy`
**Mô tả**: Hướng dẫn thiết kế chiến lược giá

**Topics**:
- Market analysis
- Competitive pricing
- Dynamic pricing
- Promotional strategies
- A/B testing pricing

## 🔍 Reference Resources

### `refs://error-codes`
**Mô tả**: Danh sách đầy đủ các error codes và meanings

**Categories**:
- Authentication errors (AUTH_*)
- Validation errors (VALIDATION_*)
- Resource errors (RESOURCE_*)
- System errors (SYSTEM_*)
- Rate limiting errors (RATE_LIMIT_*)

### `refs://status-codes`
**Mô tả**: HTTP status codes và ý nghĩa trong context của API

### `refs://field-validation`
**Mô tả**: Quy tắc validation cho tất cả các fields

**Validation Rules**:
- String length limits
- Number ranges
- Date formats
- Email validation
- URL validation
- Custom business rules

### `refs://rate-limits`
**Mô tả**: Thông tin chi tiết về rate limiting

**Limits**:
- Per-endpoint limits
- User-based limits
- IP-based limits
- Burst allowances
- Reset timings

## 📊 Schema Resources

### `schemas://product`
**Mô tả**: Schema đầy đủ cho Product entity

```typescript
interface Product {
  id: string;
  name: string;
  description?: string;
  handle: string;
  status: 'draft' | 'active' | 'archived';
  product_type?: string;
  vendor?: string;
  tags: string[];
  category_id?: string;
  variants: ProductVariant[];
  images: ProductImage[];
  seo: SEOData;
  created_at: string;
  updated_at: string;
}
```

### `schemas://pricing-rule`
**Mô tả**: Schema cho Pricing Rule entity

```typescript
interface PricingRule {
  id: string;
  name: string;
  description?: string;
  rule_type: 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'tiered';
  value: number;
  conditions: RuleConditions;
  start_date?: string;
  end_date?: string;
  priority: number;
  is_active: boolean;
  usage_limit?: number;
  usage_count: number;
}
```

### `schemas://cart`
**Mô tả**: Schema cho Cart entity

### `schemas://inventory`
**Mô tả**: Schema cho Inventory entity

## 🎯 Interactive Resources

### `interactive://product-wizard`
**Mô tả**: Interactive wizard để tạo sản phẩm

**Features**:
- Step-by-step guidance
- Real-time validation
- Preview functionality
- Template suggestions

### `interactive://pricing-calculator`
**Mô tả**: Tool tính toán giá với các rules

**Capabilities**:
- Rule simulation
- Price comparison
- Profit margin calculation
- Competitive analysis

### `interactive://catalog-analyzer`
**Mô tả**: Tool phân tích catalog hiện tại

**Analysis**:
- Product performance
- Category distribution
- Pricing trends
- Inventory status

## 🔧 Utility Resources

### `utils://data-validator`
**Mô tả**: Validate data trước khi gửi API

### `utils://bulk-importer`
**Mô tả**: Hướng dẫn import dữ liệu hàng loạt

### `utils://export-templates`
**Mô tả**: Templates cho export data

## 📱 Platform-Specific Resources

### `platform://shopify-migration`
**Mô tả**: Hướng dẫn migrate từ Shopify

### `platform://woocommerce-sync`
**Mô tả**: Đồng bộ với WooCommerce

### `platform://magento-integration`
**Mô tả**: Tích hợp với Magento

## 🌐 Localization Resources

### `l10n://vietnamese`
**Mô tả**: Localization guide cho thị trường Việt Nam

**Topics**:
- Currency formatting (VND)
- Address formats
- Phone number validation
- Tax regulations
- Shipping zones

### `l10n://english`
**Mô tả**: English localization guide

### `l10n://chinese`
**Mô tả**: Chinese market localization

## 📈 Analytics Resources

### `analytics://product-performance`
**Mô tả**: Metrics và KPIs cho sản phẩm

### `analytics://pricing-effectiveness`
**Mô tả**: Đánh giá hiệu quả pricing strategies

### `analytics://customer-behavior`
**Mô tả**: Phân tích hành vi khách hàng

## 🔐 Security Resources

### `security://authentication`
**Mô tả**: Best practices cho authentication

### `security://data-protection`
**Mô tả**: Bảo vệ dữ liệu khách hàng

### `security://api-security`
**Mô tả**: Secure API implementation

## 📞 Support Resources

### `support://faq`
**Mô tả**: Frequently Asked Questions

### `support://contact`
**Mô tả**: Thông tin liên hệ support

### `support://community`
**Mô tả**: Community resources và forums

## 🚀 Advanced Resources

### `advanced://custom-integrations`
**Mô tả**: Xây dựng custom integrations

### `advanced://webhook-setup`
**Mô tả**: Thiết lập webhooks cho real-time updates

### `advanced://api-extensions`
**Mô tả**: Mở rộng API functionality

## 📋 Resource Access Patterns

### Direct Access
```typescript
// Truy cập resource trực tiếp
const apiDocs = await mcp.getResource('docs://api-reference');
const examples = await mcp.getResource('examples://product-management');
```

### Contextual Access
```typescript
// AI assistant tự động suggest resources dựa trên context
"I need help creating a product with variants"
// → Suggests: examples://product-management, guides://product-catalog-setup

"I'm getting authentication errors"
// → Suggests: docs://troubleshooting, refs://error-codes, security://authentication
```

### Search and Discovery
```typescript
// Tìm kiếm resources theo keyword
const searchResults = await mcp.searchResources('pricing');
// Returns: examples://pricing-rules, guides://pricing-strategy, schemas://pricing-rule
```

## 🎯 Resource Usage Tips

### For Developers
- Start with `docs://integration-guide`
- Use `schemas://` for data structure reference
- Check `examples://` for implementation patterns
- Refer to `refs://` for quick lookups

### For Business Users
- Begin with `guides://getting-started`
- Use `examples://` for business scenarios
- Check `analytics://` for performance insights
- Refer to `l10n://` for market-specific guidance

### For Troubleshooting
- Start with `docs://troubleshooting`
- Check `refs://error-codes` for specific errors
- Use `support://faq` for common issues
- Refer to `security://` for security-related problems

---

*Resources được cập nhật thường xuyên để phản ánh các tính năng mới và best practices. Sử dụng AI assistant để discover và access resources một cách hiệu quả nhất.*