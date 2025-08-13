# Prompts Reference - Sun eCommerce MCP Server

Tài liệu tham khảo về tất cả các interactive prompts có sẵn trong Sun eCommerce MCP Server.

## 📋 Tổng quan Prompts

Prompts trong MCP Server cung cấp các trải nghiệm tương tác thông minh, giúp người dùng thực hiện các tác vụ phức tạp thông qua hướng dẫn từng bước và tư vấn AI.

### Prompt Categories

- **Wizards** - Hướng dẫn từng bước cho các tác vụ phức tạp
- **Consultants** - Tư vấn chiến lược và best practices
- **Troubleshooters** - Chẩn đoán và xử lý sự cố
- **Analyzers** - Phân tích dữ liệu và đưa ra insights
- **Optimizers** - Tối ưu hiệu năng và cấu hình

## 🧙‍♂️ Wizard Prompts

### `create-product-wizard`
**Mục đích**: Hướng dẫn tạo sản phẩm từng bước với AI assistance

**Arguments**:
```typescript
{
  product_type?: 'simple' | 'configurable' | 'bundle' | 'digital';
  complexity?: 'basic' | 'intermediate' | 'advanced';
  business_model?: 'b2c' | 'b2b' | 'marketplace';
  industry?: string;
}
```

**Workflow Steps**:
1. **Product Type Selection**
   - Phân tích nhu cầu kinh doanh
   - Đề xuất loại sản phẩm phù hợp
   - Giải thích ưu/nhược điểm từng loại

2. **Basic Information**
   - Tên sản phẩm và mô tả
   - Category selection với suggestions
   - SEO optimization tips

3. **Pricing Strategy**
   - Market research guidance
   - Competitive analysis
   - Profit margin calculation

4. **Variants & Attributes**
   - Attribute planning (size, color, etc.)
   - SKU generation strategy
   - Inventory planning

5. **Media & Content**
   - Image requirements và best practices
   - Content optimization
   - Multi-language considerations

6. **Final Review & Creation**
   - Configuration summary
   - Validation checks
   - Product creation execution

**Example Usage**:
```typescript
// Basic product creation
const basicWizard = {
  product_type: 'simple',
  complexity: 'basic',
  business_model: 'b2c'
};

// Advanced configurable product
const advancedWizard = {
  product_type: 'configurable',
  complexity: 'advanced',
  business_model: 'b2b',
  industry: 'fashion'
};
```

### `setup-pricing-rule`
**Mục đích**: Hướng dẫn thiết lập quy tắc giá và khuyến mãi

**Arguments**:
```typescript
{
  rule_type?: 'discount' | 'promotion' | 'tiered' | 'dynamic';
  target?: 'product' | 'category' | 'customer' | 'order';
  business_goal?: 'increase_sales' | 'clear_inventory' | 'customer_acquisition' | 'loyalty';
  duration?: 'short_term' | 'long_term' | 'seasonal';
}
```

**Workflow Steps**:
1. **Goal Definition**
   - Business objective analysis
   - Success metrics definition
   - Timeline planning

2. **Rule Type Selection**
   - Percentage vs fixed amount
   - Simple vs complex rules
   - Performance comparison

3. **Target Audience**
   - Customer segmentation
   - Product/category selection
   - Geographic considerations

4. **Conditions & Constraints**
   - Minimum order requirements
   - Usage limitations
   - Stacking rules

5. **Testing & Validation**
   - A/B testing setup
   - Performance monitoring
   - Rollback strategies

### `inventory-setup-wizard`
**Mục đích**: Hướng dẫn thiết lập hệ thống quản lý tồn kho

**Arguments**:
```typescript
{
  business_size?: 'small' | 'medium' | 'large' | 'enterprise';
  warehouse_count?: number;
  product_types?: string[];
  integration_needs?: string[];
}
```

**Features**:
- Multi-location inventory setup
- Reorder point calculation
- Safety stock optimization
- Integration with external systems

### `category-structure-wizard`
**Mục đích**: Hướng dẫn thiết kế cấu trúc danh mục sản phẩm

**Arguments**:
```typescript
{
  industry?: string;
  product_count?: number;
  depth_preference?: 'shallow' | 'deep';
  seo_focus?: boolean;
}
```

**Capabilities**:
- Industry best practices
- SEO-friendly structure
- Navigation optimization
- Future scalability planning

## 🎯 Consultant Prompts

### `ecommerce-consultant`
**Mục đích**: Tư vấn chiến lược thương mại điện tử toàn diện

**Arguments**:
```typescript
{
  business_type?: string;
  current_challenges?: string[];
  goals?: string[];
  budget_range?: 'startup' | 'small' | 'medium' | 'large';
  timeline?: string;
  market?: string;
}
```

**Consultation Areas**:

1. **Business Model Analysis**
   - Revenue stream optimization
   - Market positioning
   - Competitive advantage

