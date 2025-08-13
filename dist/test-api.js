#!/usr/bin/env node
import { SunEcommerceApiClient } from './client/api-client.js';
import { ToolHandler } from './tools/tool-handler.js';
// Test script để kiểm tra kết nối API và các chức năng cơ bản
async function testApiConnection() {
    console.log('🚀 Bắt đầu test MCP Server với Sun eCommerce API...');
    // Khởi tạo API client
    const apiClient = new SunEcommerceApiClient({
        baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://localhost:8080',
        apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
        timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
        retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
        authToken: process.env.SUN_ECOMMERCE_API_TOKEN,
        enableLogging: process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false',
    });
    const toolHandler = new ToolHandler(apiClient);
    try {
        // Test 1: Health Check
        console.log('\n📊 Test 1: Health Check');
        const healthResult = await toolHandler.handleTool('health_check', {});
        console.log('✅ Health Check thành công:', JSON.stringify(healthResult, null, 2));
        // Test 2: List Categories
        console.log('\n📂 Test 2: List Categories');
        const categoriesResult = await toolHandler.handleTool('list_categories', {});
        console.log('✅ List Categories thành công:', JSON.stringify(categoriesResult, null, 2));
        // Test 3: Search Products
        console.log('\n🔍 Test 3: Search Products');
        const productsResult = await toolHandler.handleTool('search_products', {
            limit: 5,
            offset: 0
        });
        console.log('✅ Search Products thành công:', JSON.stringify(productsResult, null, 2));
        // Test 4: Get System Info
        console.log('\n💻 Test 4: Get System Info');
        const systemInfoResult = await toolHandler.handleTool('get_system_info', {});
        console.log('✅ Get System Info thành công:', JSON.stringify(systemInfoResult, null, 2));
        console.log('\n🎉 Tất cả tests đã pass! MCP Server hoạt động tốt với API.');
    }
    catch (error) {
        console.error('❌ Test thất bại:', error);
        if (error instanceof Error) {
            console.error('Chi tiết lỗi:', error.message);
            console.error('Stack trace:', error.stack);
        }
        process.exit(1);
    }
}
// Test kết nối trực tiếp API
async function testDirectApiConnection() {
    console.log('\n🔗 Test kết nối trực tiếp API...');
    const apiClient = new SunEcommerceApiClient({
        baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://localhost:8080',
        apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
        timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
        retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
        authToken: process.env.SUN_ECOMMERCE_API_TOKEN,
        enableLogging: process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false',
    });
    try {
        // Test direct API calls
        console.log('📡 Testing direct API endpoints...');
        // Test categories endpoint
        const categories = await apiClient.listCategories();
        console.log('✅ Categories API:', categories.data?.length || 0, 'categories found');
        // Test products endpoint
        const products = await apiClient.searchProducts({ limit: 3 });
        console.log('✅ Products API:', products.data?.length || 0, 'products found');
        console.log('🎯 Direct API connection test passed!');
    }
    catch (error) {
        console.error('❌ Direct API test failed:', error);
        throw error;
    }
}
// Main test function
async function runTests() {
    try {
        await testDirectApiConnection();
        await testApiConnection();
    }
    catch (error) {
        console.error('\n💥 Test suite failed:', error);
        process.exit(1);
    }
}
// Chạy tests
if (import.meta.url === `file://${process.argv[1]}`) {
    runTests().catch((error) => {
        console.error('Unhandled error in test suite:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=test-api.js.map