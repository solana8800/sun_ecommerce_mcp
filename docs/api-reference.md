# API Reference - Sun eCommerce MCP Server

Tài liệu tham khảo API đầy đủ cho Sun eCommerce MCP Server, bao gồm tất cả các tools, resources và prompts có sẵn.

## 📋 Tổng quan

Sun eCommerce MCP Server cung cấp giao diện Model Context Protocol để tương tác với nền tảng Sun eCommerce. Server hỗ trợ 3 loại thành phần chính:

- **Tools**: Các công cụ thực thi hành động cụ thể
- **Resources**: Tài liệu và hướng dẫn có thể truy cập
- **Prompts**: Các prompt tương tác với AI assistant

## 🛠️ Tools API

### Product Management

#### `create_product`
Tạo sản phẩm mới trong hệ thống.

**Parameters:**
```typescript
{
  name: string;                    // Tên sản phẩm (bắt buộc)
  description?: string;            // Mô tả sản phẩm
  handle?: string;                 // URL slug (tự động tạo nếu không có)
  status?: 'draft' | 'active' | 'archived'; // Trạng thái (mặc định: draft)
  product_type?: string;           // Loại sản phẩm
  vendor?: string;                 // Nhà cung cấp
  tags?: string[];                 // Thẻ tag
  category_id?: string;            // ID danh mục
  variants?: ProductVariant[];     // Biến thể sản phẩm
  images?: string[];               // URL hình ảnh
  seo_title?: string;              // Tiêu đề SEO
  seo_description?: string;        // Mô tả SEO
  weight?: number;                 // Trọng lượng (gram)
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}
```

**Response:**
```typescript
{
  success: boolean;
  data?: Product;
  error?: string;
}
```

#### `search_products`
Tìm kiếm sản phẩm với bộ lọc nâng cao.

**Parameters:**
```typescript
{
  query?: string;                  // Từ khóa tìm kiếm
  status?: string;                 // Lọc theo trạng thái
  category_id?: string;            // Lọc theo danh mục
  vendor?: string;                 // Lọc theo nhà cung cấp
  product_type?: string;           // Lọc theo loại sản phẩm
  tags?: string[];                 // Lọc theo tags
  price_min?: number;              // Giá tối thiểu
  price_max?: number;              // Giá tối đa
  created_after?: string;          // Tạo sau ngày (ISO date)
  created_before?: string;         // Tạo trước ngày (ISO date)
  limit?: number;                  // Số lượng kết quả (mặc định: 20)
  offset?: number;                 // Bỏ qua số lượng (mặc định: 0)
  sort_by?: 'name' | 'created_at' | 'updated_at' | 'price';
  sort_order?: 'asc' | 'desc';     // Thứ tự sắp xếp
}
```

#### `get_product`
Lấy thông tin chi tiết sản phẩm theo ID.

**Parameters:**
```typescript
{
  product_id: string;              // ID sản phẩm (bắt buộc)
  include_variants?: boolean;      // Bao gồm biến thể (mặc định: true)
  include_images?: boolean;        // Bao gồm hình ảnh (mặc định: true)
  include_inventory?: boolean;     // Bao gồm tồn kho (mặc định: false)
}
```

#### `update_product`
Cập nhật thông tin sản phẩm.

**Parameters:**
```typescript
{
  product_id: string;              // ID sản phẩm (bắt buộc)
  // Các trường giống create_product (tùy chọn)
}
```

#### `delete_product`
Xóa sản phẩm khỏi hệ thống.

**Parameters:**
```typescript
{
  product_id: string;              // ID sản phẩm (bắt buộc)
  force?: boolean;                 // Xóa vĩnh viễn (mặc định: false)
}
```

### Category Management

#### `create_category`
Tạo danh mục sản phẩm mới.

