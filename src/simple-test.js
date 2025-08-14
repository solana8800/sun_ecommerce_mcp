#!/usr/bin/env node

import { SunEcommerceApiClient } from './client/api-client.js';
import { ToolHandler } from './tools/tool-handler.js';

// Simple test script for MCP Server
async function testMcpServer() {
  console.log('🚀 Testing Sun eCommerce MCP Server...');
  
  // Initialize API client
  const apiClient = new SunEcommerceApiClient({
    baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://42.96.60.253:8080',
    apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
    timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
    authToken: process.env.SUN_ECOMMERCE_API_TOKEN,
    enableLogging: process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false',
  });

  const toolHandler = new ToolHandler(apiClient);

  try {
    // Test 1: List Categories (this endpoint works)
    console.log('\n📂 Test 1: List Categories');
    try {
      const categoriesResult = await toolHandler.handleTool('list_categories', {});
      console.log('✅ List Categories successful:', JSON.stringify(categoriesResult, null, 2));
    } catch (error) {
      console.log('❌ List Categories failed:', error instanceof Error ? error.message : error);
    }

    // Test 2: Search Products (this endpoint works)
    console.log('\n🔍 Test 2: Search Products');
    try {
      const productsResult = await toolHandler.handleTool('search_products', {
        limit: 5,
        offset: 0
      });
      console.log('✅ Search Products successful:', JSON.stringify(productsResult, null, 2));
    } catch (error) {
      console.log('❌ Search Products failed:', error instanceof Error ? error.message : error);
    }

    // Test 3: Direct API call to categories
    console.log('\n📡 Test 3: Direct API - Categories');
    try {
      const categories = await apiClient.listCategories();
      console.log('✅ Direct Categories API successful:', categories);
    } catch (error) {
      console.log('❌ Direct Categories API failed:', error instanceof Error ? error.message : error);
    }

    // Test 4: Direct API call to products
    console.log('\n📡 Test 4: Direct API - Products');
    try {
      const products = await apiClient.searchProducts({ limit: 3 });
      console.log('✅ Direct Products API successful:', products);
    } catch (error) {
      console.log('❌ Direct Products API failed:', error instanceof Error ? error.message : error);
    }

    // Test 5: System health check
    console.log('\n🏥 Test 5: System Health');
    try {
      const health = await apiClient.getSystemHealth();
      console.log('✅ System Health successful:', health);
    } catch (error) {
      console.log('❌ System Health failed:', error instanceof Error ? error.message : error);
    }

  } catch (error) {
    console.error('💥 Test failed with error:', error instanceof Error ? error.message : error);
  }

  console.log('\n🏁 Test completed!');
}

// Run the test if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  testMcpServer().catch((error) => {
    console.error('Failed to run test:', error);
    process.exit(1);
  });
}

export { testMcpServer };