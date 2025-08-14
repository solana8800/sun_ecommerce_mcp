import axios from 'axios';

/**
 * Sun eCommerce API Client - Pure JavaScript Implementation
 * Provides a comprehensive interface to interact with the Sun eCommerce Platform API
 * 
 * @class SunEcommerceApiClient
 */
export class SunEcommerceApiClient {
  /**
   * Creates an instance of SunEcommerceApiClient
   * @param {Object} config - Configuration object
   * @param {string} config.baseUrl - Base URL of the API
   * @param {string} config.apiVersion - API version (default: 'v1')
   * @param {number} config.timeout - Request timeout in milliseconds
   * @param {number} config.retries - Number of retry attempts
   * @param {string} config.authToken - Authentication token
   * @param {boolean} config.enableLogging - Enable request/response logging
   */
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

  /**
   * Sets up request and response interceptors for logging and error handling
   * @private
   */
  setupInterceptors() {
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

  /**
   * Generic request method with retry logic and exponential backoff
   * @private
   * @param {Object} config - Axios request configuration
   * @returns {Promise<any>} Response data
   */
  async request(config) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await this.client.request(config);
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

  // ==================== PRODUCT API METHODS ====================

  /**
   * Creates a new product
   * @param {Object} data - Product data
   * @returns {Promise<any>} Created product
   */
  async createProduct(data) {
    return this.request({
      method: 'POST',
      url: '/products',
      data,
    });
  }

  /**
   * Gets a product by ID
   * @param {string} id - Product ID
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Product data
   */
  async getProduct(id, params) {
    return this.request({
      method: 'GET',
      url: `/products/${id}`,
      params,
    });
  }

  /**
   * Searches for products
   * @param {Object} params - Search parameters
   * @returns {Promise<any>} Search results
   */
  async searchProducts(params) {
    return this.request({
      method: 'GET',
      url: '/products',
      params,
    });
  }

  /**
   * Updates a product
   * @param {string} id - Product ID
   * @param {Object} data - Updated product data
   * @returns {Promise<any>} Updated product
   */
  async updateProduct(id, data) {
    return this.request({
      method: 'PUT',
      url: `/products/${id}`,
      data,
    });
  }

  /**
   * Deletes a product
   * @param {string} id - Product ID
   * @returns {Promise<any>} Deletion result
   */
  async deleteProduct(id) {
    return this.request({
      method: 'DELETE',
      url: `/products/${id}`,
    });
  }

  /**
   * Gets a product by handle/slug
   * @param {string} handle - Product handle
   * @returns {Promise<any>} Product data
   */
  async getProductByHandle(handle) {
    return this.request({
      method: 'GET',
      url: `/products/handle/${handle}`,
    });
  }

  // ==================== CATEGORY API METHODS ====================

  /**
   * Creates a new category
   * @param {Object} data - Category data
   * @returns {Promise<any>} Created category
   */
  async createCategory(data) {
    return this.request({
      method: 'POST',
      url: '/categories',
      data,
    });
  }

  /**
   * Gets a category by ID
   * @param {string} id - Category ID
   * @returns {Promise<any>} Category data
   */
  async getCategory(id) {
    return this.request({
      method: 'GET',
      url: `/categories/${id}`,
    });
  }

  /**
   * Lists all categories
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Categories list
   */
  async listCategories(params) {
    return this.request({
      method: 'GET',
      url: '/categories',
      params,
    });
  }

  /**
   * Gets the category tree structure
   * @returns {Promise<any>} Category tree
   */
  async getCategoryTree() {
    return this.request({
      method: 'GET',
      url: '/categories/tree',
    });
  }

  /**
   * Updates a category
   * @param {string} id - Category ID
   * @param {Object} data - Updated category data
   * @returns {Promise<any>} Updated category
   */
  async updateCategory(id, data) {
    return this.request({
      method: 'PUT',
      url: `/categories/${id}`,
      data,
    });
  }

  /**
   * Deletes a category
   * @param {string} id - Category ID
   * @returns {Promise<any>} Deletion result
   */
  async deleteCategory(id) {
    return this.request({
      method: 'DELETE',
      url: `/categories/${id}`,
    });
  }

  // ==================== PRICING RULES API METHODS ====================

  /**
   * Creates a new pricing rule
   * @param {Object} data - Pricing rule data
   * @returns {Promise<any>} Created pricing rule
   */
  async createPricingRule(data) {
    return this.request({
      method: 'POST',
      url: '/pricing-rules',
      data,
    });
  }

  /**
   * Gets a pricing rule by ID
   * @param {string} id - Pricing rule ID
   * @returns {Promise<any>} Pricing rule data
   */
  async getPricingRule(id) {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/${id}`,
    });
  }

  /**
   * Lists all pricing rules
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Pricing rules list
   */
  async listPricingRules(params) {
    return this.request({
      method: 'GET',
      url: '/pricing-rules',
      params,
    });
  }

  /**
   * Applies pricing rules to calculate final prices
   * @param {Object} data - Pricing calculation data
   * @returns {Promise<any>} Calculated prices
   */
  async applyPricingRules(data) {
    return this.request({
      method: 'POST',
      url: '/pricing-rules/apply',
      data,
    });
  }

  /**
   * Validates a pricing rule
   * @param {Object} data - Pricing rule data to validate
   * @returns {Promise<any>} Validation result
   */
  async validatePricingRule(data) {
    return this.request({
      method: 'POST',
      url: '/pricing-rules/validate',
      data,
    });
  }

  /**
   * Updates a pricing rule
   * @param {string} id - Pricing rule ID
   * @param {Object} data - Updated pricing rule data
   * @returns {Promise<any>} Updated pricing rule
   */
  async updatePricingRule(id, data) {
    return this.request({
      method: 'PUT',
      url: `/pricing-rules/${id}`,
      data,
    });
  }

  /**
   * Deletes a pricing rule
   * @param {string} id - Pricing rule ID
   * @returns {Promise<any>} Deletion result
   */
  async deletePricingRule(id) {
    return this.request({
      method: 'DELETE',
      url: `/pricing-rules/${id}`,
    });
  }

  /**
   * Gets a pricing rule by name
   * @param {string} name - Pricing rule name
   * @returns {Promise<any>} Pricing rule data
   */
  async getPricingRuleByName(name) {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/name/${name}`,
    });
  }

  /**
   * Updates pricing rule status (active/inactive)
   * @param {string} id - Pricing rule ID
   * @param {boolean} isActive - Active status
   * @returns {Promise<any>} Updated pricing rule
   */
  async updatePricingRuleStatus(id, isActive) {
    return this.request({
      method: 'PATCH',
      url: `/pricing-rules/${id}/status`,
      data: { isActive },
    });
  }

  /**
   * Gets active pricing rules
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Active pricing rules
   */
  async getActivePricingRules(params) {
    return this.request({
      method: 'GET',
      url: '/pricing-rules/active',
      params,
    });
  }

  /**
   * Bulk calculates prices for multiple items
   * @param {Object} data - Bulk pricing data
   * @returns {Promise<any>} Calculated prices
   */
  async bulkCalculatePrice(data) {
    return this.request({
      method: 'POST',
      url: '/pricing-rules/bulk-calculate',
      data,
    });
  }

  /**
   * Gets pricing rules by priority
   * @param {number} priority - Priority level
   * @returns {Promise<any>} Pricing rules
   */
  async getPricingRulesByPriority(priority) {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/priority/${priority}`,
    });
  }

  /**
   * Bulk updates pricing rule status
   * @param {string[]} ruleIds - Array of pricing rule IDs
   * @param {boolean} isActive - Active status
   * @returns {Promise<any>} Update result
   */
  async bulkUpdatePricingRuleStatus(ruleIds, isActive) {
    return this.request({
      method: 'PATCH',
      url: '/pricing-rules/bulk-status',
      data: { ruleIds, isActive },
    });
  }

  /**
   * Gets pricing rule statistics
   * @param {string} id - Pricing rule ID
   * @returns {Promise<any>} Rule statistics
   */
  async getPricingRuleStats(id) {
    return this.request({
      method: 'GET',
      url: `/pricing-rules/${id}/stats`,
    });
  }

  /**
   * Duplicates a pricing rule
   * @param {string} id - Pricing rule ID to duplicate
   * @param {string} newName - Name for the new rule
   * @returns {Promise<any>} Duplicated pricing rule
   */
  async duplicatePricingRule(id, newName) {
    return this.request({
      method: 'POST',
      url: `/pricing-rules/${id}/duplicate`,
      data: { newName },
    });
  }

  // ==================== CART API METHODS ====================

  /**
   * Creates a new cart
   * @param {Object} data - Cart data
   * @returns {Promise<any>} Created cart
   */
  async createCart(data) {
    return this.request({
      method: 'POST',
      url: '/carts',
      data,
    });
  }

  /**
   * Gets a cart by ID
   * @param {string} id - Cart ID
   * @returns {Promise<any>} Cart data
   */
  async getCart(id) {
    return this.request({
      method: 'GET',
      url: `/carts/${id}`,
    });
  }

  /**
   * Adds an item to cart
   * @param {string} cartId - Cart ID
   * @param {Object} data - Item data
   * @returns {Promise<any>} Updated cart
   */
  async addCartItem(cartId, data) {
    return this.request({
      method: 'POST',
      url: `/carts/${cartId}/items`,
      data,
    });
  }

  /**
   * Updates a cart item
   * @param {string} cartId - Cart ID
   * @param {string} itemId - Item ID
   * @param {Object} data - Updated item data
   * @returns {Promise<any>} Updated cart
   */
  async updateCartItem(cartId, itemId, data) {
    return this.request({
      method: 'PUT',
      url: `/carts/${cartId}/items/${itemId}`,
      data,
    });
  }

  /**
   * Removes an item from cart
   * @param {string} cartId - Cart ID
   * @param {string} itemId - Item ID
   * @returns {Promise<any>} Updated cart
   */
  async removeCartItem(cartId, itemId) {
    return this.request({
      method: 'DELETE',
      url: `/carts/${cartId}/items/${itemId}`,
    });
  }

  /**
   * Gets cart summary with totals
   * @param {string} cartId - Cart ID
   * @returns {Promise<any>} Cart summary
   */
  async getCartSummary(cartId) {
    return this.request({
      method: 'GET',
      url: `/carts/${cartId}/summary`,
    });
  }

  /**
   * Gets cart items
   * @param {string} cartId - Cart ID
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Cart items
   */
  async getCartItems(cartId, params) {
    return this.request({
      method: 'GET',
      url: `/carts/${cartId}/items`,
      params,
    });
  }

  /**
   * Clears all items from cart
   * @param {string} cartId - Cart ID
   * @returns {Promise<any>} Empty cart
   */
  async clearCart(cartId) {
    return this.request({
      method: 'DELETE',
      url: `/carts/${cartId}/items`,
    });
  }

  // ==================== INVENTORY API METHODS ====================

  /**
   * Creates inventory record
   * @param {Object} data - Inventory data
   * @returns {Promise<any>} Created inventory
   */
  async createInventory(data) {
    return this.request({
      method: 'POST',
      url: '/inventory',
      data,
    });
  }

  /**
   * Gets inventory by product ID
   * @param {string} productId - Product ID
   * @returns {Promise<any>} Inventory data
   */
  async getInventoryByProduct(productId) {
    return this.request({
      method: 'GET',
      url: `/inventory/product/${productId}`,
    });
  }

  /**
   * Checks inventory availability
   * @param {Object} data - Availability check data
   * @returns {Promise<any>} Availability result
   */
  async checkInventoryAvailability(data) {
    return this.request({
      method: 'POST',
      url: '/inventory/check-availability',
      data,
    });
  }

  /**
   * Reserves inventory
   * @param {Object} data - Reservation data
   * @returns {Promise<any>} Reservation result
   */
  async reserveInventory(data) {
    return this.request({
      method: 'POST',
      url: '/inventory/reserve',
      data,
    });
  }

  /**
   * Gets inventory by ID
   * @param {string} id - Inventory ID
   * @returns {Promise<any>} Inventory data
   */
  async getInventory(id) {
    return this.request({
      method: 'GET',
      url: `/inventory/${id}`,
    });
  }

  /**
   * Lists inventory records
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Inventory list
   */
  async listInventory(params) {
    return this.request({
      method: 'GET',
      url: '/inventory',
      params,
    });
  }

  /**
   * Updates inventory
   * @param {string} id - Inventory ID
   * @param {Object} data - Updated inventory data
   * @returns {Promise<any>} Updated inventory
   */
  async updateInventory(id, data) {
    return this.request({
      method: 'PUT',
      url: `/inventory/${id}`,
      data,
    });
  }

  // ==================== MEDIA API METHODS ====================

  /**
   * Uploads media file
   * @param {Object} data - Media upload data
   * @returns {Promise<any>} Uploaded media
   */
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

  /**
   * Gets media by ID
   * @param {string} id - Media ID
   * @returns {Promise<any>} Media data
   */
  async getMedia(id) {
    return this.request({
      method: 'GET',
      url: `/media/${id}`,
    });
  }

  /**
   * Lists media files
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Media list
   */
  async listMedia(params) {
    return this.request({
      method: 'GET',
      url: '/media',
      params,
    });
  }

  /**
   * Updates media metadata
   * @param {string} id - Media ID
   * @param {Object} data - Updated media data
   * @returns {Promise<any>} Updated media
   */
  async updateMedia(id, data) {
    return this.request({
      method: 'PUT',
      url: `/media/${id}`,
      data,
    });
  }

  /**
   * Deletes media file
   * @param {string} id - Media ID
   * @returns {Promise<any>} Deletion result
   */
  async deleteMedia(id) {
    return this.request({
      method: 'DELETE',
      url: `/media/${id}`,
    });
  }

  // ==================== PARTNER API METHODS ====================

  /**
   * Creates a new partner
   * @param {Object} data - Partner data
   * @returns {Promise<any>} Created partner
   */
  async createPartner(data) {
    return this.request({
      method: 'POST',
      url: '/partners',
      data,
    });
  }

  /**
   * Gets a partner by ID
   * @param {string} id - Partner ID
   * @returns {Promise<any>} Partner data
   */
  async getPartner(id) {
    return this.request({
      method: 'GET',
      url: `/partners/${id}`,
    });
  }

  /**
   * Lists all partners
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Partners list
   */
  async listPartners(params) {
    return this.request({
      method: 'GET',
      url: '/partners',
      params,
    });
  }

  // ==================== SALES CHANNEL API METHODS ====================

  /**
   * Creates a new sales channel
   * @param {Object} data - Sales channel data
   * @returns {Promise<any>} Created sales channel
   */
  async createSalesChannel(data) {
    return this.request({
      method: 'POST',
      url: '/sales-channels',
      data,
    });
  }

  /**
   * Gets a sales channel by ID
   * @param {string} id - Sales channel ID
   * @returns {Promise<any>} Sales channel data
   */
  async getSalesChannel(id) {
    return this.request({
      method: 'GET',
      url: `/sales-channels/${id}`,
    });
  }

  /**
   * Gets a sales channel by code
   * @param {string} code - Sales channel code
   * @returns {Promise<any>} Sales channel data
   */
  async getSalesChannelByCode(code) {
    return this.request({
      method: 'GET',
      url: `/sales-channels/code/${code}`,
    });
  }

  /**
   * Lists all sales channels
   * @param {Object} params - Query parameters
   * @returns {Promise<any>} Sales channels list
   */
  async listSalesChannels(params) {
    return this.request({
      method: 'GET',
      url: '/sales-channels',
      params,
    });
  }

  /**
   * Updates a sales channel
   * @param {string} id - Sales channel ID
   * @param {Object} data - Updated sales channel data
   * @returns {Promise<any>} Updated sales channel
   */
  async updateSalesChannel(id, data) {
    return this.request({
      method: 'PUT',
      url: `/sales-channels/${id}`,
      data,
    });
  }

  /**
   * Deletes a sales channel
   * @param {string} id - Sales channel ID
   * @returns {Promise<any>} Deletion result
   */
  async deleteSalesChannel(id) {
    return this.request({
      method: 'DELETE',
      url: `/sales-channels/${id}`,
    });
  }

  /**
   * Activates a sales channel
   * @param {string} id - Sales channel ID
   * @returns {Promise<any>} Activated sales channel
   */
  async activateSalesChannel(id) {
    return this.request({
      method: 'POST',
      url: `/sales-channels/${id}/activate`,
    });
  }

  /**
   * Deactivates a sales channel
   * @param {string} id - Sales channel ID
   * @returns {Promise<any>} Deactivated sales channel
   */
  async deactivateSalesChannel(id) {
    return this.request({
      method: 'POST',
      url: `/sales-channels/${id}/deactivate`,
    });
  }

  /**
   * Gets sales channel statistics
   * @param {string} id - Sales channel ID
   * @returns {Promise<any>} Channel statistics
   */
  async getSalesChannelStatistics(id) {
    return this.request({
      method: 'GET',
      url: `/sales-channels/${id}/statistics`,
    });
  }

  // ==================== TRANSLATION API METHODS ====================

  /**
   * Creates a translation
   * @param {Object} data - Translation data
   * @returns {Promise<any>} Created translation
   */
  async createTranslation(data) {
    return this.request({
      method: 'POST',
      url: '/translations',
      data,
    });
  }

  /**
   * Gets a translation
   * @param {string} entityId - Entity ID
   * @param {string} languageCode - Language code
   * @returns {Promise<any>} Translation data
   */
  async getTranslation(entityId, languageCode) {
    return this.request({
      method: 'GET',
      url: `/translations/${entityId}/${languageCode}`,
    });
  }

  /**
   * Gets supported languages
   * @returns {Promise<any>} Supported languages
   */
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

  // ==================== ATTRIBUTE API METHODS ====================

  async createAttribute(data) {
    return this.request({
      method: 'POST',
      url: '/attributes',
      data,
    });
  }

  async getAttribute(id) {
    return this.request({
      method: 'GET',
      url: `/attributes/${id}`,
    });
  }

  async listAttributes(params) {
    return this.request({
      method: 'GET',
      url: '/attributes',
      params,
    });
  }

  async createAttributeValue(attributeId, data) {
    return this.request({
      method: 'POST',
      url: `/attributes/${attributeId}/values`,
      data,
    });
  }

  async getAttributeValues(attributeId) {
    return this.request({
      method: 'GET',
      url: `/attributes/${attributeId}/values`,
    });
  }

  async getAttributeByName(name) {
    return this.request({
      method: 'GET',
      url: `/attributes/name/${name}`,
    });
  }

  async updateAttribute(id, data) {
    return this.request({
      method: 'PUT',
      url: `/attributes/${id}`,
      data,
    });
  }

  async deleteAttribute(id) {
    return this.request({
      method: 'DELETE',
      url: `/attributes/${id}`,
    });
  }

  async updateAttributeValue(attributeId, valueId, data) {
    return this.request({
      method: 'PUT',
      url: `/attributes/${attributeId}/values/${valueId}`,
      data,
    });
  }

  async deleteAttributeValue(attributeId, valueId) {
    return this.request({
      method: 'DELETE',
      url: `/attributes/${attributeId}/values/${valueId}`,
    });
  }

  async bulkCreateAttributeValues(attributeId, values) {
    return this.request({
      method: 'POST',
      url: `/attributes/${attributeId}/values/bulk`,
      data: { values },
    });
  }

  async getAttributeUsage(id) {
    return this.request({
      method: 'GET',
      url: `/attributes/${id}/usage`,
    });
  }

  // ==================== SYSTEM API METHODS ====================

  /**
   * Performs health check
   * @returns {Promise<any>} Health status
   */
  async healthCheck() {
    return this.request({
      method: 'GET',
      url: '/health',
    });
  }

  /**
   * Gets system health status
   * @returns {Promise<any>} Health status
   */
  async getSystemHealth() {
    return this.request({
      method: 'GET',
      url: '/health',
    });
  }

  /**
   * Gets system information
   * @returns {Promise<any>} System info
   */
  async getSystemInfo() {
    return this.request({
      method: 'GET',
      url: '/system/info',
    });
  }
}