
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
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_BASE_URL": "http://localhost:8080",
        "SUN_ECOMMERCE_AUTH_TOKEN": "your-api-token"
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
      "command": "node",
      "args": ["/Users/aloha/Documents/projects/sun_ecommerce_product/mcp-server/dist/index.js"],
      "env": {
        "SUN_ECOMMERCE_BASE_URL": "http://localhost:8080",
        "SUN_ECOMMERCE_AUTH_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

#### Dành cho phát triển
```bash
# Clone và cài đặt
git clone git@github.com:solana8800/sun_ecommerce.git
cd mcp-server
npm install

# Build
npm run build

# Chạy local
npm start
```

### Cấu hình

Thiết lập các biến môi trường sau:

```bash
# Bắt buộc
SUN_ECOMMERCE_BASE_URL=http://localhost:8080    # Địa chỉ nền tảng
SUN_ECOMMERCE_AUTH_TOKEN=sun-ecommerce          # Token xác thực

# Tuỳ chọn
SUN_ECOMMERCE_API_VERSION=v1                    # Phiên bản API (mặc định: v1)
SUN_ECOMMERCE_TIMEOUT=30000                     # Timeout request (mặc định: 30s)
SUN_ECOMMERCE_RETRIES=3                         # Số lần retry (mặc định: 3)
SUN_ECOMMERCE_ENABLE_LOGGING=true               # Bật logging (mặc định: true)
```

## 🛠️ Các công cụ hỗ trợ

### Product Management
- `create_product` - Tạo sản phẩm mới với đầy đủ cấu hình
- `search_products` - Tìm kiếm sản phẩm với bộ lọc nâng cao
- `get_product` - Lấy thông tin chi tiết sản phẩm
- `update_product` - Cập nhật sản phẩm

### Category Management
- `create_category` - Tạo danh mục sản phẩm
- `list_categories` - Liệt kê hoặc lấy cây danh mục
- `get_category` - Lấy chi tiết danh mục

### Pricing Rules
- `create_pricing_rule` - Thiết lập quy tắc giá, khuyến mãi
- `apply_pricing_rules` - Tính giá với quy tắc áp dụng
- `list_pricing_rules` - Liệt kê quy tắc giá
- `validate_pricing_rule` - Kiểm tra cấu hình quy tắc

### Cart Operations
- `create_cart` - Tạo giỏ hàng
- `add_cart_item` - Thêm sản phẩm vào giỏ
- `get_cart` - Lấy chi tiết giỏ hàng
- `get_cart_summary` - Tổng hợp giá trị giỏ hàng

### Inventory Management
- `check_inventory` - Kiểm tra tồn kho
- `reserve_inventory` - Đặt chỗ tồn kho cho đơn hàng
- `get_inventory` - Lấy thông tin tồn kho

### Media Management
- `upload_media` - Tải lên media sản phẩm
- `list_media` - Liệt kê file media

### System Operations
- `health_check` - Kiểm tra sức khoẻ hệ thống
- `get_system_info` - Lấy thông tin hệ thống

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

## 📄 Giấy phép

Dự án này theo giấy phép MIT - xem [LICENSE](./LICENSE) để biết chi tiết.

## 🆘 Hỗ trợ

- **Documentation**: [docs.sun-ecommerce.com](https://docs.sun-ecommerce.com)
- **Issues**: [GitHub Issues](https://github.com/sun-ecommerce/mcp-server/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sun-ecommerce/mcp-server/discussions)
- **Email**: support@sun-ecommerce.com

## 🎉 Ghi nhận

- Xây dựng với [Model Context Protocol](https://modelcontextprotocol.io/)
- Lấy cảm hứng từ OpenBnB Airbnb MCP implementation
- Cảm ơn đội ngũ Sun eCommerce Platform đã thiết kế và kiểm thử API

---

**Sẵn sàng nâng tầm phát triển eCommerce với AI? Bắt đầu ngay hôm nay!** 🚀
