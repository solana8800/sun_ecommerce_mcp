# Tools Reference - Sun eCommerce MCP Server

Tài liệu tham khảo đầy đủ về tất cả các tools có sẵn trong Sun eCommerce MCP Server.

## 📋 Tổng quan Tools

Sun eCommerce MCP Server cung cấp hơn 80 tools được tổ chức theo các nhóm chức năng chính:

- **Product Management** (12 tools) - Quản lý sản phẩm và biến thể
- **Category Management** (6 tools) - Quản lý danh mục sản phẩm
- **Pricing Rules** (15 tools) - Quản lý quy tắc giá và khuyến mãi
- **Cart Management** (8 tools) - Quản lý giỏ hàng và checkout
- **Inventory Management** (6 tools) - Quản lý tồn kho và đặt chỗ
- **Media Management** (5 tools) - Quản lý file media
- **Partner Management** (5 tools) - Quản lý đối tác kinh doanh
- **Sales Channel Management** (7 tools) - Quản lý kênh bán hàng
- **Product Attribute Management** (11 tools) - Quản lý thuộc tính sản phẩm
- **Translation Management** (20 tools) - Quản lý đa ngôn ngữ
- **System Operations** (2 tools) - Kiểm tra hệ thống

## 🛍️ Product Management Tools

### Core Product Operations

#### `create_product`
**Mục đích**: Tạo sản phẩm mới với đầy đủ cấu hình

**Use Cases**:
- Thêm sản phẩm đơn giản (simple product)
- Tạo sản phẩm có biến thể (configurable product)
- Thiết lập sản phẩm bundle/combo

**Best Practices**:
```typescript
// Sản phẩm đơn giản
const simpleProduct = {
  name: "Áo thun cotton",
  description: "Áo thun 100% cotton cao cấp",
  status: "active",
  product_type: "clothing",
  vendor: "Fashion Brand",
  category_id: "cat_123",
  variants: [{
    title: "Default",
    price: 299000,
    sku: "COTTON-TEE-001",
    inventory_quantity: 100
  }]
};

// Sản phẩm có biến thể
const configurableProduct = {
  name: "Áo thun Premium",
  description: "Áo thun với nhiều màu và size",
  status: "active",
  variants: [
    {
      title: "Đỏ / S",
      price: 350000,
      sku: "PREMIUM-RED-S",
      attributes: { color: "Đỏ", size: "S" }
    },
    {
      title: "Xanh / M",
      price: 350000,
      sku: "PREMIUM-BLUE-M",
      attributes: { color: "Xanh", size: "M" }
    }
  ]
};
```

#### `search_products`
**Mục đích**: Tìm kiếm sản phẩm với bộ lọc nâng cao

**Advanced Search Examples**:
```typescript
// Tìm sản phẩm theo nhiều tiêu chí
const searchCriteria = {
  query: "áo thun",
  status: "active",
  category_id: "clothing",
  price_min: 100000,
  price_max: 500000,
  tags: ["cotton", "premium"],
  created_after: "2024-01-01",
  sort_by: "created_at",
  sort_order: "desc",
  limit: 50
};

// Tìm sản phẩm bán chạy
const bestSellers = {
  sort_by: "sales_count",
  sort_order: "desc",
  status: "active",
  limit: 20
};
```

#### `get_product`
**Mục đích**: Lấy thông tin chi tiết sản phẩm

**Optimization Tips**:
```typescript
// Lấy thông tin cơ bản (nhanh)
const basicInfo = {
  product_id: "prod_123",
  include_variants: false,
  include_images: false,
  include_inventory: false
};

// Lấy thông tin đầy đủ (chậm hơn)
const fullInfo = {
  product_id: "prod_123",
  include_variants: true,
  include_images: true,
  include_inventory: true
};
```

### Product Lifecycle Management

#### `update_product`
**Mục đích**: Cập nhật thông tin sản phẩm

