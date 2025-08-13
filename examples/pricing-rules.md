# Pricing Rules Examples - Sun eCommerce MCP Server

Các ví dụ thực tế về cách sử dụng pricing rules trong Sun eCommerce MCP Server.

## 📋 Tổng quan

Pricing rules cho phép bạn tạo các quy tắc giá động dựa trên nhiều điều kiện khác nhau như:
- Số lượng sản phẩm (bulk discount)
- Thời gian (seasonal pricing)
- Khách hàng (customer-specific pricing)
- Danh mục sản phẩm (category-based pricing)
- Kết hợp nhiều điều kiện

## 🎯 Basic Pricing Rules

### 1. Percentage Discount

```typescript
// Giảm giá 10% cho tất cả sản phẩm trong danh mục "Electronics"
const percentageRule = {
  name: "Electronics 10% Off",
  description: "10% discount on all electronics",
  type: "percentage",
  value: 10,
  conditions: {
    category_ids: ["electronics-001"],
    min_quantity: 1
  },
  active: true,
  start_date: "2024-01-01T00:00:00Z",
  end_date: "2024-12-31T23:59:59Z"
};

// Tạo pricing rule
const result = await apiClient.createPricingRule(percentageRule);
console.log('Created percentage rule:', result.data);
```

### 2. Fixed Amount Discount

```typescript
// Giảm 50,000 VND cho đơn hàng từ 500,000 VND
const fixedAmountRule = {
  name: "50K Off Orders Over 500K",
  description: "50,000 VND discount for orders over 500,000 VND",
  type: "fixed_amount",
  value: 50000,
  conditions: {
    min_order_value: 500000,
    currency: "VND"
  },
  active: true,
  usage_limit: 1000, // Giới hạn 1000 lần sử dụng
  start_date: "2024-01-01T00:00:00Z",
  end_date: "2024-03-31T23:59:59Z"
};

const result = await apiClient.createPricingRule(fixedAmountRule);
console.log('Created fixed amount rule:', result.data);
```

### 3. Buy X Get Y Free

```typescript
// Mua 2 tặng 1 cho sản phẩm cụ thể
const buyXGetYRule = {
  name: "Buy 2 Get 1 Free - T-Shirts",
  description: "Buy 2 t-shirts, get 1 free",
  type: "buy_x_get_y",
  conditions: {
    product_ids: ["tshirt-001", "tshirt-002", "tshirt-003"],
    buy_quantity: 2,
    get_quantity: 1
  },
  active: true,
  start_date: "2024-01-01T00:00:00Z",
  end_date: "2024-02-29T23:59:59Z"
};

const result = await apiClient.createPricingRule(buyXGetYRule);
console.log('Created buy X get Y rule:', result.data);
```

## 🎯 Advanced Pricing Rules

### 4. Tiered Pricing (Bulk Discount)

```typescript
// Giảm giá theo số lượng: càng mua nhiều càng rẻ
const tieredPricingRule = {
  name: "Bulk Discount - Office Supplies",
  description: "Volume-based pricing for office supplies",
  type: "tiered",
  conditions: {
    category_ids: ["office-supplies-001"]
  },
  tiers: [
    {
      min_quantity: 10,
      max_quantity: 49,
      discount_type: "percentage",
      discount_value: 5 // 5% off
    },
    {
      min_quantity: 50,
      max_quantity: 99,
      discount_type: "percentage",
      discount_value: 10 // 10% off
    },
    {
      min_quantity: 100,
      max_quantity: null, // No upper limit
      discount_type: "percentage",
      discount_value: 15 // 15% off
    }
  ],
  active: true
};

const result = await apiClient.createPricingRule(tieredPricingRule);
console.log('Created tiered pricing rule:', result.data);
```

### 5. Time-Based Pricing

```typescript
// Flash sale: giảm giá trong khung giờ cụ thể
const flashSaleRule = {
  name: "Flash Sale - 12PM to 2PM",
  description: "30% off during lunch hours",
  type: "percentage",
  value: 30,
  conditions: {
    time_conditions: {
      days_of_week: [1, 2, 3, 4, 5], // Monday to Friday
      start_time: "12:00:00",
      end_time: "14:00:00",
      timezone: "Asia/Ho_Chi_Minh"
    },
    category_ids: ["fast-food-001"]
  },
  active: true,
  start_date: "2024-01-01T00:00:00Z",
  end_date: "2024-01-31T23:59:59Z"
};

const result = await apiClient.createPricingRule(flashSaleRule);
console.log('Created flash sale rule:', result.data);
```

### 6. Customer Segment Pricing

