import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../types/index.js';

export class SunEcommerceApiClient {
  private client: AxiosInstance;
  private config: Config;

  constructor(config: Config) {
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

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (this.config.enableLogging) {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        if (this.config.enableLogging) {
          console.error('[API Request Error]', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        if (this.config.enableLogging) {
          console.log(`[API Response] ${response.status} ${response.config.url}`);
        }
        return response;
      },
      (error) => {
        if (this.config.enableLogging) {
          console.error('[API Response Error]', error.response?.data || error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request method with retry logic
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response: AxiosResponse<T> = await this.client.request(config);
        return response.data;
      } catch (error) {
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
  async createProduct(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/products',
      data,
    });
  }

  async getProduct(id: string, params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/products/${id}`,
      params,
    });
  }

  async searchProducts(params: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/products',
      params,
    });
  }

  async updateProduct(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/products/${id}`,
      data,
    });
  }

  async deleteProduct(id: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/products/${id}`,
    });
  }

  // Category API methods
  async createCategory(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/categories',
      data,
    });
  }

  async getCategory(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/categories/${id}`,
    });
  }

  async listCategories(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/categories',
      params,
    });
  }

  async getCategoryTree(): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/categories/tree',
    });
  }

  async updateCategory(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/categories/${id}`,
      data,
    });
  }

  async deleteCategory(id: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/categories/${id}`,
    });
  }

  async getProductByHandle(handle: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/products/handle/${handle}`,
    });
  }

  // Pricing Rule API methods
  async createPricingRule(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/pricing-rules',
      data,
    });
  }

  async getPricingRule(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/${id}`,
    });
  }

  async listPricingRules(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/pricing-rules',
      params,
    });
  }

  async applyPricingRules(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/pricing-rules/apply',
      data,
    });
  }

  async validatePricingRule(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/pricing-rules/validate',
      data,
    });
  }

  async updatePricingRule(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/pricing-rules/${id}`,
      data,
    });
  }

  async deletePricingRule(id: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/pricing-rules/${id}`,
    });
  }

  async getPricingRuleByName(name: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/name/${name}`,
    });
  }

  async updatePricingRuleStatus(id: string, isActive: boolean): Promise<any> {
    return this.request({
      method: 'PATCH',
      url: `/pricing-rules/${id}/status`,
      data: { isActive },
    });
  }

  async getActivePricingRules(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/pricing-rules/active',
      params,
    });
  }

  async bulkCalculatePrice(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/pricing-rules/bulk-calculate',
      data,
    });
  }

  async getPricingRulesByPriority(priority: number): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/priority/${priority}`,
    });
  }

  async bulkUpdatePricingRuleStatus(ruleIds: string[], isActive: boolean): Promise<any> {
    return this.request({
      method: 'PATCH',
      url: '/pricing-rules/bulk-status',
      data: { ruleIds, isActive },
    });
  }

  async getPricingRuleStats(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/${id}/stats`,
    });
  }

  async duplicatePricingRule(id: string, newName: string): Promise<any> {
    return this.request({
      method: 'POST',
      url: `/pricing-rules/${id}/duplicate`,
      data: { newName },
    });
  }

  // Cart API methods
  async createCart(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/carts',
      data,
    });
  }

  async getCart(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/carts/${id}`,
    });
  }

  async addCartItem(cartId: string, data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: `/carts/${cartId}/items`,
      data,
    });
  }

  async updateCartItem(cartId: string, itemId: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/carts/${cartId}/items/${itemId}`,
      data,
    });
  }

  async removeCartItem(cartId: string, itemId: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/carts/${cartId}/items/${itemId}`,
    });
  }

  async getCartSummary(cartId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/carts/${cartId}/summary`,
    });
  }

  async getCartItems(cartId: string, params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/carts/${cartId}/items`,
      params,
    });
  }

  async clearCart(cartId: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/carts/${cartId}/items`,
    });
  }

  // Inventory API methods
  async createInventory(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/inventory',
      data,
    });
  }

  async getInventoryByProduct(productId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/inventory/product/${productId}`,
    });
  }

  async checkInventoryAvailability(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/inventory/check-availability',
      data,
    });
  }

  async reserveInventory(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/inventory/reserve',
      data,
    });
  }

  async getInventory(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/inventory/${id}`,
    });
  }

  async listInventory(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/inventory',
      params,
    });
  }

  async updateInventory(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/inventory/${id}`,
      data,
    });
  }

  // Media API methods
  async uploadMedia(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/media/upload',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getMedia(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/media/${id}`,
    });
  }

  async listMedia(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/media',
      params,
    });
  }

  async updateMedia(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/media/${id}`,
      data,
    });
  }

  async deleteMedia(id: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/media/${id}`,
    });
  }

  // Partner API methods
  async createPartner(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/partners',
      data,
    });
  }

  async getPartner(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/partners/${id}`,
    });
  }

  async listPartners(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/partners',
      params,
    });
  }

  // Sales Channel API methods
  async createSalesChannel(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/sales-channels',
      data,
    });
  }

  async getSalesChannel(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/sales-channels/${id}`,
    });
  }

  async getSalesChannelByCode(code: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/sales-channels/code/${code}`,
    });
  }

  async listSalesChannels(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/sales-channels',
      params,
    });
  }

  async updateSalesChannel(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/sales-channels/${id}`,
      data,
    });
  }

  async deleteSalesChannel(id: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/sales-channels/${id}`,
    });
  }

  async activateSalesChannel(id: string): Promise<any> {
    return this.request({
      method: 'POST',
      url: `/sales-channels/${id}/activate`,
    });
  }

  async deactivateSalesChannel(id: string): Promise<any> {
    return this.request({
      method: 'POST',
      url: `/sales-channels/${id}/deactivate`,
    });
  }

  async getSalesChannelStatistics(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/sales-channels/${id}/statistics`,
    });
  }

  // Translation API methods
  async createTranslation(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/translations/products',
      data,
    });
  }

  async getTranslation(entityId: string, languageCode: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/products/${entityId}/${languageCode}`,
    });
  }

  async getSupportedLanguages(): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/translations/languages',
    });
  }

  // Product Translation Methods
  async createProductTranslation(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/translations/products',
      data,
    });
  }

  async getProductTranslation(productId: string, language: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/products/${productId}/${language}`,
    });
  }

  async updateProductTranslation(productId: string, language: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/translations/products/${productId}/${language}`,
      data,
    });
  }

  async deleteProductTranslation(productId: string, language: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/translations/products/${productId}/${language}`,
    });
  }

  async listProductTranslations(productId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/products/${productId}`,
    });
  }

  // Category Translation Methods
  async createCategoryTranslation(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/translations/categories',
      data,
    });
  }

  async getCategoryTranslation(categoryId: string, language: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/categories/${categoryId}/${language}`,
    });
  }

  async updateCategoryTranslation(categoryId: string, language: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/translations/categories/${categoryId}/${language}`,
      data,
    });
  }

  async deleteCategoryTranslation(categoryId: string, language: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/translations/categories/${categoryId}/${language}`,
    });
  }

  async listCategoryTranslations(categoryId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/categories/${categoryId}`,
    });
  }

  // Product Attribute Translation Methods
  async createProductAttributeTranslation(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/translations/product-attributes',
      data,
    });
  }

  async getProductAttributeTranslation(attributeId: string, language: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/product-attributes/${attributeId}/${language}`,
    });
  }

  async updateProductAttributeTranslation(attributeId: string, language: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/translations/product-attributes/${attributeId}/${language}`,
      data,
    });
  }

  async deleteProductAttributeTranslation(attributeId: string, language: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/translations/product-attributes/${attributeId}/${language}`,
    });
  }

  async listProductAttributeTranslations(attributeId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/product-attributes/${attributeId}`,
    });
  }

  // Product Variant Translation Methods
  async createProductVariantTranslation(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/translations/product-variants',
      data,
    });
  }

  async getProductVariantTranslation(variantId: string, language: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/product-variants/${variantId}/${language}`,
    });
  }

  async updateProductVariantTranslation(variantId: string, language: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/translations/product-variants/${variantId}/${language}`,
      data,
    });
  }

  async deleteProductVariantTranslation(variantId: string, language: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/translations/product-variants/${variantId}/${language}`,
    });
  }

  async listProductVariantTranslations(variantId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/translations/product-variants/${variantId}`,
    });
  }

  // Bulk Translation Methods
  async bulkCreateTranslations(translations: any[]): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/translations/bulk',
      data: { translations },
    });
  }

  async bulkDeleteTranslations(translations: any[]): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: '/translations/bulk',
      data: { translations },
    });
  }

  async getTranslationStats(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/translations/stats',
      params,
    });
  }

  // Product Attribute API methods
  async createAttribute(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/product-attributes',
      data,
    });
  }

  async getAttribute(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/product-attributes/${id}`,
    });
  }

  async listAttributes(params?: any): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/product-attributes',
      params,
    });
  }

  async createAttributeValue(attributeId: string, data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: `/product-attributes/${attributeId}/values`,
      data,
    });
  }

  async getAttributeValues(attributeId: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/product-attributes/${attributeId}/values`,
    });
  }

  async getAttributeByName(name: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/product-attributes/name/${name}`,
    });
  }

  async updateAttribute(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/product-attributes/${id}`,
      data,
    });
  }

  async deleteAttribute(id: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/product-attributes/${id}`,
    });
  }

  async updateAttributeValue(attributeId: string, valueId: string, data: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/product-attributes/${attributeId}/values/${valueId}`,
      data,
    });
  }

  async deleteAttributeValue(attributeId: string, valueId: string): Promise<any> {
    return this.request({
      method: 'DELETE',
      url: `/product-attributes/${attributeId}/values/${valueId}`,
    });
  }

  async bulkCreateAttributeValues(attributeId: string, values: any[]): Promise<any> {
    return this.request({
      method: 'POST',
      url: `/product-attributes/${attributeId}/values/bulk`,
      data: { values },
    });
  }

  async getAttributeUsage(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/product-attributes/${id}/usage`,
    });
  }

  // Health check
  async healthCheck(): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/health',
    });
  }

  // System information methods
  async getSystemInfo(): Promise<any> {
    return this.request({
      method: 'GET',
      url: '/system/info',
    });
  }
}