**Common Update Patterns**:
```typescript
// Cập nhật giá hàng loạt
const priceUpdate = {
  product_id: "prod_123",
  variants: variants.map(v => ({
    ...v,
    price: v.price * 1.1 // Tăng giá 10%
  }))
};

// Cập nhật trạng thái
const statusUpdate = {
  product_id: "prod_123",
  status: "archived"
};

// Cập nhật SEO
const seoUpdate = {
  product_id: "prod_123",
  seo_title: "Áo thun cotton cao cấp - Thời trang nam",
  seo_description: "Áo thun 100% cotton, thiết kế hiện đại, chất lượng cao"
};
```

#### `delete_product`
**Mục đích**: Xóa sản phẩm khỏi hệ thống

**Safety Guidelines**:
```typescript
// Xóa mềm (khuyến nghị)
const softDelete = {
  product_id: "prod_123",
  force: false // Chuyển sang trạng thái archived
};

// Xóa cứng (cẩn thận!)
const hardDelete = {
  product_id: "prod_123",
  force: true // Xóa vĩnh viễn
};
```

## 📂 Category Management Tools

### Category Hierarchy

#### `create_category`
**Mục đích**: Tạo danh mục sản phẩm mới

**Hierarchy Examples**:
```typescript
// Danh mục gốc
const rootCategory = {
  name: "Thời trang",
  description: "Sản phẩm thời trang nam nữ",
  handle: "thoi-trang",
  sort_order: 1,
  is_active: true
};

// Danh mục con
const subCategory = {
  name: "Áo nam",
  description: "Áo sơ mi, áo thun, áo khoác nam",
  parent_id: "cat_fashion",
  handle: "ao-nam",
  sort_order: 1
};

// Danh mục cháu
const subSubCategory = {
  name: "Áo thun",
  description: "Áo thun nam các loại",
  parent_id: "cat_mens_shirts",
  handle: "ao-thun-nam",
  sort_order: 1
};
```

#### `list_categories`
**Mục đích**: Liệt kê danh mục với cấu trúc cây

**Display Formats**:
```typescript
// Danh sách phẳng
const flatList = {
  tree_format: false,
  include_products: true
};

// Cấu trúc cây
const treeFormat = {
  tree_format: true,
  include_products: false
};

// Lọc theo danh mục cha
const childrenOnly = {
  parent_id: "cat_fashion",
  is_active: true
};
```

## 💰 Pricing Rules Tools

### Rule Types & Strategies

#### `create_pricing_rule`
**Mục đích**: Thiết lập quy tắc giá và khuyến mãi

**Rule Type Examples**:

**1. Percentage Discount**
```typescript
const percentageRule = {
  name: "Giảm giá mùa hè 20%",
  rule_type: "percentage",
  value: 20, // 20%
  conditions: {
    category_ids: ["summer_collection"],
    min_quantity: 1
  },
  start_date: "2024-06-01",
  end_date: "2024-08-31",
  priority: 10
};
```

**2. Fixed Amount Discount**
```typescript
const fixedRule = {
  name: "Giảm 50k cho đơn từ 500k",
  rule_type: "fixed_amount",
  value: 50000, // 50,000 VND
  conditions: {
    min_amount: 500000
  },
  priority: 5
};
```

**3. Buy X Get Y**
```typescript
const buyXGetYRule = {
  name: "Mua 2 tặng 1",
  rule_type: "buy_x_get_y",
  value: 1, // Số lượng tặng
  conditions: {
    min_quantity: 2,
    product_ids: ["prod_123", "prod_456"]
  },
  priority: 15
};
```

**4. Tiered Pricing**
```typescript
const tieredRule = {
  name: "Giá theo số lượng",
  rule_type: "tiered",
  tiers: [
    { min_quantity: 1, max_quantity: 9, discount_percentage: 0 },
    { min_quantity: 10, max_quantity: 49, discount_percentage: 5 },
    { min_quantity: 50, max_quantity: null, discount_percentage: 10 }
  ],
  priority: 20
};
```

#### `apply_pricing_rules`
**Mục đích**: Tính toán giá với quy tắc áp dụng