2. **Technology Stack Recommendations**
   - Platform selection
   - Integration requirements
   - Scalability planning

3. **Marketing Strategy**
   - Customer acquisition
   - Retention strategies
   - Channel optimization

4. **Operations Optimization**
   - Fulfillment strategies
   - Inventory management
   - Customer service

**Example Consultation**:
```typescript
const consultation = {
  business_type: "Fashion retail",
  current_challenges: [
    "High cart abandonment rate",
    "Inventory management issues",
    "Low customer retention"
  ],
  goals: [
    "Increase conversion rate by 25%",
    "Reduce inventory costs",
    "Improve customer lifetime value"
  ],
  budget_range: "medium",
  timeline: "6 months",
  market: "Vietnam"
};
```

### `pricing-strategy-advisor`
**Mục đích**: Tư vấn chiến lược giá chuyên sâu

**Arguments**:
```typescript
{
  product_category?: string;
  market_position?: 'premium' | 'mid-range' | 'budget';
  competition_level?: 'high' | 'medium' | 'low';
  price_sensitivity?: 'high' | 'medium' | 'low';
  business_model?: string;
}
```

**Advisory Services**:

1. **Market Analysis**
   - Competitive pricing research
   - Price elasticity analysis
   - Market positioning

2. **Pricing Models**
   - Cost-plus pricing
   - Value-based pricing
   - Dynamic pricing
   - Psychological pricing

3. **Optimization Strategies**
   - A/B testing frameworks
   - Price monitoring
   - Margin optimization

### `customer-experience-advisor`
**Mục đích**: Tư vấn tối ưu trải nghiệm khách hàng

**Arguments**:
```typescript
{
  customer_segment?: string;
  touchpoints?: string[];
  pain_points?: string[];
  business_goals?: string[];
}
```

**Focus Areas**:
- User journey optimization
- Personalization strategies
- Customer support enhancement
- Loyalty program design

## 🔧 Troubleshooter Prompts

### `troubleshoot-api`
**Mục đích**: Chẩn đoán và xử lý sự cố API

**Arguments**:
```typescript
{
  error_code?: string;
  operation?: string;
  context?: string;
  frequency?: 'once' | 'intermittent' | 'consistent';
  environment?: 'development' | 'staging' | 'production';
}
```

**Diagnostic Process**:

1. **Error Analysis**
   - Error code interpretation
   - Root cause identification
   - Impact assessment

2. **Environment Check**
   - Configuration validation
   - Network connectivity
   - Authentication status

3. **Solution Recommendations**
   - Immediate fixes
   - Long-term solutions
   - Prevention strategies

**Common Scenarios**:
```typescript
// Authentication issues
const authTrouble = {
  error_code: "AUTH_FAILED",
  operation: "create_product",
  context: "Production API calls failing since morning",
  frequency: "consistent"
};

// Performance issues
const perfTrouble = {
  error_code: "TIMEOUT",
  operation: "search_products",
  context: "Search taking >30 seconds",
  frequency: "intermittent"
};
```

### `troubleshoot-performance`
**Mục đích**: Chẩn đoán vấn đề hiệu năng

**Arguments**:
```typescript
{
  performance_metric?: 'response_time' | 'throughput' | 'error_rate';
  affected_operations?: string[];
  time_pattern?: 'peak_hours' | 'random' | 'consistent';
  severity?: 'low' | 'medium' | 'high' | 'critical';
}
```

### `troubleshoot-data-sync`
**Mục đích**: Xử lý sự cố đồng bộ dữ liệu

**Arguments**:
```typescript
{
  sync_type?: 'product' | 'inventory' | 'pricing' | 'customer';
  data_source?: string;
  sync_frequency?: string;
  error_pattern?: string;
}
```

## 📊 Analyzer Prompts

### `analyze-product-performance`
**Mục đích**: Phân tích hiệu quả sản phẩm

**Arguments**:
```typescript
{
  time_period?: string;
  product_ids?: string[];
  category_ids?: string[];
  metrics?: string[];
  comparison_type?: 'period' | 'category' | 'product';
}
```

**Analysis Dimensions**:
- Sales performance
- Conversion rates
- Customer engagement
- Profitability analysis
- Market trends

### `analyze-pricing-effectiveness`
**Mục đích**: Đánh giá hiệu quả chiến lược giá

**Arguments**:
```typescript
{
  pricing_rules?: string[];
  time_period?: string;
  customer_segments?: string[];
  success_metrics?: string[];
}
```

**Insights Provided**:
- Rule performance comparison
- Customer response analysis
- Revenue impact assessment
- Optimization recommendations

### `analyze-customer-behavior`
**Mục đích**: Phân tích hành vi khách hàng

**Arguments**:
```typescript
{
  customer_segment?: string;
  behavior_type?: 'purchase' | 'browse' | 'search' | 'cart';
  time_period?: string;
  channels?: string[];
}
```

