# Contributing Guide - Sun eCommerce MCP Server

Chào mừng bạn đến với dự án Sun eCommerce MCP Server! Chúng tôi rất vui khi bạn muốn đóng góp cho dự án.

## 📋 Mục lục

- [Quy tắc đóng góp](#quy-tắc-đóng-góp)
- [Thiết lập môi trường phát triển](#thiết-lập-môi-trường-phát-triển)
- [Quy trình phát triển](#quy-trình-phát-triển)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Release Process](#release-process)

## 🤝 Quy tắc đóng góp

### Code of Conduct

Chúng tôi cam kết tạo ra một môi trường thân thiện và chào đón mọi người. Vui lòng:

- Tôn trọng quan điểm và kinh nghiệm khác nhau
- Chấp nhận phản hồi xây dựng một cách nhã nhặn
- Tập trung vào những gì tốt nhất cho cộng đồng
- Thể hiện sự đồng cảm với các thành viên khác

### Các loại đóng góp được chào đón

- 🐛 **Bug reports**: Báo cáo lỗi và vấn đề
- 💡 **Feature requests**: Đề xuất tính năng mới
- 📝 **Documentation**: Cải thiện tài liệu
- 🔧 **Code contributions**: Sửa lỗi và thêm tính năng
- 🧪 **Testing**: Viết và cải thiện tests
- 🎨 **UI/UX improvements**: Cải thiện giao diện người dùng

## 🛠️ Thiết lập môi trường phát triển

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **TypeScript**: >= 5.0.0
- **Git**: Latest version

### Cài đặt

1. **Fork repository**
   ```bash
   # Fork trên GitHub, sau đó clone
   git clone https://github.com/your-username/sun_ecommerce_mcp.git
   cd sun_ecommerce_mcp
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Thiết lập environment variables**
   ```bash
   cp .env.example .env
   # Chỉnh sửa .env với các giá trị phù hợp
   ```

4. **Chạy development server**
   ```bash
   npm run dev
   ```

5. **Chạy tests**
   ```bash
   npm test
   ```

### Cấu trúc dự án

```
sun_ecommerce_mcp/
├── src/
│   ├── tools/           # MCP tools implementation
│   ├── resources/       # MCP resources implementation
│   ├── prompts/         # Interactive prompts
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── index.ts         # Main entry point
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   └── fixtures/        # Test fixtures
├── docs/                # Documentation
├── examples/            # Usage examples
├── scripts/             # Build and deployment scripts
└── package.json
```

## 🔄 Quy trình phát triển

### Git Workflow

1. **Tạo branch mới**
   ```bash
   git checkout -b feature/your-feature-name
   # hoặc
   git checkout -b fix/bug-description
   ```

2. **Commit conventions**
   Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   type(scope): description
   
   [optional body]
   
   [optional footer]
   ```

   **Types:**
   - `feat`: Tính năng mới
   - `fix`: Sửa lỗi
   - `docs`: Cập nhật tài liệu
   - `style`: Thay đổi formatting, không ảnh hưởng logic
   - `refactor`: Refactor code
   - `test`: Thêm hoặc sửa tests
   - `chore`: Cập nhật build tools, dependencies

   **Examples:**
   ```bash
   git commit -m "feat(tools): add product search functionality"
   git commit -m "fix(resources): resolve inventory calculation bug"
   git commit -m "docs(api): update product management examples"
   ```

3. **Push và tạo Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch cho features
- **feature/***: Feature development
- **fix/***: Bug fixes
- **release/***: Release preparation
- **hotfix/***: Critical fixes cho production

## 📝 Coding Standards

### TypeScript Guidelines

1. **Type Safety**
   ```typescript
   // ✅ Good
   interface ProductData {
     id: string;
     name: string;
     price: number;
     category?: string;
   }
   
   function createProduct(data: ProductData): Promise<Product> {
     // Implementation
   }
   
   // ❌ Bad
   function createProduct(data: any): any {
     // Implementation
   }
   ```

2. **Naming Conventions**
   ```typescript
   // Variables và functions: camelCase
   const productName = 'iPhone 15';
   const calculateTotalPrice = () => {};
   
   // Classes: PascalCase
   class ProductManager {}
   
   // Constants: UPPER_SNAKE_CASE
   const MAX_PRODUCTS_PER_PAGE = 50;
   
   // Interfaces: PascalCase với prefix 'I' (optional)
   interface IProductService {}
   // hoặc
   interface ProductService {}
   ```

3. **Function Documentation**
   ```typescript
   /**
    * Tạo sản phẩm mới trong hệ thống
    * @param productData - Dữ liệu sản phẩm cần tạo
    * @param options - Tùy chọn bổ sung
    * @returns Promise resolve với thông tin sản phẩm đã tạo
    * @throws {ValidationError} Khi dữ liệu không hợp lệ
    * @example
    * ```typescript
    * const product = await createProduct({
    *   name: 'iPhone 15',
    *   price: 25000000,
    *   category: 'smartphones'
    * });
    * ```
    */
   async function createProduct(
     productData: CreateProductRequest,
     options?: CreateProductOptions
   ): Promise<Product> {
     // Implementation
   }
   ```

### Code Formatting

- Sử dụng **Prettier** cho code formatting
- Sử dụng **ESLint** cho code linting
- Indent: 2 spaces
- Line length: 100 characters
- Semicolons: required
- Quotes: single quotes

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Error Handling

```typescript
// ✅ Good - Specific error types
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

// ✅ Good - Proper error handling
async function getProduct(id: string): Promise<Product> {
  try {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product', id);
    }
    return product;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new Error(`Failed to get product: ${error.message}`);
  }
}
```

## 🧪 Testing Guidelines

### Test Structure

```typescript
// tests/unit/tools/product-tools.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ProductTools } from '../../../src/tools/product-tools';
import { mockProductService } from '../../fixtures/mock-services';

describe('ProductTools', () => {
  let productTools: ProductTools;
  
  beforeEach(() => {
    productTools = new ProductTools(mockProductService);
  });
  
  afterEach(() => {
    // Cleanup
  });
  
  describe('createProduct', () => {
    it('should create product successfully with valid data', async () => {
      // Arrange
      const productData = {
        name: 'Test Product',
        price: 100000,
        sku: 'TEST-001'
      };
      
      // Act
      const result = await productTools.createProduct(productData);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.data.name).toBe(productData.name);
      expect(result.data.sku).toBe(productData.sku);
    });
    
    it('should throw ValidationError for invalid data', async () => {
      // Arrange
      const invalidData = {
        name: '', // Invalid: empty name
        price: -100 // Invalid: negative price
      };
      
      // Act & Assert
      await expect(productTools.createProduct(invalidData))
        .rejects.toThrow(ValidationError);
    });
  });
});
```

### Test Categories

1. **Unit Tests**: Test individual functions/methods
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete workflows

### Test Commands

```bash
# Chạy tất cả tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests trong watch mode
npm run test:watch

# Chạy specific test file
npm test -- product-tools.test.ts
```

### Coverage Requirements

- **Minimum coverage**: 80%
- **Critical paths**: 95%
- **New features**: 90%

## 📚 Documentation Guidelines

### Code Documentation

1. **JSDoc cho functions và classes**
2. **README files cho modules**
3. **Inline comments cho complex logic**
4. **Type definitions với descriptions**

### API Documentation

```typescript
/**
 * @tool createProduct
 * @description Tạo sản phẩm mới trong hệ thống eCommerce
 * @category Product Management
 * 
 * @param {CreateProductRequest} request - Dữ liệu sản phẩm
 * @param {string} request.name - Tên sản phẩm (bắt buộc)
 * @param {string} request.sku - Mã SKU duy nhất (bắt buộc)
 * @param {number} request.price - Giá sản phẩm (VND)
 * @param {string} [request.description] - Mô tả sản phẩm
 * @param {string} [request.category_id] - ID danh mục
 * 
 * @returns {Promise<CreateProductResponse>} Thông tin sản phẩm đã tạo
 * 
 * @example
 * ```typescript
 * const result = await createProduct({
 *   name: "iPhone 15 Pro Max",
 *   sku: "IPHONE-15-PRO-MAX",
 *   price: 29990000,
 *   description: "Latest iPhone with advanced features",
 *   category_id: "smartphones"
 * });
 * ```
 * 
 * @throws {ValidationError} Khi dữ liệu đầu vào không hợp lệ
 * @throws {DuplicateError} Khi SKU đã tồn tại
 */
```

### Documentation Files

- **README.md**: Project overview và quick start
- **API Reference**: Chi tiết về tools và resources
- **Examples**: Practical usage examples
- **Troubleshooting**: Common issues và solutions
- **Best Practices**: Recommended patterns

## 🔄 Pull Request Process

### PR Checklist

Trước khi submit PR, đảm bảo:

- [ ] Code follows coding standards
- [ ] All tests pass
- [ ] Coverage meets requirements
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No breaking changes (hoặc documented)
- [ ] PR description đầy đủ

### PR Template

```markdown
## Description
Mô tả ngắn gọn về changes trong PR này.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix hoặc feature làm thay đổi existing functionality)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (nếu có UI changes)

