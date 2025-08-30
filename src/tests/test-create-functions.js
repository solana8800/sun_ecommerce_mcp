#!/usr/bin/env node

import { SunEcommerceApiClient } from '../client/api-client.js';
import { ToolHandler } from '../tools/tool-handler.js';

// Test script để kiểm tra các chức năng create của MCP Server
async function testCreateFunctions() {
  console.log('🚀 Bắt đầu test các chức năng CREATE của MCP Server...');
  
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

  try {
    // Test 1: Create Category
    console.log('\n📂 Test 1: Create Category');
    const categoryResult = await toolHandler.handleTool('create_category', {
      name: 'Test Category MCP',
      description: 'Danh mục test từ MCP Server',
      slug: 'test-category-mcp-' + Date.now(),
      isActive: true,
      sortOrder: 1
    });
    console.log('✅ Create Category thành công:', JSON.stringify(categoryResult, null, 2));

    // Test 2: Create Product
    console.log('\n🛍️ Test 2: Create Product');
    const productResult = await toolHandler.handleTool('create_product', {
      name: 'Test Product MCP',
      description: 'Sản phẩm test từ MCP Server',
      sku: 'TEST-MCP-' + Date.now(),
      productType: 'simple',
      price: 100000,
      status: 'active',
      tags: ['test', 'mcp', 'demo']
    });
    console.log('✅ Create Product thành công:', JSON.stringify(productResult, null, 2));

    // Test 3: Create Pricing Rule
    console.log('\n💰 Test 3: Create Pricing Rule');
    const pricingRuleResult = await toolHandler.handleTool('create_pricing_rule', {
      name: 'Test Pricing Rule MCP',
      description: 'Quy tắc giá test từ MCP Server',
      ruleType: 'percentage_discount',
      discountType: 'percentage',
      discountValue: 10,
      conditions: {
        min_quantity: 1,
        min_amount: 50000
      },
      actions: {
        discount_percentage: 10
      },
      priority: 1,
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      usageLimit: 100
    });
    console.log('✅ Create Pricing Rule thành công:', JSON.stringify(pricingRuleResult, null, 2));

    // Test 4: Create Sales Channel
    console.log('\n🏪 Test 4: Create Sales Channel');
    const salesChannelResult = await toolHandler.handleTool('create_sales_channel', {
      name: 'Test Sales Channel MCP',
      code: 'TEST-MCP-' + Date.now(),
      type: 'ONLINE',
      description: 'Kênh bán hàng test từ MCP Server',
      country: 'Vietnam',
      currency: 'VND',
      language: 'vi',
      commission_rate: 5.0,
      is_active: true,
      settings: {
        auto_sync: true,
        notification_enabled: true
      },
      metadata: {
        created_by: 'mcp-server',
        test_mode: true
      }
    });
    console.log('✅ Create Sales Channel thành công:', JSON.stringify(salesChannelResult, null, 2));

    // Test 5: Create Partner
    console.log('\n🤝 Test 5: Create Partner');
    const partnerResult = await toolHandler.handleTool('create_partner', {
      name: 'Test Partner MCP',
      code: 'PARTNER-MCP-' + Date.now(),
      type: 'RETAILER',
      tier: 'BRONZE',
      email: 'test-partner@example.com',
      phone: '+84123456789',
      address: '123 Test Street, Ho Chi Minh City',
      country: 'Vietnam',
      contact_person: 'Test Contact Person',
      commission_rate: 3.0,
      is_active: true,
      settings: {
        auto_payment: false,
        notification_email: true
      },
      metadata: {
        created_by: 'mcp-server',
        test_partner: true
      }
    });
    console.log('✅ Create Partner thành công:', JSON.stringify(partnerResult, null, 2));

    console.log('\n🎉 Tất cả tests CREATE đã pass! MCP Server có thể tạo dữ liệu thành công.');
    
  } catch (error) {
    console.error('❌ Test CREATE thất bại:', error);
    if (error instanceof Error) {
      console.error('Chi tiết lỗi:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Test từng chức năng create riêng lẻ
async function testIndividualCreateFunctions() {
  console.log('\n🔧 Test từng chức năng CREATE riêng lẻ...');
  
  const apiClient = new SunEcommerceApiClient({
    baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://localhost:8081',
    apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
    timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
    authToken: process.env.SUN_ECOMMERCE_API_TOKEN,
    enableLogging: process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false',
  });

  const toolHandler = new ToolHandler(apiClient);

  const createTests = [
    {
      name: 'create_category',
      data: {
        name: 'Individual Test Category',
        description: 'Test riêng lẻ danh mục',
        slug: 'individual-test-category-' + Date.now(),
        isActive: true
      }
    },
    {
      name: 'create_product',
      data: {
        name: 'Individual Test Product',
        description: 'Test riêng lẻ sản phẩm',
        sku: 'INDIVIDUAL-TEST-' + Date.now(),
        productType: 'simple',
        price: 50000,
        status: 'draft'
      }
    }
  ];

  for (const test of createTests) {
    try {
      console.log(`\n🧪 Testing ${test.name}...`);
      const result = await toolHandler.handleTool(test.name, test.data);
      console.log(`✅ ${test.name} thành công:`, JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`❌ ${test.name} thất bại:`, error.message);
    }
  }
}

// Main test function
async function runCreateTests() {
  try {
    await testCreateFunctions();
    await testIndividualCreateFunctions();
  } catch (error) {
    console.error('\n💥 Test suite CREATE failed:', error);
    process.exit(1);
  }
}

// Chạy tests nếu file được gọi trực tiếp
if (process.argv[1] === new URL(import.meta.url).pathname) {
  runCreateTests().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { testCreateFunctions, testIndividualCreateFunctions, runCreateTests };