# Hướng dẫn tích hợp Sun eCommerce Platform MCP

Tài liệu này cung cấp hướng dẫn chi tiết để tích hợp máy chủ MCP Sun eCommerce Platform với các AI assistant và môi trường phát triển khác nhau.

## 🎯 Tổng quan

MCP server của Sun eCommerce cho phép AI assistant:
- Hiểu và điều khiển toàn bộ nền tảng eCommerce
- Giao tiếp tự nhiên cho các thao tác phức tạp
- Đưa ra hướng dẫn thông minh, xử lý sự cố
- Tự động hóa các tác vụ thương mại điện tử
- Tư vấn chiến lược kinh doanh

## 🔧 Các phương thức cài đặt

### Tích hợp với Claude Desktop

#### Bước 1: Xác định file cấu hình
Tìm file cấu hình Claude Desktop:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

#### Bước 2: Thêm cấu hình MCP Server
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8081",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce",
        "SUN_ECOMMERCE_API_VERSION": "v1",
        "SUN_ECOMMERCE_TIMEOUT": "30000",
        "SUN_ECOMMERCE_RETRIES": "3",
        "SUN_ECOMMERCE_ENABLE_LOGGING": "true"
      }
    }
  }
}
```

#### Bước 3: Khởi động lại Claude Desktop
Khởi động lại Claude Desktop để áp dụng cấu hình mới.

### Tích hợp với Cursor

#### Cài đặt toàn cục
1. Vào **Cursor Settings** > **Tools & Integrations**
2. Chọn **"New MCP Server"**
3. Thêm cấu hình:

```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8081",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

#### Cài đặt cho từng dự án
Tạo file `.cursor/mcp.json` ở thư mục gốc dự án:

```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "http://42.96.60.253:8081",
        "SUN_ECOMMERCE_API_TOKEN": "sun-ecommerce"
      }
    }
  }
}
```

### Cài đặt cho phát triển

#### Phát triển local
```bash
# Clone repository
git clone https://github.com/sun-ecommerce/mcp-server.git
cd mcp-server

# Cài dependencies
npm install

# Build project
npm run build

# Thiết lập biến môi trường
export SUN_ECOMMERCE_API_URL="http://42.96.60.253:8081"
export SUN_ECOMMERCE_API_TOKEN="your-dev-token"

# Chạy server
npm start
```

#### Cài đặt bằng Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY docs/ ./docs/

EXPOSE 3000

ENV SUN_ECOMMERCE_API_URL=http://42.96.60.253:8081
ENV SUN_ECOMMERCE_API_VERSION=v1

CMD ["node", "dist/index.js"]
```

```bash
# Build và chạy
docker build -t sun-ecommerce-mcp .
docker run -p 3000:3000 \
  -e SUN_ECOMMERCE_API_URL=http://42.96.60.253:8081 \
  -e SUN_ECOMMERCE_API_TOKEN=your-token \
  sun-ecommerce-mcp
```

## ⚙️ Cấu hình

### Biến môi trường

| Biến | Bắt buộc | Mặc định | Mô tả |
|----------|----------|---------|-------------|
| `SUN_ECOMMERCE_API_URL` | ✅ | - | Địa chỉ nền tảng |
| `SUN_ECOMMERCE_API_TOKEN` | ✅ | - | Token xác thực API |
| `SUN_ECOMMERCE_API_VERSION` | ❌ | `v1` | Phiên bản API |
| `SUN_ECOMMERCE_TIMEOUT` | ❌ | `30000` | Timeout request (ms) |
| `SUN_ECOMMERCE_RETRIES` | ❌ | `3` | Số lần retry |
| `SUN_ECOMMERCE_ENABLE_LOGGING` | ❌ | `true` | Bật debug logging |

### Thiết lập xác thực

#### Tạo API Token
1. Đăng nhập admin panel Sun eCommerce Platform
2. Vào **Settings** > **API Keys**
3. Chọn **"Generate New API Key"**
4. Cấp quyền phù hợp:
   - Product Management: Read/Write
   - Category Management: Read/Write
   - Pricing Rules: Read/Write
   - Cart Operations: Read/Write
   - Inventory Management: Read/Write
   - Media Management: Read/Write
5. Sao chép token vừa tạo

#### Quyền token
Đảm bảo token có các quyền sau:
- `products:read` - Xem sản phẩm
- `products:write` - Tạo/cập nhật sản phẩm
- `categories:read` - Xem danh mục
- `categories:write` - Tạo/cập nhật danh mục
- `pricing:read` - Xem quy tắc giá
- `pricing:write` - Tạo/cập nhật quy tắc giá
- `cart:read` - Xem giỏ hàng
- `cart:write` - Quản lý giỏ hàng
- `inventory:read` - Xem tồn kho
- `inventory:write` - Quản lý tồn kho
- `media:read` - Xem media
- `media:write` - Upload media

## 🧪 Kiểm thử tích hợp

### Kiểm tra sức khoẻ cơ bản
```bash
# Test trực tiếp MCP server
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "health_check",
      "arguments": {}
    }
  }'