**Parameters:**
```typescript
{
  name: string;                    // Tên danh mục (bắt buộc)
  description?: string;            // Mô tả danh mục
  handle?: string;                 // URL slug
  parent_id?: string;              // ID danh mục cha
  sort_order?: number;             // Thứ tự sắp xếp
  is_active?: boolean;             // Trạng thái hoạt động
  image_url?: string;              // URL hình ảnh danh mục
  seo_title?: string;              // Tiêu đề SEO
  seo_description?: string;        // Mô tả SEO
}
```

#### `list_categories`
Liệt kê danh mục với cấu trúc cây.

**Parameters:**
```typescript
{
  parent_id?: string;              // Lọc theo danh mục cha
  include_products?: boolean;      // Bao gồm số lượng sản phẩm
  is_active?: boolean;             // Lọc theo trạng thái
  tree_format?: boolean;           // Trả về dạng cây (mặc định: false)
}
```

### Pricing Rules

#### `create_pricing_rule`
Tạo quy tắc giá mới.

**Parameters:**
```typescript
{
  name: string;                    // Tên quy tắc (bắt buộc)
  description?: string;            // Mô tả quy tắc
  rule_type: 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'tiered';
  value: number;                   // Giá trị giảm giá
  conditions: {
    product_ids?: string[];        // Áp dụng cho sản phẩm cụ thể
    category_ids?: string[];       // Áp dụng cho danh mục
    min_quantity?: number;         // Số lượng tối thiểu
    min_amount?: number;           // Giá trị đơn hàng tối thiểu
    customer_groups?: string[];    // Nhóm khách hàng
  };
  start_date?: string;             // Ngày bắt đầu (ISO date)
  end_date?: string;               // Ngày kết thúc (ISO date)
  priority?: number;               // Độ ưu tiên (mặc định: 0)
  is_active?: boolean;             // Trạng thái hoạt động
  usage_limit?: number;            // Giới hạn sử dụng
}
```

#### `apply_pricing_rules`
Tính toán giá với quy tắc áp dụng.

**Parameters:**
```typescript
{
  items: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    base_price: number;
  }[];
  customer_id?: string;            // ID khách hàng
  sales_channel?: string;          // Kênh bán hàng
}
```

### Cart Management

#### `create_cart`
Tạo giỏ hàng mới.

**Parameters:**
```typescript
{
  customer_id?: string;            // ID khách hàng
  sales_channel?: string;          // Kênh bán hàng
  currency?: string;               // Đơn vị tiền tệ (mặc định: VND)
}
```

#### `add_cart_item`
Thêm sản phẩm vào giỏ hàng.

**Parameters:**
```typescript
{
  cart_id: string;                 // ID giỏ hàng (bắt buộc)
  product_id: string;              // ID sản phẩm (bắt buộc)
  variant_id?: string;             // ID biến thể
  quantity: number;                // Số lượng (bắt buộc)
  custom_price?: number;           // Giá tùy chỉnh
}
```

### Inventory Management

#### `check_inventory`
Kiểm tra tồn kho sản phẩm.

**Parameters:**
```typescript
{
  product_id: string;              // ID sản phẩm (bắt buộc)
  variant_id?: string;             // ID biến thể
  location_id?: string;            // ID địa điểm kho
  check_reservations?: boolean;    // Kiểm tra đặt chỗ (mặc định: true)
}
```

#### `reserve_inventory`
Đặt chỗ tồn kho cho đơn hàng.

**Parameters:**
```typescript
{
  items: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    location_id?: string;
  }[];
  order_id?: string;               // ID đơn hàng
  expires_at?: string;             // Thời gian hết hạn đặt chỗ
}
```

### Media Management

#### `upload_media`
Tải lên file media.

**Parameters:**
```typescript
{
  file_url: string;                // URL file cần tải lên (bắt buộc)
  file_name?: string;              // Tên file
  alt_text?: string;               // Văn bản thay thế
  folder?: string;                 // Thư mục lưu trữ
  tags?: string[];                 // Tags cho file
}
```

### Translation Management

#### `create_product_translation`
Tạo bản dịch cho sản phẩm.

