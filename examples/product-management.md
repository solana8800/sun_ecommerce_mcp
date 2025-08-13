# Ví dụ quản lý sản phẩm

Tài liệu này cung cấp các ví dụ thực tế sử dụng MCP server Sun eCommerce Platform cho các tác vụ quản lý sản phẩm.

## 🎯 Thao tác sản phẩm cơ bản

### Tạo sản phẩm đơn giản

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo sản phẩm đơn giản tên 'Premium Cotton T-Shirt' với SKU 'COTTON-TEE-001', giá $29.99, thuộc danh mục 'Apparel'"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Premium Cotton T-Shirt",
    "sku": "COTTON-TEE-001",
    "productType": "simple",
    "price": 29.99,
    "description": "High-quality 100% cotton t-shirt with premium finish",
    "categoryId": "category-uuid-here",
    "status": "active",
    "tags": ["cotton", "premium", "apparel", "casual"]
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "product-uuid-123",
    "name": "Premium Cotton T-Shirt",
    "sku": "COTTON-TEE-001",
    "price": 29.99,
    "status": "active"
  },
  "nextSteps": [
    "Add product images using upload_media tool",
    "Set up inventory using check_inventory tool",
    "Configure pricing rules if needed",
    "Add product to categories"
  ]
}
```

### Tạo sản phẩm cấu hình (configurable)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo sản phẩm cấu hình 'Athletic Running Shoes' với biến thể size (8-12) và màu (đen, trắng, xanh), giá gốc $89.99"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Athletic Running Shoes",
    "sku": "RUNNING-SHOES-001",
    "productType": "configurable",
    "price": 89.99,
    "description": "Professional athletic running shoes with advanced cushioning",
    "categoryId": "shoes-category-uuid",
    "status": "active",
    "variants": [
      {
        "attributes": {"size": "8", "color": "black"},
        "sku": "RUNNING-SHOES-001-8-BLK",
        "price": 89.99
      },
      {
        "attributes": {"size": "9", "color": "white"},
        "sku": "RUNNING-SHOES-001-9-WHT",
        "price": 89.99
      }
    ],
    "configurableAttributes": ["size", "color"]
  }
}
```

## 🔍 Tìm kiếm & khám phá sản phẩm