```

### Kiểm thử với AI Assistant
Sau khi tích hợp, thử nghiệm với AI assistant:

1. **Chức năng cơ bản**:
   ```
   "Check the health of the Sun eCommerce platform"
   ```

2. **Tìm kiếm sản phẩm**:
   ```
   "Search for products containing 'shirt' in the name"
   ```

3. **Thông tin hệ thống**:
   ```
   "What capabilities does the Sun eCommerce platform have?"
   ```

## 🔍 Xử lý sự cố

### Lỗi thường gặp

#### 1. Lỗi xác thực
**Lỗi**: `401 Unauthorized`
**Giải pháp**:
- Kiểm tra token API
- Kiểm tra quyền token
- Đảm bảo token còn hiệu lực

#### 2. Lỗi kết nối
**Lỗi**: `ECONNREFUSED` hoặc timeout
**Giải pháp**:
- Kiểm tra base URL
- Kiểm tra kết nối mạng
- Đảm bảo nền tảng đang chạy

#### 3. Không tìm thấy MCP Server
**Lỗi**: `Command not found: npx`
**Giải pháp**:
- Cài Node.js 18.0.0 trở lên
- Đảm bảo npm có trong PATH
- Thử dùng đường dẫn đầy đủ tới npx

#### 4. Lỗi quyền truy cập
**Lỗi**: `403 Forbidden`
**Giải pháp**:
- Kiểm tra quyền token
- Kiểm tra quyền truy cập endpoint
- Liên hệ admin hệ thống

### Chế độ debug
Bật log chi tiết:
```bash
export SUN_ECOMMERCE_ENABLE_LOGGING=true
export DEBUG=sun-ecommerce:*
```

### Phân tích log
Kiểm tra log với các pattern:
- `[API Request]` - Gọi API ra ngoài
- `[API Response]` - Phản hồi API
- `[Error]` - Lỗi
- `[Retry]` - Thử lại

## 🚀 Cấu hình nâng cao

### Endpoint tuỳ chỉnh
Dành cho triển khai riêng:
```json
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "https://custom-domain.com",
        "SUN_ECOMMERCE_API_VERSION": "v2",
        "SUN_ECOMMERCE_CUSTOM_HEADERS": "{\"X-Custom-Header\": \"value\"}"
      }
    }
  }
}
```

### Load Balancing
Dành cho hệ thống HA:
```json
{
  "mcpServers": {
    "sun-ecommerce-primary": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "https://primary.sun-ecommerce.com"
      }
    },
    "sun-ecommerce-backup": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "https://backup.sun-ecommerce.com"
      }
    }
  }
}
```

### Tối ưu hiệu năng
Dành cho môi trường tải lớn:
```json
{
  "env": {
    "SUN_ECOMMERCE_TIMEOUT": "60000",
    "SUN_ECOMMERCE_RETRIES": "5",
    "SUN_ECOMMERCE_RATE_LIMIT": "1000",
    "SUN_ECOMMERCE_CACHE_TTL": "300"
  }
}
```

## 📊 Giám sát hệ thống

### Theo dõi sức khoẻ
Thiết lập health check định kỳ:
```bash
#!/bin/bash
# health-check.sh
response=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"health_check","arguments":{}}}')

if [ $response -eq 200 ]; then
  echo "MCP Server is healthy"
  exit 0
else
  echo "MCP Server is unhealthy (HTTP $response)"
  exit 1
fi
```

### Chỉ số hiệu năng
Theo dõi các chỉ số:
- Thời gian phản hồi
- Tỷ lệ lỗi
- Số lượng request
- Dung lượng bộ nhớ
- Sử dụng CPU

## 🔐 Best practice bảo mật

### Bảo mật API Token
- Lưu token trong biến môi trường, không để trong code
- Dùng token riêng cho từng môi trường
- Thường xuyên thay đổi token
- Giới hạn quyền token ở mức tối thiểu

### Bảo mật mạng
- Sử dụng HTTPS cho mọi giao tiếp
- Thiết lập firewall hợp lý
- Xem xét dùng VPN cho triển khai nội bộ
- Theo dõi truy cập bất thường

### Kiểm soát truy cập
- Áp dụng RBAC
- Log toàn bộ truy cập API
- Thiết lập cảnh báo truy cập bất thường
- Audit bảo mật định kỳ

## 📈 Mở rộng hệ thống

### Scale ngang
- Deploy nhiều instance MCP server
- Dùng load balancer phân phối
- Thiết lập health check
- Xem xét orchestration container

### Scale dọc
- Theo dõi tài nguyên
- Tăng RAM/CPU khi cần
- Tối ưu truy vấn DB
- Áp dụng cache

## 🎓 Bước tiếp theo

1. **Khám phá công cụ**: Thử các tool MCP với AI assistant
2. **Đọc hướng dẫn**: Xem các guide tính năng cụ thể
3. **Tham gia cộng đồng**: Thảo luận, hỗ trợ
4. **Đóng góp**: Góp phần phát triển MCP server

Xem thêm chi tiết tại:
- [API Reference](./api-reference.md)
- [Best Practices](./best-practices.md)
- [Performance Guide](./performance.md)
- [Security Guide](./security.md)