**Calculation Examples**:
```typescript
// Tính giá cho giỏ hàng
const cartCalculation = {
  items: [
    {
      product_id: "prod_123",
      variant_id: "var_456",
      quantity: 3,
      base_price: 299000
    },
    {
      product_id: "prod_789",
      quantity: 1,
      base_price: 599000
    }
  ],
  customer_id: "cust_123",
  sales_channel: "website"
};

// Tính giá cho sản phẩm đơn
const singleProductCalculation = {
  items: [{
    product_id: "prod_123",
    quantity: 5,
    base_price: 199000
  }]
};
```

### Advanced Pricing Tools

#### `bulk_calculate_price`
**Mục đích**: Tính toán giá hàng loạt cho nhiều sản phẩm

#### `get_pricing_rule_stats`
**Mục đích**: Lấy thống kê hiệu quả quy tắc giá

#### `duplicate_pricing_rule`
**Mục đích**: Sao chép quy tắc giá để tạo rule tương tự

## 🛒 Cart Management Tools

### Cart Lifecycle

#### `create_cart`
**Mục đích**: Tạo giỏ hàng mới

**Cart Types**:
```typescript
// Giỏ hàng khách vãng lai
const guestCart = {
  sales_channel: "website",
  currency: "VND"
};

// Giỏ hàng khách hàng đã đăng ký
const customerCart = {
  customer_id: "cust_123",
  sales_channel: "mobile_app",
  currency: "VND"
};

// Giỏ hàng B2B
const b2bCart = {
  customer_id: "company_456",
  sales_channel: "b2b_portal",
  currency: "USD"
};
```

#### `add_cart_item`
**Mục đích**: Thêm sản phẩm vào giỏ hàng

**Item Addition Strategies**:
```typescript
// Thêm sản phẩm đơn giản
const simpleItem = {
  cart_id: "cart_123",
  product_id: "prod_456",
  quantity: 2
};

// Thêm biến thể sản phẩm
const variantItem = {
  cart_id: "cart_123",
  product_id: "prod_456",
  variant_id: "var_789",
  quantity: 1
};

// Thêm với giá tùy chỉnh (B2B)
const customPriceItem = {
  cart_id: "cart_123",
  product_id: "prod_456",
  quantity: 10,
  custom_price: 250000 // Giá đặc biệt
};
```

### Cart Operations

#### `update_cart_item`
**Mục đích**: Cập nhật sản phẩm trong giỏ hàng

#### `remove_cart_item`
**Mục đích**: Xóa sản phẩm khỏi giỏ hàng

#### `get_cart_summary`
**Mục đích**: Tổng hợp giá trị giỏ hàng

**Summary Information**:
- Tổng số sản phẩm
- Tổng giá trị trước giảm giá
- Tổng giảm giá
- Thuế (nếu có)
- Phí vận chuyển (nếu có)
- Tổng thanh toán

## 📦 Inventory Management Tools

### Stock Control

#### `check_inventory`
**Mục đích**: Kiểm tra tồn kho sản phẩm

**Inventory Checks**:
```typescript
// Kiểm tra tồn kho cơ bản
const basicCheck = {
  product_id: "prod_123",
  variant_id: "var_456"
};

// Kiểm tra theo địa điểm
const locationCheck = {
  product_id: "prod_123",
  location_id: "warehouse_hanoi",
  check_reservations: true
};

// Kiểm tra khả dụng thực tế
const availabilityCheck = {
  product_id: "prod_123",
  variant_id: "var_456",
  check_reservations: true // Trừ đi số lượng đã đặt chỗ
};
```

#### `reserve_inventory`
**Mục đích**: Đặt chỗ tồn kho cho đơn hàng

**Reservation Strategies**:
```typescript
// Đặt chỗ cho đơn hàng
const orderReservation = {
  items: [
    {
      product_id: "prod_123",
      variant_id: "var_456",
      quantity: 2,
      location_id: "warehouse_hcm"
    }
  ],
  order_id: "order_789",
  expires_at: "2024-12-31T23:59:59Z" // Hết hạn sau 24h
};

// Đặt chỗ tạm thời (giỏ hàng)
const tempReservation = {
  items: [
    {
      product_id: "prod_123",
      quantity: 1
    }
  ],
  expires_at: "2024-12-25T10:30:00Z" // Hết hạn sau 30 phút
};
```