### Tìm kiếm nâng cao

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tìm tất cả sản phẩm active trong danh mục electronics, giá từ $100-$500, sắp xếp tăng dần theo giá"
```

**Gọi tool MCP:**
```json
{
  "tool": "search_products",
  "arguments": {
    "categoryId": "electronics-category-uuid",
    "status": "active",
    "priceMin": 100,
    "priceMax": 500,
    "page": 1,
    "pageSize": 20
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Found 15 products",
  "data": {
    "products": [
      {
        "id": "product-1",
        "name": "Wireless Headphones",
        "price": 149.99,
        "category": "Electronics"
      }
    ],
    "total": 15,
    "page": 1,
    "pageSize": 20
  },
  "searchTips": [
    "Use specific keywords for better results",
    "Filter by category or product type",
    "Use price range filters for targeted searches"
  ]
}
```

### Tìm kiếm sản phẩm theo từ khoá

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tìm sản phẩm có từ 'wireless' trong tên hoặc mô tả"
```

**Gọi tool MCP:**
```json
{
  "tool": "search_products",
  "arguments": {
    "search": "wireless",
    "page": 1,
    "pageSize": 10
  }
}
```

## 📊 Lấy thông tin sản phẩm

### Lấy chi tiết sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Lấy đầy đủ thông tin sản phẩm ID 'prod-123' gồm biến thể, tồn kho, giá"
```

**Gọi tool MCP:**
```json
{
  "tool": "get_product",
  "arguments": {
    "id": "prod-123",
    "includeVariants": true,
    "includeInventory": true,
    "includePricing": true
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "prod-123",
    "name": "Premium Cotton T-Shirt",
    "sku": "COTTON-TEE-001",
    "price": 29.99,
    "variants": [
      {
        "id": "variant-1",
        "attributes": {"size": "M", "color": "blue"},
        "sku": "COTTON-TEE-001-M-BLU",
        "inventory": {
          "quantity": 50,
          "available": 45,
          "reserved": 5
        }
      }
    ],
    "pricing": {
      "basePrice": 29.99,
      "compareAtPrice": 39.99,
      "costPrice": 15.00,
      "margin": 50.0
    }
  },
  "availableActions": [
    "Update product details",
    "Manage inventory",
    "Set pricing rules",
    "Upload media",
    "Add translations"
  ]
}
```

## ✏️ Cập nhật sản phẩm

### Cập nhật thông tin sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Cập nhật sản phẩm 'prod-123' đổi giá thành $34.99 và thêm tag 'premium', 'bestseller'"
```

**Gọi tool MCP:**
```json
{
  "tool": "update_product",
  "arguments": {
    "id": "prod-123",
    "price": 34.99,
    "tags": ["premium", "bestseller", "cotton", "apparel"]
  }
}
```

### Cập nhật hàng loạt sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Cập nhật tất cả sản phẩm trong danh mục 'summer-collection' giảm 20% và thêm tag 'summer-sale'"
```

**Workflow:**
1. Tìm sản phẩm trong danh mục
2. Cập nhật từng sản phẩm với giá và tag mới

```json
{
  "tool": "search_products",
  "arguments": {
    "categoryId": "summer-collection-uuid",
    "status": "active"
  }
}
```

Sau đó với từng sản phẩm:
```json
{
  "tool": "update_product",
  "arguments": {
    "id": "product-id",
    "compareAtPrice": "original-price",
    "price": "discounted-price",
    "tags": ["existing-tags", "summer-sale"]
  }
}
```

## 🏷️ Danh mục sản phẩm

### Tạo danh mục sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo danh mục 'Athletic Wear' dưới 'Apparel', mô tả 'High-performance athletic clothing and accessories'"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_category",
  "arguments": {
    "name": "Athletic Wear",
    "description": "High-performance athletic clothing and accessories",
    "parentId": "apparel-category-uuid",
    "slug": "athletic-wear",
    "isActive": true,
    "sortOrder": 10
  }
}
```

### Lấy cây danh mục

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Hiển thị toàn bộ cây danh mục của cửa hàng"
```

**Gọi tool MCP:**
```json
{
  "tool": "list_categories",
  "arguments": {
    "tree": true
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Category tree retrieved successfully",
  "data": {
    "categories": [
      {
        "id": "apparel-uuid",
        "name": "Apparel",
        "children": [
          {
            "id": "athletic-wear-uuid",
            "name": "Athletic Wear",
            "children": []
          },
          {
            "id": "casual-wear-uuid",
            "name": "Casual Wear",
            "children": []
          }
        ]
      }
    ]
  },
  "structure": "hierarchical"
}
```

## 🎨 Thuộc tính sản phẩm

### Tạo thuộc tính sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo thuộc tính sản phẩm 'Material' với giá trị 'Cotton', 'Polyester', 'Blend' cho sản phẩm quần áo"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_attribute",
  "arguments": {
    "name": "Material",
    "type": "select",
    "isRequired": true,
    "isFilterable": true,
    "description": "Product material composition"
  }
}
```

Sau đó thêm giá trị thuộc tính:
```json
{
  "tool": "create_attribute_value",
  "arguments": {
    "attributeId": "material-attribute-uuid",
    "value": "Cotton",
    "sortOrder": 1
  }
}
```

## 📸 Quản lý media sản phẩm

### Upload ảnh sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Upload ảnh sản phẩm cho 'prod-123' với alt text 'Premium Cotton T-Shirt - Front View'"
```

**Gọi tool MCP:**
```json
{
  "tool": "upload_media",
  "arguments": {
    "entityType": "product",
    "entityId": "prod-123",
    "fileName": "cotton-tshirt-front.jpg",
    "mediaType": "image",
    "altText": "Premium Cotton T-Shirt - Front View",
    "title": "Product Front View"
  }
}
```

### Liệt kê media sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Hiển thị tất cả ảnh của sản phẩm 'prod-123'"
```

**Gọi tool MCP:**
```json
{
  "tool": "list_media",
  "arguments": {
    "entityType": "product",
    "entityId": "prod-123",
    "mediaType": "image"
  }
}
```

## 🔄 Workflow sản phẩm hoàn chỉnh

### Thiết lập sản phẩm hoàn chỉnh

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Hãy giúp tôi setup sản phẩm hoàn chỉnh: tạo 'Wireless Bluetooth Speaker', thêm vào danh mục 'Electronics', upload ảnh, setup tồn kho, tạo khuyến mãi ra mắt"
```

**Các bước workflow:**

1. **Tạo sản phẩm:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Wireless Bluetooth Speaker",
    "sku": "BT-SPEAKER-001",
    "productType": "simple",
    "price": 79.99,
    "categoryId": "electronics-uuid"
  }
}
```

2. **Upload ảnh sản phẩm:**
```json
{
  "tool": "upload_media",
  "arguments": {
    "entityType": "product",
    "entityId": "new-product-uuid",
    "fileName": "speaker-main.jpg",
    "mediaType": "image"
  }
}
```

3. **Thiết lập tồn kho:**
```json
{
  "tool": "check_inventory",
  "arguments": {
    "productId": "new-product-uuid",
    "quantity": 100
  }
}
```

4. **Tạo khuyến mãi ra mắt:**
```json
{
  "tool": "create_pricing_rule",
  "arguments": {
    "name": "Speaker Launch 15% Off",
    "ruleType": "percentage_discount",
    "discountValue": 15,
    "conditions": {
      "product_ids": ["new-product-uuid"]
    },
    "validFrom": "2024-01-01T00:00:00Z",
    "validTo": "2024-01-31T23:59:59Z"
  }
}
```

## 🎯 Best practice quản lý sản phẩm

### Đặt tên sản phẩm
- Sử dụng tên mô tả, dễ tìm kiếm
- Đưa thuộc tính chính vào tên
- Giữ nhất quán giữa các sản phẩm cùng loại
- Lưu ý yếu tố SEO

### Quản lý SKU
- Đặt SKU có hệ thống
- Bao gồm mã danh mục/thương hiệu
- Dễ đọc, dễ nhớ
- Đảm bảo duy nhất trên toàn hệ thống

### Tổ chức danh mục
- Tạo cây phân cấp hợp lý
- Không quá 3-4 cấp
- Tên rõ ràng, mô tả
- Xem xét hành vi điều hướng của khách

### Chiến lược thuộc tính
- Định nghĩa thuộc tính trước khi tạo sản phẩm
- Dùng tên thuộc tính nhất quán
- Thuộc tính quan trọng nên filterable
- Hỗ trợ đa ngôn ngữ nếu cần

## 🚨 Lỗi thường gặp

### Tránh các lỗi sau
1. **Trùng SKU** - Luôn kiểm tra SKU duy nhất
2. **Thiếu trường bắt buộc** - Validate dữ liệu sản phẩm
3. **Phân loại không nhất quán** - Theo đúng quy tắc danh mục
4. **Ảnh kém chất lượng** - Dùng ảnh rõ nét, chuyên nghiệp
5. **Mô tả thiếu** - Cung cấp mô tả chi tiết, chính xác

### Xử lý lỗi
```json
{
  "success": false,
  "error": "SKU already exists",
  "details": "Product with SKU 'COTTON-TEE-001' already exists",
  "suggestions": [
    "Use a different SKU",
    "Check existing products",
    "Update existing product instead"
  ]
}
```

## 📈 Tối ưu hiệu năng

### Quản lý sản phẩm hiệu quả
- Dùng batch cho cập nhật hàng loạt
- Phân trang cho catalog lớn
- Cache dữ liệu truy cập nhiều
- Tối ưu kích thước, định dạng ảnh
- Đánh index hợp lý cho search

### Theo dõi & phân tích
- Theo dõi chỉ số hiệu quả sản phẩm
- Theo dõi truy vấn tìm kiếm
- Phân tích điều hướng danh mục
- Xem tần suất cập nhật sản phẩm
- Đo conversion rate theo loại sản phẩm

Xem thêm ví dụ nâng cao tại:
- [Pricing Rules Examples](./pricing-rules.md)
- [Cart Management Examples](./cart-management.md)
- [API Workflow Examples](./api-workflows.md)
