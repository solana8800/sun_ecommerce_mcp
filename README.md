
# Sun eCommerce Platform MCP Server

Một máy chủ Model Context Protocol (MCP) toàn diện giúp AI assistant hiểu và điều khiển toàn bộ nền tảng Sun eCommerce. MCP server này cung cấp giao diện ngôn ngữ tự nhiên cho quản lý sản phẩm, quy tắc giá, kiểm soát tồn kho và tất cả API của nền tảng.

## 🌟 Tính năng nổi bật

### **Kiểm soát eCommerce toàn diện**
- **Product Management**: Tạo, cập nhật, tìm kiếm và quản lý sản phẩm với biến thể và thuộc tính
- **Pricing Rules**: Thiết lập giá động, giảm giá, khuyến mãi, giá theo tầng
- **Inventory Management**: Theo dõi tồn kho, đặt chỗ, kiểm tra khả dụng
- **Cart Operations**: Quản lý giỏ hàng, sản phẩm trong giỏ, quy trình thanh toán
- **Media Management**: Tải lên và tổ chức hình ảnh, video, tài liệu sản phẩm
- **Category Management**: Tổ chức sản phẩm theo cấu trúc danh mục phân cấp
- **Partner Management**: Quản lý đối tác kinh doanh, liên kết affiliate
- **Sales Channels**: Quản lý đa kênh bán hàng, marketplace
- **Multi-language Support**: Hỗ trợ đa ngôn ngữ, bản địa hóa toàn cầu

### **Trợ lý AI thông minh**
- **Interactive Wizards**: Hướng dẫn từng bước cho các thao tác phức tạp
- **Smart Troubleshooting**: Tự động chẩn đoán và xử lý sự cố phổ biến
- **Business Consulting**: Tư vấn chiến lược thương mại điện tử
- **Performance Optimization**: Đề xuất tối ưu hiệu năng, mở rộng
- **Security Guidance**: Khuyến nghị bảo mật cho vận hành eCommerce

### **Thân thiện với lập trình viên**
- **Comprehensive Documentation**: Tài liệu API đầy đủ, hướng dẫn tích hợp
- **Real-world Examples**: Ví dụ thực tế, workflow minh họa
- **Error Handling**: Thông báo lỗi chi tiết, hướng dẫn xử lý
- **Schema Validation**: Kiểm tra kiểu dữ liệu với Zod
- **Retry Logic**: Tự động retry với exponential backoff tăng độ tin cậy

## 🚀 Bắt đầu nhanh

### Cài đặt

#### Dành cho Claude Desktop
1. Thêm vào `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@solana8800/sun_ecommerce_mcp"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8080",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

#### Dành cho Cursor
1. Vào Cursor Settings > Tools & Integrations > New MCP Server
2. Thêm cấu hình:
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@solana8800/sun_ecommerce_mcp"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8080",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

#### Dành cho phát triển

**⚠️ Lưu ý quan trọng về TypeScript vs JavaScript:**

Claude MCP chỉ có thể chạy JavaScript đã compile, không thể chạy TypeScript trực tiếp. Có 3 cách để giải quyết:

**Cách 1: Sử dụng JavaScript đã build (Khuyến nghị)**
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "node",
      "args": ["/Users/aloha/Documents/projects/sun_ecommerce_product/mcp-server/dist/index.js"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8080",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

**Cách 2: Sử dụng script tự động (TypeScript + fallback)**
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "node",
      "args": ["/Users/aloha/Documents/projects/sun_ecommerce_product/mcp-server/run-ts.js"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8080",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

**Cách 3: Sử dụng npm script**
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npm",
      "args": ["run", "start:ts"],
      "cwd": "/Users/aloha/Documents/projects/sun_ecommerce_product/mcp-server",
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8080",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
2. Chạy local
```bash
# Clone và cài đặt
git clone git@github.com:solana8800/sun_ecommerce_mcp.git
cd mcp-server
npm install

# Build
npm run build

# Chạy local
npm start
```

3. Command local
```bash
SUN_ECOMMERCE_API_URL="http://42.96.60.253:8080" \
SUN_ECOMMERCE_API_TOKEN="sun-ecommerce" \
npx -y git+https://github.com/solana8800/sun_ecommerce_mcp.git
```

### Cấu hình

Thiết lập các biến môi trường sau:

```bash
# Bắt buộc
SUN_ECOMMERCE_API_URL=http://42.96.60.253:8080    # Địa chỉ nền tảng
SUN_ECOMMERCE_API_TOKEN=sun-ecommerce          # Token xác thực