## 🎨 Media Management Tools

### File Operations

#### `upload_media`
**Mục đích**: Tải lên file media

**Upload Strategies**:
```typescript
// Upload hình ảnh sản phẩm
const productImage = {
  file_url: "https://example.com/image.jpg",
  file_name: "product-main-image.jpg",
  alt_text: "Áo thun cotton cao cấp màu xanh",
  folder: "products/clothing",
  tags: ["product", "clothing", "main-image"]
};

// Upload video demo
const productVideo = {
  file_url: "https://example.com/demo.mp4",
  file_name: "product-demo.mp4",
  alt_text: "Video demo sản phẩm",
  folder: "products/videos",
  tags: ["product", "demo", "video"]
};
```

## 🌐 Translation Management Tools

### Multi-language Support

#### Product Translations
```typescript
// Tạo bản dịch tiếng Anh
const englishTranslation = {
  product_id: "prod_123",
  language_code: "en",
  name: "Premium Cotton T-Shirt",
  description: "High-quality 100% cotton t-shirt",
  seo_title: "Premium Cotton T-Shirt - Men's Fashion",
  seo_description: "Comfortable and stylish cotton t-shirt for men"
};

// Tạo bản dịch tiếng Trung
const chineseTranslation = {
  product_id: "prod_123",
  language_code: "zh",
  name: "优质棉质T恤",
  description: "100%纯棉高品质T恤",
  seo_title: "优质棉质T恤 - 男装时尚",
  seo_description: "舒适时尚的男士棉质T恤"
};
```

#### Bulk Translation Operations
```typescript
// Tạo hàng loạt bản dịch
const bulkTranslations = {
  translations: [
    {
      entity_type: "product",
      entity_id: "prod_123",
      language_code: "en",
      fields: { name: "Product Name EN", description: "Description EN" }
    },
    {
      entity_type: "category",
      entity_id: "cat_456",
      language_code: "en",
      fields: { name: "Category Name EN" }
    }
  ]
};
```

## 🔧 System Operations Tools

### Health & Monitoring

#### `health_check`
**Mục đích**: Kiểm tra sức khỏe hệ thống

**Health Indicators**:
- API response time
- Database connectivity
- Cache status
- External service availability
- Memory usage
- Disk space

#### `get_system_info`
**Mục đích**: Lấy thông tin hệ thống và khả năng

**System Information**:
- API version
- Available endpoints
- Rate limits
- Supported features
- Server timezone
- Maintenance windows

## 📊 Tool Usage Patterns

### Common Workflows

#### 1. Product Creation Workflow
```
1. create_category (nếu cần)
2. upload_media (hình ảnh sản phẩm)
3. create_product (với media URLs)
4. create_product_translation (đa ngôn ngữ)
5. create_inventory (thiết lập tồn kho)
6. create_pricing_rule (nếu có khuyến mãi)
```

#### 2. Order Processing Workflow
```
1. create_cart
2. add_cart_item (nhiều lần)
3. apply_pricing_rules
4. check_inventory
5. reserve_inventory
6. get_cart_summary
```

#### 3. Catalog Management Workflow
```
1. list_categories (xem cấu trúc)
2. search_products (tìm sản phẩm cần cập nhật)
3. update_product (cập nhật thông tin)
4. bulk_calculate_price (tính lại giá)
5. get_system_info (kiểm tra trạng thái)
```

### Performance Tips

#### Batch Operations
- Sử dụng `bulk_*` tools khi có thể
- Gom nhóm các operations liên quan
- Tránh gọi API trong vòng lặp

#### Caching Strategy
- Cache kết quả `list_categories`
- Cache thông tin sản phẩm ít thay đổi
- Invalidate cache khi có update

#### Error Handling
- Luôn kiểm tra response.success
- Implement retry logic cho network errors
- Log errors để debug

---

*Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng từng tool một cách hiệu quả. Để biết thêm ví dụ cụ thể, xem thư mục `examples/`.*