```typescript
// Giá đặc biệt cho khách hàng VIP
const vipPricingRule = {
  name: "VIP Customer Discount",
  description: "20% discount for VIP customers",
  type: "percentage",
  value: 20,
  conditions: {
    customer_segments: ["vip", "premium"],
    min_order_value: 100000
  },
  active: true,
  priority: 10 // High priority
};

const result = await apiClient.createPricingRule(vipPricingRule);
console.log('Created VIP pricing rule:', result.data);
```

### 7. Combo Pricing

```typescript
// Giá combo khi mua kết hợp sản phẩm
const comboPricingRule = {
  name: "Laptop + Mouse Combo",
  description: "Special price when buying laptop with mouse",
  type: "combo",
  conditions: {
    required_products: [
      {
        product_id: "laptop-001",
        quantity: 1
      },
      {
        category_id: "mouse-001",
        quantity: 1
      }
    ]
  },
  combo_price: 15000000, // Fixed combo price
  active: true
};

const result = await apiClient.createPricingRule(comboPricingRule);
console.log('Created combo pricing rule:', result.data);
```

## 🔄 Dynamic Pricing Examples

### 8. Inventory-Based Pricing

```typescript
// Tăng giá khi hàng tồn kho thấp
const inventoryBasedRule = {
  name: "Low Stock Premium",
  description: "Increase price when stock is low",
  type: "dynamic",
  conditions: {
    inventory_conditions: {
      stock_threshold: 10,
      comparison: "less_than"
    }
  },
  price_adjustment: {
    type: "percentage",
    value: 5, // Increase by 5%
    direction: "increase"
  },
  active: true
};

const result = await apiClient.createPricingRule(inventoryBasedRule);
console.log('Created inventory-based rule:', result.data);
```

### 9. Competitor-Based Pricing

```typescript
// Điều chỉnh giá dựa trên giá đối thủ
const competitorBasedRule = {
  name: "Competitor Price Match",
  description: "Match competitor prices with 5% discount",
  type: "dynamic",
  conditions: {
    competitor_conditions: {
      competitor_ids: ["competitor-001", "competitor-002"],
      price_comparison: "lower_than",
      margin_percentage: 5
    }
  },
  active: true,
  update_frequency: "hourly"
};

const result = await apiClient.createPricingRule(competitorBasedRule);
console.log('Created competitor-based rule:', result.data);
```

## 🎯 Complex Pricing Scenarios

### 10. Multi-Condition Pricing

```typescript
// Kết hợp nhiều điều kiện phức tạp
const complexPricingRule = {
  name: "Black Friday Mega Sale",
  description: "Complex discount for Black Friday",
  type: "percentage",
  value: 25,
  conditions: {
    // Điều kiện thời gian
    date_range: {
      start_date: "2024-11-29T00:00:00Z",
      end_date: "2024-11-29T23:59:59Z"
    },
    
    // Điều kiện sản phẩm
    product_conditions: {
      category_ids: ["electronics-001", "fashion-001"],
      exclude_product_ids: ["iphone-15-pro"], // Loại trừ sản phẩm mới
      min_price: 100000
    },
    
    // Điều kiện khách hàng
    customer_conditions: {
      new_customer: false, // Chỉ khách hàng cũ
      min_previous_orders: 3
    },
    
    // Điều kiện đơn hàng
    order_conditions: {
      min_order_value: 500000,
      min_quantity: 2
    }
  },
  
  // Giới hạn sử dụng
  usage_limits: {
    total_usage: 1000,
    per_customer: 1,
    per_day: 500
  },
  
  active: true,
  priority: 1 // Highest priority
};

const result = await apiClient.createPricingRule(complexPricingRule);
console.log('Created complex pricing rule:', result.data);
```

### 11. Loyalty Program Pricing

```typescript
// Giá theo chương trình khách hàng thân thiết
const loyaltyPricingRule = {
  name: "Loyalty Points Discount",
  description: "Discount based on loyalty points",
  type: "loyalty",
  conditions: {
    loyalty_conditions: {
      min_points: 1000,
      points_to_discount_ratio: 100 // 100 points = 1% discount
    }
  },
  max_discount_percentage: 50, // Tối đa 50% discount
  active: true
};

const result = await apiClient.createPricingRule(loyaltyPricingRule);
console.log('Created loyalty pricing rule:', result.data);
```

## 🔧 Pricing Rule Management

### Bulk Create Pricing Rules