## ⚡ Optimizer Prompts

### `optimize-catalog`
**Mục đích**: Tối ưu danh mục sản phẩm

**Arguments**:
```typescript
{
  optimization_goal?: 'seo' | 'conversion' | 'navigation' | 'performance';
  catalog_size?: number;
  priority_categories?: string[];
  constraints?: string[];
}
```

**Optimization Areas**:

1. **SEO Optimization**
   - URL structure improvement
   - Meta data optimization
   - Content enhancement

2. **Navigation Optimization**
   - Category hierarchy refinement
   - Filter optimization
   - Search enhancement

3. **Performance Optimization**
   - Image optimization
   - Caching strategies
   - Database optimization

### `optimize-inventory`
**Mục đích**: Tối ưu quản lý tồn kho

**Arguments**:
```typescript
{
  optimization_type?: 'turnover' | 'cost' | 'availability';
  product_categories?: string[];
  seasonality?: boolean;
  lead_times?: number[];
}
```

### `optimize-pricing`
**Mục đích**: Tối ưu chiến lược giá

**Arguments**:
```typescript
{
  optimization_goal?: 'revenue' | 'profit' | 'market_share';
  price_sensitivity?: number;
  competitive_pressure?: 'high' | 'medium' | 'low';
  constraints?: string[];
}
```

## 🎨 Creative Prompts

### `generate-product-content`
**Mục đích**: Tạo nội dung sản phẩm tự động

**Arguments**:
```typescript
{
  product_type?: string;
  target_audience?: string;
  tone?: 'professional' | 'casual' | 'luxury' | 'technical';
  language?: string;
  content_types?: string[];
}
```

**Content Generation**:
- Product descriptions
- SEO titles and meta descriptions
- Marketing copy
- Technical specifications
- Multi-language content

### `design-promotion-campaign`
**Mục đích**: Thiết kế chiến dịch khuyến mãi

**Arguments**:
```typescript
{
  campaign_goal?: string;
  target_audience?: string;
  budget?: string;
  duration?: string;
  channels?: string[];
}
```

## 🔄 Workflow Prompts

### `setup-automation-workflow`
**Mục đích**: Thiết lập quy trình tự động hóa

**Arguments**:
```typescript
{
  workflow_type?: 'inventory' | 'pricing' | 'marketing' | 'customer_service';
  triggers?: string[];
  actions?: string[];
  conditions?: string[];
}
```

### `migration-assistant`
**Mục đích**: Hỗ trợ migration từ platform khác

**Arguments**:
```typescript
{
  source_platform?: string;
  data_types?: string[];
  migration_scope?: 'full' | 'partial';
  timeline?: string;
}
```

## 📱 Platform-Specific Prompts

### `mobile-optimization-advisor`
**Mục đích**: Tối ưu cho mobile commerce

### `marketplace-integration-guide`
**Mục đích**: Hướng dẫn tích hợp marketplace

### `social-commerce-setup`
**Mục đích**: Thiết lập bán hàng qua social media

## 🌐 Localization Prompts

### `localize-for-market`
**Mục đích**: Bản địa hóa cho thị trường cụ thể

**Arguments**:
```typescript
{
  target_market?: string;
  localization_scope?: string[];
  cultural_considerations?: string[];
  regulatory_requirements?: string[];
}
```

## 🎯 Prompt Usage Patterns

### Sequential Prompts
```typescript
// Workflow: Setup → Optimize → Analyze
1. create-product-wizard
2. optimize-catalog
3. analyze-product-performance
```

### Contextual Prompts
```typescript
// AI tự động suggest prompts dựa trên context
"I'm having trouble with product creation"
// → Suggests: create-product-wizard, troubleshoot-api

"My sales are declining"
// → Suggests: analyze-product-performance, pricing-strategy-advisor
```

### Adaptive Prompts
```typescript
// Prompts thích ứng với user experience level
const beginnerUser = {
  complexity: 'basic',
  guidance_level: 'detailed'
};

const expertUser = {
  complexity: 'advanced',
  guidance_level: 'minimal'
};
```

## 💡 Best Practices

### For New Users
- Start with wizard prompts
- Use basic complexity settings
- Follow step-by-step guidance
- Ask for explanations when needed

### For Experienced Users
- Use consultant prompts for strategic advice
- Leverage analyzer prompts for insights
- Customize prompt arguments for specific needs
- Combine multiple prompts for complex workflows

### For Troubleshooting
- Provide detailed context in arguments
- Use specific error codes when available
- Include environment information
- Follow diagnostic recommendations

---

*Prompts được thiết kế để cung cấp trải nghiệm tương tác thông minh và cá nhân hóa. Sử dụng AI assistant để khám phá và tận dụng tối đa các prompts phù hợp với nhu cầu của bạn.*