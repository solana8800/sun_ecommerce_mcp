import axios from 'axios';
export class SunEcommerceApiClient {
    client;
    config;
    constructor(config) {
        this.config = config;
        this.client = axios.create({
            baseURL: `${config.baseUrl}/api/${config.apiVersion}`,
            timeout: config.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(config.authToken && { 'Authorization': `Bearer ${config.authToken}` }),
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use((config) => {
            if (this.config.enableLogging) {
                console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
            }
            return config;
        }, (error) => {
            if (this.config.enableLogging) {
                console.error('[API Request Error]', error);
            }
            return Promise.reject(error);
        });
        // Response interceptor
        this.client.interceptors.response.use((response) => {
            if (this.config.enableLogging) {
                console.log(`[API Response] ${response.status} ${response.config.url}`);
            }
            return response;
        }, (error) => {
            if (this.config.enableLogging) {
                console.error('[API Response Error]', error.response?.data || error.message);
            }
            return Promise.reject(error);
        });
    }
    // Generic request method with retry logic
    async request(config) {
        let lastError;
        for (let attempt = 1; attempt <= this.config.retries; attempt++) {
            try {
                const response = await this.client.request(config);
                return response.data;
            }
            catch (error) {
                lastError = error;
                if (attempt === this.config.retries) {
                    break;
                }
                // Wait before retry (exponential backoff)
                const delay = Math.pow(2, attempt - 1) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    }
    // Product API methods
    async createProduct(data) {
        return this.request({
            method: 'POST',
            url: '/products',
            data,
        });
    }
    async getProduct(id, params) {
        return this.request({
            method: 'GET',
            url: `/products/${id}`,
            params,
        });
    }
    async searchProducts(params) {
        return this.request({
            method: 'GET',
            url: '/products',
            params,
        });
    }
    async updateProduct(id, data) {
        return this.request({
            method: 'PUT',
            url: `/products/${id}`,
            data,
        });
    }
    async deleteProduct(id) {
        return this.request({
            method: 'DELETE',
            url: `/products/${id}`,
        });
    }
    // Category API methods
    async createCategory(data) {
        return this.request({
            method: 'POST',
            url: '/categories',
            data,
        });
    }
    async getCategory(id) {
        return this.request({
            method: 'GET',
            url: `/categories/${id}`,
        });
    }
    async listCategories(params) {
        return this.request({
            method: 'GET',
            url: '/categories',
            params,
        });
    }
    async getCategoryTree() {
        return this.request({
            method: 'GET',
            url: '/categories/tree',
        });
    }
    async updateCategory(id, data) {
        return this.request({
            method: 'PUT',
            url: `/categories/${id}`,
            data,
        });
    }
    async deleteCategory(id) {
        return this.request({
            method: 'DELETE',
            url: `/categories/${id}`,
        });
    }
    async getProductByHandle(handle) {
        return this.request({
            method: 'GET',
            url: `/products/handle/${handle}`,
        });
    }
    // Pricing Rule API methods
    async createPricingRule(data) {
        return this.request({
            method: 'POST',
            url: '/pricing-rules',
            data,
        });
    }
    async getPricingRule(id) {
        return this.request({
            method: 'GET',
            url: `/pricing-rules/${id}`,
        });
    }
    async listPricingRules(params) {
        return this.request({
            method: 'GET',
            url: '/pricing-rules',
            params,
        });
    }
    async applyPricingRules(data) {
        return this.request({
            method: 'POST',
            url: '/pricing-rules/apply',
            data,
        });
    }
    async validatePricingRule(data) {
        return this.request({
            method: 'POST',
            url: '/pricing-rules/validate',
            data,
        });
    }
    async updatePricingRule(id, data) {
        return this.request({
            method: 'PUT',
            url: `/pricing-rules/${id}`,
            data,
        });
    }
    async deletePricingRule(id) {
        return this.request({
            method: 'DELETE',
            url: `/pricing-rules/${id}`,
        });
    }
    async getPricingRuleByName(name) {
        return this.request({
            method: 'GET',
            url: `/pricing-rules/name/${name}`,
        });
    }
    async updatePricingRuleStatus(id, isActive) {
        return this.request({
            method: 'PATCH',
            url: `/pricing-rules/${id}/status`,
            data: { isActive },
        });
    }
    async getActivePricingRules(params) {
        return this.request({
            method: 'GET',
            url: '/pricing-rules/active',
            params,
        });
    }
    async bulkCalculatePrice(data) {
        return this.request({
            method: 'POST',
            url: '/pricing-rules/bulk-calculate',
            data,
        });
    }
    async getPricingRulesByPriority(priority) {
        return this.request({
            method: 'GET',
            url: `/pricing-rules/priority/${priority}`,
        });
    }
    async bulkUpdatePricingRuleStatus(ruleIds, isActive) {
        return this.request({
            method: 'PATCH',
            url: '/pricing-rules/bulk-status',
            data: { ruleIds, isActive },
        });
    }
    async getPricingRuleStats(id) {
        return this.request({
            method: 'GET',
            url: `/pricing-rules/${id}/stats`,
        });
    }
    async duplicatePricingRule(id, newName) {
        return this.request({
            method: 'POST',
            url: `/pricing-rules/${id}/duplicate`,
            data: { newName },
        });
    }
    // Cart API methods
    async createCart(data) {
        return this.request({
            method: 'POST',
            url: '/carts',
            data,
        });
    }
    async getCart(id) {
        return this.request({
            method: 'GET',
            url: `/carts/${id}`,
        });
    }
    async addCartItem(cartId, data) {
        return this.request({
            method: 'POST',
            url: `/carts/${cartId}/items`,
            data,
        });
    }
    async updateCartItem(cartId, itemId, data) {
        return this.request({
            method: 'PUT',
            url: `/carts/${cartId}/items/${itemId}`,
            data,
        });
    }
    async removeCartItem(cartId, itemId) {
        return this.request({
            method: 'DELETE',
            url: `/carts/${cartId}/items/${itemId}`,
        });
    }
    async getCartSummary(cartId) {
        return this.request({
            method: 'GET',
            url: `/carts/${cartId}/summary`,
        });
    }
    async getCartItems(cartId, params) {
        return this.request({
            method: 'GET',
            url: `/carts/${cartId}/items`,
            params,
        });
    }
    async clearCart(cartId) {
        return this.request({
            method: 'DELETE',
            url: `/carts/${cartId}/items`,
        });
    }
    // Inventory API methods
    async createInventory(data) {
        return this.request({
            method: 'POST',
            url: '/inventory',
            data,
        });
    }
    async getInventoryByProduct(productId) {
        return this.request({
            method: 'GET',
            url: `/inventory/product/${productId}`,
        });
    }
    async checkInventoryAvailability(data) {
        return this.request({
            method: 'POST',
            url: '/inventory/check-availability',
            data,
        });
    }
    async reserveInventory(data) {
        return this.request({
            method: 'POST',
            url: '/inventory/reserve',
            data,
        });
    }
    async getInventory(id) {
        return this.request({
            method: 'GET',
            url: `/inventory/${id}`,
        });
    }
    async listInventory(params) {
        return this.request({
            method: 'GET',
            url: '/inventory',
            params,
        });
    }
    async updateInventory(id, data) {
        return this.request({
            method: 'PUT',
            url: `/inventory/${id}`,
            data,
        });
    }
    // Media API methods
    async uploadMedia(data) {
        return this.request({
            method: 'POST',
            url: '/media/upload',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    async getMedia(id) {
        return this.request({
            method: 'GET',
            url: `/media/${id}`,
        });
    }
    async listMedia(params) {
        return this.request({
            method: 'GET',
            url: '/media',
            params,
        });
    }
    async updateMedia(id, data) {
        return this.request({
            method: 'PUT',
            url: `/media/${id}`,
            data,
        });
    }
    async deleteMedia(id) {
        return this.request({
            method: 'DELETE',
            url: `/media/${id}`,
        });
    }
    // Partner API methods
    async createPartner(data) {
        return this.request({
            method: 'POST',
            url: '/partners',
            data,
        });
    }
    async getPartner(id) {
        return this.request({
            method: 'GET',
            url: `/partners/${id}`,
        });
    }
    async listPartners(params) {
        return this.request({
            method: 'GET',
            url: '/partners',
            params,
        });
    }
    // Sales Channel API methods
    async createSalesChannel(data) {
        return this.request({
            method: 'POST',
            url: '/sales-channels',
            data,
        });
    }
    async getSalesChannel(id) {
        return this.request({
            method: 'GET',
            url: `/sales-channels/${id}`,
        });
    }
    async getSalesChannelByCode(code) {
        return this.request({
            method: 'GET',
            url: `/sales-channels/code/${code}`,
        });
    }
    async listSalesChannels(params) {
        return this.request({
            method: 'GET',
            url: '/sales-channels',
            params,
        });
    }
    async updateSalesChannel(id, data) {
        return this.request({
            method: 'PUT',
            url: `/sales-channels/${id}`,
            data,
        });
    }
    async deleteSalesChannel(id) {
        return this.request({
            method: 'DELETE',
            url: `/sales-channels/${id}`,
        });
    }
    async activateSalesChannel(id) {
        return this.request({
            method: 'POST',
            url: `/sales-channels/${id}/activate`,
        });
    }
    async deactivateSalesChannel(id) {
        return this.request({
            method: 'POST',
            url: `/sales-channels/${id}/deactivate`,
        });
    }
    async getSalesChannelStatistics(id) {
        return this.request({
            method: 'GET',
            url: `/sales-channels/${id}/statistics`,
        });
    }
    // Translation API methods
    async createTranslation(data) {
        return this.request({
            method: 'POST',
            url: '/translations/products',
            data,
        });
    }
    async getTranslation(entityId, languageCode) {
        return this.request({
            method: 'GET',
            url: `/translations/products/${entityId}/${languageCode}`,
        });
    }
    async getSupportedLanguages() {
        return this.request({
            method: 'GET',
            url: '/translations/languages',
        });
    }
    // Product Translation Methods
    async createProductTranslation(data) {
        return this.request({
            method: 'POST',
            url: '/translations/products',
            data,
        });
    }
    async getProductTranslation(productId, language) {
        return this.request({
            method: 'GET',
            url: `/translations/products/${productId}/${language}`,
        });
    }
    async updateProductTranslation(productId, language, data) {
        return this.request({
            method: 'PUT',
            url: `/translations/products/${productId}/${language}`,
            data,
        });
    }
    async deleteProductTranslation(productId, language) {
        return this.request({
            method: 'DELETE',
            url: `/translations/products/${productId}/${language}`,
        });
    }
    async listProductTranslations(productId) {
        return this.request({
            method: 'GET',
            url: `/translations/products/${productId}`,
        });
    }
    // Category Translation Methods
    async createCategoryTranslation(data) {
        return this.request({
            method: 'POST',
            url: '/translations/categories',
            data,
        });
    }
    async getCategoryTranslation(categoryId, language) {
        return this.request({
            method: 'GET',
            url: `/translations/categories/${categoryId}/${language}`,
        });
    }
    async updateCategoryTranslation(categoryId, language, data) {
        return this.request({
            method: 'PUT',
            url: `/translations/categories/${categoryId}/${language}`,
            data,
        });
    }
    async deleteCategoryTranslation(categoryId, language) {
        return this.request({
            method: 'DELETE',
            url: `/translations/categories/${categoryId}/${language}`,
        });
    }
    async listCategoryTranslations(categoryId) {
        return this.request({
            method: 'GET',
            url: `/translations/categories/${categoryId}`,
        });
    }
    // Product Attribute Translation Methods
    async createProductAttributeTranslation(data) {
        return this.request({
            method: 'POST',
            url: '/translations/product-attributes',
            data,
        });
    }
    async getProductAttributeTranslation(attributeId, language) {
        return this.request({
            method: 'GET',
            url: `/translations/product-attributes/${attributeId}/${language}`,
        });
    }
    async updateProductAttributeTranslation(attributeId, language, data) {
        return this.request({
            method: 'PUT',
            url: `/translations/product-attributes/${attributeId}/${language}`,
            data,
        });
    }
    async deleteProductAttributeTranslation(attributeId, language) {
        return this.request({
            method: 'DELETE',
            url: `/translations/product-attributes/${attributeId}/${language}`,
        });
    }
    async listProductAttributeTranslations(attributeId) {
        return this.request({
            method: 'GET',
            url: `/translations/product-attributes/${attributeId}`,
        });
    }
    // Product Variant Translation Methods
    async createProductVariantTranslation(data) {
        return this.request({
            method: 'POST',
            url: '/translations/product-variants',
            data,
        });
    }
    async getProductVariantTranslation(variantId, language) {
        return this.request({
            method: 'GET',
            url: `/translations/product-variants/${variantId}/${language}`,
        });
    }
    async updateProductVariantTranslation(variantId, language, data) {
        return this.request({
            method: 'PUT',
            url: `/translations/product-variants/${variantId}/${language}`,
            data,
        });
    }
    async deleteProductVariantTranslation(variantId, language) {
        return this.request({
            method: 'DELETE',
            url: `/translations/product-variants/${variantId}/${language}`,
        });
    }
    async listProductVariantTranslations(variantId) {
        return this.request({
            method: 'GET',
            url: `/translations/product-variants/${variantId}`,
        });
    }
    // Bulk Translation Methods
    async bulkCreateTranslations(translations) {
        return this.request({
            method: 'POST',
            url: '/translations/bulk',
            data: { translations },
        });
    }
    async bulkDeleteTranslations(translations) {
        return this.request({
            method: 'DELETE',
            url: '/translations/bulk',
            data: { translations },
        });
    }
    async getTranslationStats(params) {
        return this.request({
            method: 'GET',
            url: '/translations/stats',
            params,
        });
    }
    // Product Attribute API methods
    async createAttribute(data) {
        return this.request({
            method: 'POST',
            url: '/product-attributes',
            data,
        });
    }
    async getAttribute(id) {
        return this.request({
            method: 'GET',
            url: `/product-attributes/${id}`,
        });
    }
    async listAttributes(params) {
        return this.request({
            method: 'GET',
            url: '/product-attributes',
            params,
        });
    }
    async createAttributeValue(attributeId, data) {
        return this.request({
            method: 'POST',
            url: `/product-attributes/${attributeId}/values`,
            data,
        });
    }
    async getAttributeValues(attributeId) {
        return this.request({
            method: 'GET',
            url: `/product-attributes/${attributeId}/values`,
        });
    }
    async getAttributeByName(name) {
        return this.request({
            method: 'GET',
            url: `/product-attributes/name/${name}`,
        });
    }
    async updateAttribute(id, data) {
        return this.request({
            method: 'PUT',
            url: `/product-attributes/${id}`,
            data,
        });
    }
    async deleteAttribute(id) {
        return this.request({
            method: 'DELETE',
            url: `/product-attributes/${id}`,
        });
    }
    async updateAttributeValue(attributeId, valueId, data) {
        return this.request({
            method: 'PUT',
            url: `/product-attributes/${attributeId}/values/${valueId}`,
            data,
        });
    }
    async deleteAttributeValue(attributeId, valueId) {
        return this.request({
            method: 'DELETE',
            url: `/product-attributes/${attributeId}/values/${valueId}`,
        });
    }
    async bulkCreateAttributeValues(attributeId, values) {
        return this.request({
            method: 'POST',
            url: `/product-attributes/${attributeId}/values/bulk`,
            data: { values },
        });
    }
    async getAttributeUsage(id) {
        return this.request({
            method: 'GET',
            url: `/product-attributes/${id}/usage`,
        });
    }
    // Health check
    async healthCheck() {
        return this.request({
            method: 'GET',
            url: '/health',
        });
    }
    // System information methods
    async getSystemInfo() {
        return this.request({
            method: 'GET',
            url: '/system/info',
        });
    }
}
//# sourceMappingURL=api-client.js.map