# Tuỳ chọn
SUN_ECOMMERCE_API_VERSION=v1                    # Phiên bản API (mặc định: v1)
SUN_ECOMMERCE_TIMEOUT=30000                     # Timeout request (mặc định: 30s)
SUN_ECOMMERCE_RETRIES=3                         # Số lần retry (mặc định: 3)
SUN_ECOMMERCE_ENABLE_LOGGING=true               # Bật logging (mặc định: true)
```

## 🛠️ Các công cụ hỗ trợ

### Product Management Tools
- `create_product` - Tạo sản phẩm mới với đầy đủ cấu hình
- `search_products` - Tìm kiếm sản phẩm với bộ lọc nâng cao
- `get_product` - Lấy thông tin chi tiết sản phẩm theo ID
- `get_product_by_handle` - Lấy thông tin sản phẩm theo handle/slug
- `update_product` - Cập nhật thông tin sản phẩm
- `delete_product` - Xóa sản phẩm khỏi hệ thống

### Category Management Tools
- `create_category` - Tạo danh mục sản phẩm mới
- `list_categories` - Liệt kê hoặc lấy cây danh mục
- `get_category` - Lấy chi tiết danh mục theo ID
- `update_category` - Cập nhật thông tin danh mục
- `delete_category` - Xóa danh mục

### Pricing Rules Tools
- `create_pricing_rule` - Thiết lập quy tắc giá, khuyến mãi
- `get_pricing_rule` - Lấy thông tin quy tắc giá theo ID
- `update_pricing_rule` - Cập nhật quy tắc giá
- `delete_pricing_rule` - Xóa quy tắc giá
- `apply_pricing_rules` - Tính giá với quy tắc áp dụng
- `list_pricing_rules` - Liệt kê quy tắc giá
- `validate_pricing_rule` - Kiểm tra cấu hình quy tắc
- `get_pricing_rule_by_name` - Lấy quy tắc giá theo tên
- `update_pricing_rule_status` - Cập nhật trạng thái quy tắc giá
- `get_active_pricing_rules` - Lấy danh sách quy tắc giá đang hoạt động
- `bulk_calculate_price` - Tính toán giá hàng loạt cho nhiều sản phẩm
- `get_pricing_rules_by_priority` - Lấy quy tắc giá theo độ ưu tiên
- `bulk_update_pricing_rule_status` - Cập nhật trạng thái hàng loạt
- `get_pricing_rule_stats` - Lấy thống kê quy tắc giá
- `duplicate_pricing_rule` - Sao chép quy tắc giá

### Cart Management Tools
- `create_cart` - Tạo giỏ hàng mới
- `add_cart_item` - Thêm sản phẩm vào giỏ hàng
- `update_cart_item` - Cập nhật sản phẩm trong giỏ
- `remove_cart_item` - Xóa sản phẩm khỏi giỏ
- `get_cart` - Lấy chi tiết giỏ hàng
- `get_cart_items` - Lấy danh sách sản phẩm trong giỏ
- `get_cart_summary` - Tổng hợp giá trị giỏ hàng
- `clear_cart` - Xóa toàn bộ giỏ hàng

### Inventory Management Tools
- `create_inventory` - Tạo bản ghi tồn kho mới
- `check_inventory` - Kiểm tra tồn kho sản phẩm
- `reserve_inventory` - Đặt chỗ tồn kho cho đơn hàng
- `get_inventory` - Lấy thông tin tồn kho theo ID
- `list_inventory` - Liệt kê tồn kho với bộ lọc
- `update_inventory` - Cập nhật số lượng tồn kho

### Media Management Tools
- `upload_media` - Tải lên file media (hình ảnh, video)
- `get_media` - Lấy thông tin file media theo ID
- `list_media` - Liệt kê file media với bộ lọc
- `update_media` - Cập nhật thông tin file media
- `delete_media` - Xóa file media

### Partner Management Tools
- `create_partner` - Tạo đối tác kinh doanh mới
- `get_partner` - Lấy thông tin đối tác theo ID
- `list_partners` - Liệt kê đối tác với bộ lọc
- `update_partner` - Cập nhật thông tin đối tác
- `delete_partner` - Xóa đối tác

### Sales Channel Management Tools
- `create_sales_channel` - Tạo kênh bán hàng mới
- `get_sales_channel` - Lấy thông tin kênh bán hàng
- `list_sales_channels` - Liệt kê kênh bán hàng
- `update_sales_channel` - Cập nhật kênh bán hàng
- `delete_sales_channel` - Xóa kênh bán hàng
- `activate_sales_channel` - Kích hoạt kênh bán hàng
- `deactivate_sales_channel` - Vô hiệu hóa kênh bán hàng
- `get_sales_channel_statistics` - Lấy thống kê kênh bán hàng

### Product Attribute Management Tools
- `create_product_attribute` - Tạo thuộc tính sản phẩm mới
- `get_product_attribute` - Lấy thông tin thuộc tính theo ID
- `get_product_attribute_by_name` - Lấy thuộc tính theo tên
- `list_product_attributes` - Liệt kê thuộc tính sản phẩm
- `update_product_attribute` - Cập nhật thuộc tính
- `delete_product_attribute` - Xóa thuộc tính
- `create_attribute_value` - Tạo giá trị thuộc tính
- `get_attribute_values` - Lấy danh sách giá trị thuộc tính
- `update_attribute_value` - Cập nhật giá trị thuộc tính
- `delete_attribute_value` - Xóa giá trị thuộc tính
- `bulk_create_attribute_values` - Tạo hàng loạt giá trị thuộc tính
- `get_attribute_usage` - Lấy thông tin sử dụng thuộc tính

### Translation Management Tools
#### Product Translations
- `create_product_translation` - Tạo bản dịch cho sản phẩm
- `get_product_translation` - Lấy bản dịch sản phẩm theo ngôn ngữ
- `update_product_translation` - Cập nhật bản dịch sản phẩm
- `delete_product_translation` - Xóa bản dịch sản phẩm
- `list_product_translations` - Liệt kê tất cả bản dịch của sản phẩm

#### Category Translations
- `create_category_translation` - Tạo bản dịch cho danh mục
- `get_category_translation` - Lấy bản dịch danh mục theo ngôn ngữ
- `update_category_translation` - Cập nhật bản dịch danh mục
- `delete_category_translation` - Xóa bản dịch danh mục
- `list_category_translations` - Liệt kê tất cả bản dịch của danh mục

#### Product Attribute Translations
- `create_product_attribute_translation` - Tạo bản dịch cho thuộc tính sản phẩm
- `get_product_attribute_translation` - Lấy bản dịch thuộc tính theo ngôn ngữ
- `update_product_attribute_translation` - Cập nhật bản dịch thuộc tính
- `delete_product_attribute_translation` - Xóa bản dịch thuộc tính
- `list_product_attribute_translations` - Liệt kê bản dịch thuộc tính

#### Product Variant Translations
- `create_product_variant_translation` - Tạo bản dịch cho biến thể sản phẩm
- `get_product_variant_translation` - Lấy bản dịch biến thể theo ngôn ngữ
- `update_product_variant_translation` - Cập nhật bản dịch biến thể
- `delete_product_variant_translation` - Xóa bản dịch biến thể
- `list_product_variant_translations` - Liệt kê bản dịch biến thể

#### Bulk Translation Operations
- `bulk_create_translations` - Tạo hàng loạt bản dịch
- `bulk_delete_translations` - Xóa hàng loạt bản dịch
- `get_translation_stats` - Lấy thống kê bản dịch
- `get_supported_languages` - Lấy danh sách ngôn ngữ được hỗ trợ

### System Operations
- `health_check` - Kiểm tra sức khỏe hệ thống
- `get_system_info` - Lấy thông tin hệ thống và khả năng

## 📚 Tài liệu tham khảo

Truy cập tài liệu và hướng dẫn đầy đủ:

- **API Documentation** - Tài liệu API chi tiết
- **Getting Started Guide** - Hướng dẫn bắt đầu nhanh
- **Product Management Guide** - Quản lý sản phẩm chi tiết
- **Pricing Rules Guide** - Chiến lược giá nâng cao
- **API Integration Guide** - Hướng dẫn tích hợp API
- **Troubleshooting Guide** - Xử lý sự cố phổ biến

## 🎯 Tính năng tương tác AI

Nhận hỗ trợ AI với:

- **create-product-wizard** - Hướng dẫn tạo sản phẩm tương tác
- **setup-pricing-rule** - Cấu hình quy tắc giá
- **troubleshoot-api** - Chẩn đoán sự cố API
- **ecommerce-consultant** - Tư vấn chiến lược kinh doanh
- **optimize-catalog** - Tối ưu danh mục
- **pricing-strategy-advisor** - Tư vấn chiến lược giá

## 💡 Ví dụ sử dụng

### Tạo sản phẩm
```typescript
// AI Assistant có thể giúp bạn tạo sản phẩm tự nhiên:
"Create a new configurable t-shirt product called 'Premium Cotton Tee' 
with variants for size and color, priced at $29.99"
```

### Thiết lập quy tắc giá
```typescript
// Thiết lập giá khuyến mãi:
"Create a 20% discount rule for summer collection items, 
valid from June 1st to August 31st, minimum quantity 2"
```

### Quản lý tồn kho
```typescript
// Kiểm tra tồn kho:
"Check inventory availability for product ID abc-123, 
I need 50 units for a bulk order"
```

### Xử lý sự cố
```typescript
// Nhận trợ giúp khi gặp lỗi API:
"I'm getting a 401 error when trying to create products, 
can you help me troubleshoot this authentication issue?"
```

## 🏗️ Kiến trúc hệ thống

MCP server được xây dựng với:

- **TypeScript** - Phát triển an toàn kiểu dữ liệu
- **Zod** - Kiểm tra schema runtime
- **Axios** - HTTP client với retry logic
- **MCP SDK** - Triển khai Model Context Protocol

### Cấu trúc dự án
```
mcp/
├── src/
│   ├── client/          # API client implementation
│   ├── tools/           # MCP tool definitions and handlers
│   ├── resources/       # Documentation and guide resources
│   ├── prompts/         # Interactive prompt definitions
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Main server implementation
├── docs/                # Additional documentation
├── examples/            # Usage examples
└── tests/               # Test suites
```

## 🔧 Phát triển

### Yêu cầu
- Node.js 18.0.0 trở lên
- TypeScript 5.0 trở lên
- Có quyền truy cập Sun eCommerce Platform

### Thiết lập
```bash
# Cài dependencies
npm install

