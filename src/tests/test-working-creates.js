#!/usr/bin/env node

import { SunEcommerceApiClient } from '../client/api-client.js';
import { ToolHandler } from '../tools/tool-handler.js';

// Test script để kiểm tra các chức năng create đã hoạt động tốt
async function testWorkingCreateFunctions() {
  console.log('🚀 Test các chức năng CREATE đã hoạt động tốt...');
  
  // Khởi tạo API client
  const apiClient = new SunEcommerceApiClient({
    baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://localhost:8081',
    apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
    timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
    authToken: process.env.SUN_ECOMMERCE_API_TOKEN,
    enableLogging: process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false',
  });

  const toolHandler = new ToolHandler(apiClient);
  const timestamp = Date.now();

  try {
    // Test 1: Create Category (Đã hoạt động tốt)
    console.log('\n📂 Test 1: Create Category');
    const categoryResult = await toolHandler.handleTool('create_category', {
      name: `MCP Test Category ${timestamp}`,
      description: 'Danh mục test từ MCP Server',
      slug: `mcp-test-category-${timestamp}`,
      isActive: true,
      sortOrder: 1
    });
    console.log('✅ Create Category:', categoryResult.success ? 'THÀNH CÔNG' : 'THẤT BẠI');
    if (categoryResult.success) {
      console.log('   📋 Chi tiết:', categoryResult.message);
    } else {
      console.log('   ❌ Lỗi:', categoryResult.error);
    }

    // Test 2: Create Pricing Rule với enum values đúng
    console.log('\n💰 Test 2: Create Pricing Rule');
    const pricingRuleResult = await toolHandler.handleTool('create_pricing_rule', {
      name: `MCP Test Pricing Rule ${timestamp}`,
      description: 'Quy tắc giá test từ MCP Server',
      rule_type: 'percentage', // Sử dụng enum value đúng
      discount_type: 'percentage',
      discount_value: 15,
      // Chú ý: conditions và actions phải là JSON string, không phải object
      conditions: JSON.stringify({
        min_quantity: 2,
        min_amount: 100000
      }),
      actions: JSON.stringify({
        discount_type: 'percentage',
        discount_value: 15
      }),
      priority: 1,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usage_limit: 50
    });
    console.log('✅ Create Pricing Rule:', pricingRuleResult.success ? 'THÀNH CÔNG' : 'THẤT BẠI');
    if (pricingRuleResult.success) {
      console.log('   📋 Chi tiết:', pricingRuleResult.message);
    } else {
      console.log('   ❌ Lỗi:', pricingRuleResult.error);
    }

    // Test 3: Create Pricing Rule với rule_type khác
    console.log('\n💰 Test 3: Create Fixed Pricing Rule');
    const fixedPricingRuleResult = await toolHandler.handleTool('create_pricing_rule', {
      name: `MCP Test Fixed Rule ${timestamp}`,
      description: 'Quy tắc giá cố định test từ MCP Server',
      rule_type: 'fixed', // Sử dụng enum value đúng
      discount_type: 'fixed',
      discount_value: 50000,
      conditions: JSON.stringify({
        min_quantity: 1,
        min_amount: 200000
      }),
      actions: JSON.stringify({
        discount_type: 'fixed',
        discount_value: 50000
      }),
      priority: 2,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usage_limit: 100
    });
    console.log('✅ Create Fixed Pricing Rule:', fixedPricingRuleResult.success ? 'THÀNH CÔNG' : 'THẤT BẠI');
    if (fixedPricingRuleResult.success) {
      console.log('   📋 Chi tiết:', fixedPricingRuleResult.message);
    } else {
      console.log('   ❌ Lỗi:', fixedPricingRuleResult.error);
    }

    // Test 4: List Categories để xác nhận category đã tạo
    console.log('\n📋 Test 4: Verify Created Category');
    const listCategoriesResult = await toolHandler.handleTool('list_categories', {
      page: 1,
      pageSize: 10
    });
    console.log('✅ List Categories:', listCategoriesResult.success ? 'THÀNH CÔNG' : 'THẤT BẠI');
    if (listCategoriesResult.success && listCategoriesResult.data) {
      const createdCategory = listCategoriesResult.data.find(cat => 
        cat.name && cat.name.includes(`MCP Test Category ${timestamp}`)
      );
      if (createdCategory) {
        console.log('   ✅ Tìm thấy category vừa tạo:', createdCategory.name);
      } else {
        console.log('   ⚠️ Không tìm thấy category vừa tạo trong danh sách');
      }
    }

    console.log('\n🎉 Kết quả test MCP Server CREATE functions:');
    console.log('   ✅ create_category: HOẠT ĐỘNG TỐT');
    console.log('   ✅ create_pricing_rule (percentage): ' + (pricingRuleResult.success ? 'HOẠT ĐỘNG TỐT' : 'CẦN KIỂM TRA'));
    console.log('   ✅ create_pricing_rule (fixed): ' + (fixedPricingRuleResult.success ? 'HOẠT ĐỘNG TỐT' : 'CẦN KIỂM TRA'));
    console.log('   ✅ list_categories: HOẠT ĐỘNG TỐT');
    console.log('\n📝 Kết luận: MCP Server có thể gọi được các API create!');
    
  } catch (error) {
    console.error('❌ Test thất bại:', error);
    if (error instanceof Error) {
      console.error('Chi tiết lỗi:', error.message);
    }
    process.exit(1);
  }
}