## Checklist
- [ ] Code follows project coding standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added và pass
```

### Review Process

1. **Automated checks**: CI/CD pipeline
2. **Code review**: Ít nhất 1 reviewer
3. **Testing**: Manual testing nếu cần
4. **Approval**: Reviewer approval
5. **Merge**: Squash and merge

## 🐛 Issue Guidelines

### Bug Reports

```markdown
**Bug Description**
Mô tả rõ ràng và ngắn gọn về bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
Mô tả behavior mong đợi.

**Actual Behavior**
Mô tả behavior thực tế.

**Environment**
- OS: [e.g. macOS 14.0]
- Node.js version: [e.g. 18.17.0]
- Package version: [e.g. 1.2.3]

**Additional Context**
Thêm context, screenshots, logs nếu có.
```

### Feature Requests

```markdown
**Feature Description**
Mô tả rõ ràng về feature mong muốn.

**Use Case**
Mô tả use case cụ thể.

**Proposed Solution**
Đề xuất solution nếu có.

**Alternatives Considered**
Các alternatives đã consider.

**Additional Context**
Thêm context, mockups nếu có.
```

### Labels

- **Type**: `bug`, `feature`, `documentation`, `question`
- **Priority**: `low`, `medium`, `high`, `critical`
- **Status**: `needs-triage`, `in-progress`, `blocked`
- **Area**: `tools`, `resources`, `prompts`, `docs`

## 🚀 Release Process

### Versioning

Sử dụng [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version**
   ```bash
   npm version patch|minor|major
   ```

2. **Update CHANGELOG.md**
   ```markdown
   ## [1.2.3] - 2024-01-15
   
   ### Added
   - New product search functionality
   
   ### Changed
   - Improved error handling in inventory management
   
   ### Fixed
   - Fixed price calculation bug
   ```

3. **Create release PR**
   ```bash
   git checkout -b release/v1.2.3
   git commit -m "chore: prepare release v1.2.3"
   git push origin release/v1.2.3
   ```

4. **Merge và tag**
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

5. **Publish to npm**
   ```bash
   npm publish
   ```

### Release Notes

Mỗi release cần có:
- Summary of changes
- Breaking changes (nếu có)
- Migration guide (nếu cần)
- Known issues

## 🆘 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports và feature requests
- **GitHub Discussions**: General questions và discussions
- **Email**: [maintainer@example.com](mailto:maintainer@example.com)

### Resources

- [Project Documentation](./docs/)
- [API Reference](./docs/api-reference.md)
- [Examples](./examples/)
- [Troubleshooting Guide](./docs/troubleshooting.md)

## 🙏 Recognition

Chúng tôi ghi nhận tất cả contributions:

- Contributors được list trong README
- Significant contributions được highlight trong release notes
- Annual contributor recognition

---

**Cảm ơn bạn đã đóng góp cho Sun eCommerce MCP Server! 🎉**

Mọi contribution, dù lớn hay nhỏ, đều được đánh giá cao và giúp làm cho dự án tốt hơn cho tất cả mọi người.