# Chạy chế độ dev
npm run dev

# Build production
npm run build

# Chạy test
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Kiểm thử
```bash
# Chạy toàn bộ test
npm test

# Chạy test suite cụ thể
npm test -- --grep "Product Management"

# Chạy với coverage
npm run test:coverage
```

## 📖 Tài liệu chi tiết

### API Reference
- [Complete API Documentation](./docs/api-reference.md)
- [Tool Reference](./docs/tools.md)
- [Resource Reference](./docs/resources.md)
- [Prompt Reference](./docs/prompts.md)

### Hướng dẫn
- [Integration Guide](./docs/integration-guide.md)
- [Best Practices](./docs/best-practices.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Performance Optimization](./docs/performance.md)

### Ví dụ
- [Product Management Examples](./examples/product-management.md)
- [Pricing Rule Examples](./examples/pricing-rules.md)
- [Cart Management Examples](./examples/cart-management.md)
- [API Workflow Examples](./examples/api-workflows.md)

## 🤝 Đóng góp

Chào mừng mọi đóng góp! Xem [Contributing Guide](./CONTRIBUTING.md) để biết chi tiết.

### Quy trình phát triển
1. Fork repository
2. Tạo branch tính năng
3. Thực hiện thay đổi
4. Thêm test
5. Gửi pull request