**Parameters:**
```typescript
{
  product_id: string;              // ID sản phẩm (bắt buộc)
  language_code: string;           // Mã ngôn ngữ (vi, en, etc.)
  name?: string;                   // Tên sản phẩm đã dịch
  description?: string;            // Mô tả đã dịch
  seo_title?: string;              // Tiêu đề SEO đã dịch
  seo_description?: string;        // Mô tả SEO đã dịch
}
```

## 📚 Resources API

### Documentation Resources

#### `docs://api-reference`
Tài liệu API đầy đủ (file này).

#### `docs://integration-guide`
Hướng dẫn tích hợp MCP server.

#### `docs://best-practices`
Các thực hành tốt nhất khi sử dụng API.

#### `docs://troubleshooting`
Hướng dẫn xử lý sự cố phổ biến.

### Example Resources

#### `examples://product-management`
Ví dụ quản lý sản phẩm chi tiết.

#### `examples://pricing-rules`
Ví dụ thiết lập quy tắc giá.

#### `examples://cart-management`
Ví dụ quản lý giỏ hàng.

## 🎯 Prompts API

### Interactive Wizards

#### `create-product-wizard`
Hướng dẫn tạo sản phẩm từng bước.

**Arguments:**
```typescript
{
  product_type?: 'simple' | 'configurable' | 'bundle';
  complexity?: 'basic' | 'advanced';
}
```

#### `setup-pricing-rule`
Hướng dẫn thiết lập quy tắc giá.

**Arguments:**
```typescript
{
  rule_type?: 'discount' | 'promotion' | 'tiered';
  target?: 'product' | 'category' | 'customer';
}
```

### Troubleshooting Prompts

#### `troubleshoot-api`
Chẩn đoán sự cố API.

**Arguments:**
```typescript
{
  error_code?: string;
  operation?: string;
  context?: string;
}
```

### Business Consulting

#### `ecommerce-consultant`
Tư vấn chiến lược thương mại điện tử.

**Arguments:**
```typescript
{
  business_type?: string;
  current_challenges?: string[];
  goals?: string[];
}
```

#### `pricing-strategy-advisor`
Tư vấn chiến lược giá.

**Arguments:**
```typescript
{
  product_category?: string;
  market_position?: 'premium' | 'mid-range' | 'budget';
  competition_level?: 'high' | 'medium' | 'low';
}
```

## 🔧 Error Handling

### Standard Error Response
```typescript
{
  success: false;
  error: {
    code: string;                  // Mã lỗi
    message: string;               // Thông báo lỗi
    details?: any;                 // Chi tiết lỗi
    suggestion?: string;           // Gợi ý xử lý
  };
}
```

### Common Error Codes

- `AUTH_FAILED` - Xác thực thất bại
- `INVALID_REQUEST` - Yêu cầu không hợp lệ
- `RESOURCE_NOT_FOUND` - Không tìm thấy tài nguyên
- `VALIDATION_ERROR` - Lỗi kiểm tra dữ liệu
- `RATE_LIMIT_EXCEEDED` - Vượt quá giới hạn request
- `SERVER_ERROR` - Lỗi máy chủ

## 📊 Rate Limiting

- **Default**: 100 requests/minute
- **Burst**: 200 requests trong 10 giây
- **Headers**: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## 🔐 Authentication

Tất cả API calls yêu cầu authentication token trong header:
```
Authorization: Bearer {SUN_ECOMMERCE_AUTH_TOKEN}
```

## 📝 Versioning

API hiện tại sử dụng version `v1`. Version được chỉ định trong base URL:
```
http://42.96.60.253:8080/api/v1/
```

## 🌐 Internationalization

API hỗ trợ đa ngôn ngữ thông qua header:
```
Accept-Language: vi-VN, en-US
```

Các ngôn ngữ được hỗ trợ:
- `vi-VN` - Tiếng Việt
- `en-US` - English
- `zh-CN` - 中文
- `ja-JP` - 日本語

---

*Tài liệu này được cập nhật thường xuyên. Phiên bản mới nhất luôn có sẵn tại repository.*