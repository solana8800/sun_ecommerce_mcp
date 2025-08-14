# Hướng dẫn Convert sang Node.js thuần

Nếu bạn muốn loại bỏ hoàn toàn TypeScript và chỉ sử dụng JavaScript thuần, đây là các bước cần thực hiện:

## 🔄 Các bước convert

### 1. Backup project hiện tại
```bash
cp -r mcp-server mcp-server-typescript-backup
```

### 2. Loại bỏ TypeScript dependencies

**Cập nhật `package.json`:**
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "node src/index.js",
    "test": "jest",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "axios": "^1.6.0",
    "uuid": "^9.0.0",
    "date-fns": "^3.0.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### 3. Rename files từ .ts sang .js
```bash
find src -name "*.ts" -exec sh -c 'mv "$1" "${1%.ts}.js"' _ {} \;
```

### 4. Loại bỏ TypeScript syntax

**Thay thế trong tất cả files:**
- Loại bỏ type annotations: `: string`, `: number`, etc.
- Loại bỏ interface definitions
- Loại bỏ type imports
- Thay thế `import type` thành `import`
- Loại bỏ generic types: `<T>`, `Array<string>`, etc.

**Ví dụ:**
```javascript
// Trước (TypeScript)
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { Config } from './types/index.js';

class SunEcommerceMCPServer {
  private server: Server;
  private apiClient: SunEcommerceApiClient;
  
  constructor(config: Config) {
    // ...
  }
  
  async handleTool(name: string, args: Record<string, any>): Promise<any> {
    // ...
  }
}

// Sau (JavaScript)
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

class SunEcommerceMCPServer {
  constructor(config) {
    this.server = null;
    this.apiClient = null;
    // ...
  }
  
  async handleTool(name, args) {
    // ...
  }
}
```

### 5. Loại bỏ Zod validation (optional)

Nếu muốn loại bỏ hoàn toàn Zod:
```javascript
// Thay thế Zod validation bằng manual validation
function validateConfig(config) {
  if (!config.baseUrl) {
    throw new Error('baseUrl is required');
  }
  if (typeof config.timeout !== 'number') {
    config.timeout = 30000;
  }
  return config;
}
```

### 6. Cập nhật import paths

Loại bỏ `.js` extension trong imports nếu cần:
```javascript
// Có thể cần thay đổi từ:
import { something } from './file.js';
// Thành:
import { something } from './file';
```

### 7. Loại bỏ files không cần thiết
```bash
rm tsconfig.json
rm -rf dist/
rm src/types/ # Nếu chỉ chứa TypeScript types
```

### 8. Cập nhật .gitignore
```gitignore
# Loại bỏ TypeScript specific
# *.tsbuildinfo
# dist/

# Thêm nếu cần
node_modules/
.env
*.log
```

## ⚠️ Lưu ý quan trọng

1. **Mất type safety**: Không còn kiểm tra kiểu dữ liệu compile-time
2. **Debugging khó hơn**: Lỗi chỉ xuất hiện runtime
3. **IDE support kém hơn**: Ít autocomplete và IntelliSense
4. **Maintainability**: Code khó maintain hơn cho dự án lớn

## 🔍 Kiểm tra sau khi convert

```bash
# Cài đặt dependencies mới
npm install

# Kiểm tra syntax
node --check src/index.js

# Chạy thử
node src/index.js

# Test với Claude MCP
# Cập nhật cấu hình Claude để trỏ đến src/index.js
```

## 🤔 Có nên convert không?

**Nên convert nếu:**
- Team không quen TypeScript
- Dự án nhỏ, đơn giản
- Muốn giảm complexity
- Có vấn đề với build process

**Không nên convert nếu:**
- Dự án lớn, phức tạp
- Team đã quen TypeScript
- Cần type safety
- Có nhiều external APIs

## 💡 Giải pháp thay thế

Thay vì convert hoàn toàn, có thể:
1. Sử dụng script `run-ts.js` đã tạo
2. Setup auto-build khi file thay đổi
3. Sử dụng Docker với build step
4. Tạo wrapper script cho Claude MCP