## 🔧 Troubleshooting

### Vấn đề TypeScript vs JavaScript với Claude MCP

**Vấn đề**: Claude MCP không thể chạy TypeScript trực tiếp, chỉ có thể chạy JavaScript đã compile.

**Nguyên nhân**:
- Claude MCP sử dụng Node.js runtime thuần túy
- TypeScript cần được transpile thành JavaScript trước khi chạy
- Các tool như `tsx` hoặc `ts-node` không được hỗ trợ trực tiếp

**Giải pháp**:

1. **Build trước khi chạy** (Khuyến nghị):
   ```bash
   npm run build
   npm start
   ```

2. **Sử dụng script tự động** (`run-ts.js`):
   - Tự động kiểm tra và sử dụng `tsx` nếu có
   - Fallback về build + run JavaScript nếu không có `tsx`
   - Sử dụng: `node run-ts.js`

3. **Convert sang Node.js thuần**:
   - Nếu muốn tránh hoàn toàn việc build
   - Viết lại code bằng JavaScript ES modules
   - Loại bỏ TypeScript dependencies

### Khuyến nghị

- **Cho production**: Luôn sử dụng JavaScript đã build (`dist/index.js`)
- **Cho development**: Sử dụng `npm run dev` với `tsx`
- **Cho Claude MCP**: Sử dụng `run-ts.js` hoặc build trước

### Kiểm tra hoạt động

```bash
# Kiểm tra TypeScript
npm run dev

# Kiểm tra JavaScript build
npm run build && npm start

# Kiểm tra script tự động
node run-ts.js
```

## 📄 Giấy phép

Dự án này theo giấy phép MIT - xem [LICENSE](./LICENSE) để biết chi tiết.

## 🆘 Hỗ trợ

- **Documentation**: [docs.sun-ecommerce.com](https://github.com/solana8800/sun_ecommerce_mcp/blob/main/README.md)
- **Issues**: [GitHub Issues](https://github.com/solana8800/sun_ecommerce_mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/solana8800/sun_ecommerce_mcp/discussions)
- **Email**: solana8800@gmail.com

## 🎉 Ghi nhận

- Xây dựng với [Model Context Protocol](https://modelcontextprotocol.io/)
- Lấy cảm hứng từ OpenBnB Airbnb MCP implementation
- Cảm ơn đội ngũ Sun eCommerce Platform đã thiết kế và kiểm thử API

---

**Sẵn sàng nâng tầm phát triển eCommerce với AI? Bắt đầu ngay hôm nay!** 🚀