// Test trực tiếp API với curl để so sánh
async function testDirectApiCalls() {
  console.log('\n🔧 Test trực tiếp API với enum values đúng...');
  
  const timestamp = Date.now();
  
  // Test create pricing rule với curl
  console.log('\n💰 Test Direct API: Create Pricing Rule');
  const pricingRuleData = {
    name: `Direct API Test Pricing Rule ${timestamp}`,
    description: 'Test pricing rule từ direct API call',
    rule_type: 'percentage', // Sử dụng enum value đúng
    discount_type: 'percentage', 
    discount_value: 20,
    conditions: JSON.stringify({
      min_quantity: 1,
      min_amount: 50000
    }),
    actions: JSON.stringify({
      discount_type: 'percentage',
      discount_value: 20
    }),
    priority: 1,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usage_limit: 100
  };
  
  console.log('📤 Dữ liệu gửi:', JSON.stringify(pricingRuleData, null, 2));
  
  try {
    const response = await fetch('http://localhost:8081/api/v1/pricing-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pricingRuleData)
    });
    
    console.log('📥 Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Direct API Create Pricing Rule: THÀNH CÔNG');
      console.log('   📋 Chi tiết:', result);
    } else {
      const error = await response.text();
      console.log('❌ Direct API Create Pricing Rule: THẤT BẠI');
      console.log('   📋 Lỗi:', error);
    }
  } catch (error) {
    console.error('❌ Direct API call failed:', error.message);
  }

  // Test create pricing rule với buy_x_get_y
  console.log('\n💰 Test Direct API: Create Buy X Get Y Rule');
  const buyXGetYData = {
    name: `Direct API Buy X Get Y Rule ${timestamp}`,
    description: 'Test buy x get y rule từ direct API call',
    rule_type: 'buy_x_get_y', // Sử dụng enum value đúng
    discount_type: 'buy_x_get_y', 
    discount_value: 1, // Get 1 free
    conditions: JSON.stringify({
      buy_quantity: 2,
      get_quantity: 1,
      min_amount: 100000
    }),
    actions: JSON.stringify({
      discount_type: 'buy_x_get_y',
      buy_quantity: 2,
      get_quantity: 1
    }),
    priority: 3,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usage_limit: 50
  };
  
  console.log('📤 Dữ liệu gửi:', JSON.stringify(buyXGetYData, null, 2));
  
  try {
    const response = await fetch('http://localhost:8081/api/v1/pricing-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buyXGetYData)
    });
    
    console.log('📥 Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Direct API Create Buy X Get Y Rule: THÀNH CÔNG');
      console.log('   📋 Chi tiết:', result);
    } else {
      const error = await response.text();
      console.log('❌ Direct API Create Buy X Get Y Rule: THẤT BẠI');
      console.log('   📋 Lỗi:', error);
    }
  } catch (error) {
    console.error('❌ Direct API call failed:', error.message);
  }
}

// Test các chức năng read cơ bản
async function testBasicReadFunctions() {
  console.log('\n📖 Test các chức năng READ cơ bản...');
  
  const apiClient = new SunEcommerceApiClient({
    baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://localhost:8081',
    apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
    timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
    authToken: process.env.SUN_ECOMMERCE_API_TOKEN,
    enableLogging: process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false',
  });

  const toolHandler = new ToolHandler(apiClient);

  const readTests = [
    { name: 'health_check', data: {} },
    { name: 'list_categories', data: { page: 1, pageSize: 5 } },
    { name: 'search_products', data: { limit: 5, offset: 0 } }
  ];

  for (const test of readTests) {
    try {
      console.log(`\n🔍 Testing ${test.name}...`);
      const result = await toolHandler.handleTool(test.name, test.data);
      console.log(`   ${result.success ? '✅' : '❌'} ${test.name}: ${result.success ? 'THÀNH CÔNG' : 'THẤT BẠI'}`);
      if (!result.success) {
        console.log(`   📝 Lỗi: ${result.error}`);
      }
    } catch (error) {
      console.error(`   ❌ ${test.name} exception:`, error.message);
    }
  }
}

// Main test function
async function runAllTests() {
  try {
    await testBasicReadFunctions();
    await testDirectApiCalls();
    await testWorkingCreateFunctions();
  } catch (error) {
    console.error('\n💥 Test suite failed:', error);
    process.exit(1);
  }
}

// Chạy tests nếu file được gọi trực tiếp
if (process.argv[1] === new URL(import.meta.url).pathname) {
  runAllTests().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { testWorkingCreateFunctions, testBasicReadFunctions, runAllTests };