```typescript
// Tạo nhiều pricing rules cùng lúc
async function createSeasonalPricingRules() {
  const seasonalRules = [
    {
      name: "Spring Sale - Clothing",
      type: "percentage",
      value: 15,
      conditions: {
        category_ids: ["clothing-001"],
        date_range: {
          start_date: "2024-03-01T00:00:00Z",
          end_date: "2024-05-31T23:59:59Z"
        }
      },
      active: true
    },
    {
      name: "Summer Sale - Electronics",
      type: "percentage",
      value: 20,
      conditions: {
        category_ids: ["electronics-001"],
        date_range: {
          start_date: "2024-06-01T00:00:00Z",
          end_date: "2024-08-31T23:59:59Z"
        }
      },
      active: true
    },
    {
      name: "Back to School - Stationery",
      type: "percentage",
      value: 25,
      conditions: {
        category_ids: ["stationery-001"],
        date_range: {
          start_date: "2024-08-01T00:00:00Z",
          end_date: "2024-09-30T23:59:59Z"
        }
      },
      active: true
    }
  ];
  
  const results = [];
  
  for (const rule of seasonalRules) {
    try {
      const result = await apiClient.createPricingRule(rule);
      results.push(result.data);
      console.log(`Created rule: ${rule.name}`);
    } catch (error) {
      console.error(`Failed to create rule ${rule.name}:`, error.message);
    }
  }
  
  return results;
}

// Sử dụng
createSeason alPricingRules().then(rules => {
  console.log(`Created ${rules.length} seasonal pricing rules`);
});
```

### Update Pricing Rules

```typescript
// Cập nhật pricing rule
async function updatePricingRule(ruleId: string, updates: Partial<PricingRule>) {
  try {
    const result = await apiClient.updatePricingRule({
      rule_id: ruleId,
      ...updates
    });
    
    if (result.success) {
      console.log('Updated pricing rule:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to update pricing rule:', error.message);
    throw error;
  }
}

// Ví dụ: Tăng giá trị discount
await updatePricingRule('rule-001', {
  value: 30, // Tăng từ 25% lên 30%
  description: "Updated discount value for better conversion"
});

// Ví dụ: Gia hạn thời gian
await updatePricingRule('rule-002', {
  end_date: "2024-12-31T23:59:59Z" // Gia hạn đến cuối năm
});
```

### Deactivate Pricing Rules

```typescript
// Vô hiệu hóa pricing rule
async function deactivatePricingRule(ruleId: string, reason?: string) {
  try {
    const result = await apiClient.updatePricingRule({
      rule_id: ruleId,
      active: false,
      deactivation_reason: reason
    });
    
    if (result.success) {
      console.log(`Deactivated pricing rule: ${ruleId}`);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to deactivate pricing rule:', error.message);
    throw error;
  }
}

// Sử dụng
await deactivatePricingRule('rule-003', 'Campaign ended early');
```

## 📊 Pricing Rule Analytics

### Get Pricing Rule Performance

```typescript
// Lấy thống kê hiệu suất pricing rule
async function getPricingRuleAnalytics(ruleId: string, dateRange: DateRange) {
  try {
    const result = await apiClient.getPricingRuleAnalytics({
      rule_id: ruleId,
      start_date: dateRange.start_date,
      end_date: dateRange.end_date,
      metrics: [
        'usage_count',
        'total_discount_amount',
        'affected_orders',
        'revenue_impact',
        'conversion_rate'
      ]
    });
    
    if (result.success) {
      const analytics = result.data;
      
      console.log('Pricing Rule Analytics:');
      console.log(`- Usage Count: ${analytics.usage_count}`);
      console.log(`- Total Discount: ${analytics.total_discount_amount.toLocaleString()} VND`);
      console.log(`- Affected Orders: ${analytics.affected_orders}`);
      console.log(`- Revenue Impact: ${analytics.revenue_impact.percentage}%`);
      console.log(`- Conversion Rate: ${analytics.conversion_rate}%`);
      
      return analytics;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to get pricing rule analytics:', error.message);
    throw error;
  }
}

// Sử dụng
const analytics = await getPricingRuleAnalytics('rule-001', {
  start_date: '2024-01-01T00:00:00Z',
  end_date: '2024-01-31T23:59:59Z'
});
```

### Compare Pricing Rules

```typescript
// So sánh hiệu suất của nhiều pricing rules
async function comparePricingRules(ruleIds: string[], dateRange: DateRange) {
  const comparisons = [];
  
  for (const ruleId of ruleIds) {
    try {
      const analytics = await getPricingRuleAnalytics(ruleId, dateRange);
      const rule = await apiClient.getPricingRule({ rule_id: ruleId });
      
      comparisons.push({
        rule_id: ruleId,
        rule_name: rule.data.name,
        usage_count: analytics.usage_count,
        total_discount: analytics.total_discount_amount,
        conversion_rate: analytics.conversion_rate,
        roi: analytics.revenue_impact.roi
      });
    } catch (error) {
      console.error(`Failed to get analytics for rule ${ruleId}:`, error.message);
    }
  }
  
  // Sắp xếp theo ROI
  comparisons.sort((a, b) => b.roi - a.roi);
  
  console.log('Pricing Rules Comparison (sorted by ROI):');
  console.table(comparisons);
  
  return comparisons;
}

// Sử dụng
const comparison = await comparePricingRules(
  ['rule-001', 'rule-002', 'rule-003'],
  {
    start_date: '2024-01-01T00:00:00Z',
    end_date: '2024-01-31T23:59:59Z'
  }
);
```

## 🎯 Best Practices

### 1. Rule Priority Management

```typescript
// Quản lý độ ưu tiên của pricing rules
const rulePriorities = {
  FLASH_SALE: 1,        // Highest priority
  VIP_CUSTOMER: 2,
  SEASONAL_SALE: 3,
  BULK_DISCOUNT: 4,
  GENERAL_DISCOUNT: 5   // Lowest priority
};

// Tạo rule với priority phù hợp
const flashSaleRule = {
  name: "Flash Sale - Limited Time",
  type: "percentage",
  value: 50,
  priority: rulePriorities.FLASH_SALE,
  conditions: {
    date_range: {
      start_date: "2024-01-15T12:00:00Z",
      end_date: "2024-01-15T14:00:00Z"
    }
  },
  active: true
};
```

### 2. Rule Validation

```typescript
// Validate pricing rule trước khi tạo
function validatePricingRule(rule: PricingRule): ValidationResult {
  const errors: string[] = [];
  
  // Kiểm tra required fields
  if (!rule.name || rule.name.trim().length === 0) {
    errors.push('Rule name is required');
  }
  
  if (!rule.type) {
    errors.push('Rule type is required');
  }
  
  // Kiểm tra giá trị discount
  if (rule.type === 'percentage' && (rule.value < 0 || rule.value > 100)) {
    errors.push('Percentage discount must be between 0 and 100');
  }
  
  if (rule.type === 'fixed_amount' && rule.value < 0) {
    errors.push('Fixed amount discount cannot be negative');
  }
  
  // Kiểm tra date range
  if (rule.start_date && rule.end_date) {
    const startDate = new Date(rule.start_date);
    const endDate = new Date(rule.end_date);
    
    if (startDate >= endDate) {
      errors.push('End date must be after start date');
    }
  }
  
  // Kiểm tra conditions
  if (rule.conditions) {
    if (rule.conditions.min_order_value && rule.conditions.min_order_value < 0) {
      errors.push('Minimum order value cannot be negative');
    }
    
    if (rule.conditions.min_quantity && rule.conditions.min_quantity < 1) {
      errors.push('Minimum quantity must be at least 1');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Sử dụng validation
const newRule = {
  name: "Test Rule",
  type: "percentage",
  value: 15,
  // ... other properties
};

const validation = validatePricingRule(newRule);
if (validation.isValid) {
  await apiClient.createPricingRule(newRule);
} else {
  console.error('Validation errors:', validation.errors);
}
```

### 3. Rule Testing

```typescript
// Test pricing rule trước khi activate
async function testPricingRule(rule: PricingRule, testCases: TestCase[]) {
  console.log(`Testing pricing rule: ${rule.name}`);
  
  for (const testCase of testCases) {
    try {
      const result = await apiClient.calculatePrice({
        items: testCase.items,
        customer: testCase.customer,
        pricing_rules: [rule] // Test với rule cụ thể
      });
      
      const expectedDiscount = testCase.expectedDiscount;
      const actualDiscount = result.data.total_discount;
      
      if (Math.abs(actualDiscount - expectedDiscount) < 0.01) {
        console.log(`✅ Test case "${testCase.name}" passed`);
      } else {
        console.log(`❌ Test case "${testCase.name}" failed`);
        console.log(`   Expected discount: ${expectedDiscount}`);
        console.log(`   Actual discount: ${actualDiscount}`);
      }
    } catch (error) {
      console.log(`❌ Test case "${testCase.name}" error: ${error.message}`);
    }
  }
}

// Ví dụ test cases
const testCases = [
  {
    name: "Single item - minimum quantity",
    items: [{ product_id: "product-001", quantity: 1, price: 100000 }],
    customer: { segment: "regular" },
    expectedDiscount: 10000 // 10%
  },
  {
    name: "Multiple items - bulk discount",
    items: [{ product_id: "product-001", quantity: 5, price: 100000 }],
    customer: { segment: "regular" },
    expectedDiscount: 50000 // 10% of 500,000
  }
];

await testPricingRule(newRule, testCases);
```

---

*Các ví dụ này cung cấp nền tảng vững chắc để triển khai pricing rules hiệu quả trong hệ thống eCommerce của bạn.*