import { SunEcommerceApiClient } from '../client/api-client.js';

export class ToolHandler {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async handleTool(name, args) {
    switch (name) {
      // Product Management
      case 'create_product':
        return this.createProduct(args);
      case 'search_products':
        return this.searchProducts(args);
      case 'get_product':
        return this.getProduct(args);
      case 'update_product':
        return this.updateProduct(args);
      case 'delete_product':
        return this.deleteProduct(args);
      case 'get_product_by_handle':
        return this.getProductByHandle(args);

      // Category Management
      case 'create_category':
        return this.createCategory(args);
      case 'list_categories':
        return this.listCategories(args);
      case 'get_category':
        return this.getCategory(args);
      case 'update_category':
        return this.updateCategory(args);
      case 'delete_category':
        return this.deleteCategory(args);

      // Pricing Rules
      case 'create_pricing_rule':
        return this.createPricingRule(args);
      case 'get_pricing_rule':
        return this.getPricingRule(args);
      case 'update_pricing_rule':
        return this.updatePricingRule(args);
      case 'delete_pricing_rule':
        return this.deletePricingRule(args);
      case 'apply_pricing_rules':
        return this.applyPricingRules(args);
      case 'list_pricing_rules':
        return this.listPricingRules(args);
      case 'validate_pricing_rule':
        return this.validatePricingRule(args);

      // Cart Management
      case 'create_cart':
        return this.createCart(args);
      case 'add_cart_item':
        return this.addCartItem(args);
      case 'update_cart_item':
        return this.updateCartItem(args);
      case 'remove_cart_item':
        return this.removeCartItem(args);
      case 'get_cart':
        return this.getCart(args);
      case 'get_cart_summary':
        return this.getCartSummary(args);
      case 'get_cart_items':
        return this.getCartItems(args);
      case 'clear_cart':
        return this.clearCart(args);

      // Inventory Management
      case 'create_inventory':
        return this.createInventory(args);
      case 'get_inventory_by_product':
        return this.getInventoryByProduct(args);
      case 'check_inventory_availability':
        return this.checkInventoryAvailability(args);
      case 'reserve_inventory':
        return this.reserveInventory(args);
      case 'get_inventory':
        return this.getInventory(args);
      case 'list_inventory':
        return this.listInventory(args);
      case 'update_inventory':
        return this.updateInventory(args);

      // Media Management
      case 'upload_media':
        return this.uploadMedia(args);
      case 'get_media':
        return this.getMedia(args);
      case 'list_media':
        return this.listMedia(args);
      case 'update_media':
        return this.updateMedia(args);
      case 'delete_media':
        return this.deleteMedia(args);

      // Partner Management
      case 'create_partner':
        return this.createPartner(args);
      case 'get_partner':
        return this.getPartner(args);
      case 'list_partners':
        return this.listPartners(args);

      // Sales Channel Management
      case 'create_sales_channel':
        return this.createSalesChannel(args);
      case 'get_sales_channel':
        return this.getSalesChannel(args);
      case 'get_sales_channel_by_code':
        return this.getSalesChannelByCode(args);
      case 'list_sales_channels':
        return this.listSalesChannels(args);
      case 'update_sales_channel':
        return this.updateSalesChannel(args);
      case 'delete_sales_channel':
        return this.deleteSalesChannel(args);
      case 'activate_sales_channel':
        return this.activateSalesChannel(args);
      case 'deactivate_sales_channel':
        return this.deactivateSalesChannel(args);
      case 'get_sales_channel_statistics':
        return this.getSalesChannelStatistics(args);

      // Translation Management
      case 'create_translation':
        return this.createTranslation(args);
      case 'get_translation':
        return this.getTranslation(args);
      case 'get_supported_languages':
        return this.getSupportedLanguages(args);

      // Product Translation
      case 'create_product_translation':
        return this.createProductTranslation(args);
      case 'get_product_translation':
        return this.getProductTranslation(args);
      case 'update_product_translation':
        return this.updateProductTranslation(args);
      case 'delete_product_translation':
        return this.deleteProductTranslation(args);
      case 'list_product_translations':
        return this.listProductTranslations(args);

      // Category Translation
      case 'create_category_translation':
        return this.createCategoryTranslation(args);
      case 'get_category_translation':
        return this.getCategoryTranslation(args);
      case 'update_category_translation':
        return this.updateCategoryTranslation(args);
      case 'delete_category_translation':
        return this.deleteCategoryTranslation(args);
      case 'list_category_translations':
        return this.listCategoryTranslations(args);

      // Product Attribute Translation
      case 'create_product_attribute_translation':
        return this.createProductAttributeTranslation(args);
      case 'get_product_attribute_translation':
        return this.getProductAttributeTranslation(args);
      case 'update_product_attribute_translation':
        return this.updateProductAttributeTranslation(args);
      case 'delete_product_attribute_translation':
        return this.deleteProductAttributeTranslation(args);
      case 'list_product_attribute_translations':
        return this.listProductAttributeTranslations(args);

      // Product Variant Translation
      case 'create_product_variant_translation':
        return this.createProductVariantTranslation(args);
      case 'get_product_variant_translation':
        return this.getProductVariantTranslation(args);
      case 'update_product_variant_translation':
        return this.updateProductVariantTranslation(args);
      case 'delete_product_variant_translation':
        return this.deleteProductVariantTranslation(args);
      case 'list_product_variant_translations':
        return this.listProductVariantTranslations(args);

      // Bulk Translation
      case 'bulk_create_translations':
        return this.bulkCreateTranslations(args);
      case 'bulk_delete_translations':
        return this.bulkDeleteTranslations(args);
      case 'get_translation_stats':
        return this.getTranslationStats(args);

      // Attribute Management
      case 'create_attribute':
        return this.createAttribute(args);
      case 'get_attribute':
        return this.getAttribute(args);
      case 'list_attributes':
        return this.listAttributes(args);
      case 'create_attribute_value':
        return this.createAttributeValue(args);
      case 'get_attribute_values':
        return this.getAttributeValues(args);
      case 'get_attribute_by_name':
        return this.getAttributeByName(args);
      case 'update_attribute':
        return this.updateAttribute(args);
      case 'delete_attribute':
        return this.deleteAttribute(args);
      case 'update_attribute_value':
        return this.updateAttributeValue(args);
      case 'delete_attribute_value':
        return this.deleteAttributeValue(args);

      // System
      case 'health_check':
        return this.healthCheck(args);
      case 'get_system_health':
        return this.getSystemHealth(args);
      case 'get_system_info':
        return this.getSystemInfo(args);

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  // Product Management Methods
  async createProduct(args) {
    try {
      const response = await this.apiClient.createProduct(args);
      return {
        success: true,
        data: response.data,
        message: 'Product created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create product'
      };
    }
  }

  async searchProducts(args) {
    try {
      const response = await this.apiClient.searchProducts(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Products retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to search products'
      };
    }
  }

  async getProduct(args) {
    try {
      const { id, includeVariants = true, includeInventory = true, includePricing = true } = args;
      const response = await this.apiClient.getProduct(id, {
        includeVariants,
        includeInventory,
        includePricing
      });
      return {
        success: true,
        data: response.data,
        message: 'Product retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get product'
      };
    }
  }

  async updateProduct(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updateProduct(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Product updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update product'
      };
    }
  }

  async deleteProduct(args) {
    try {
      const { id } = args;
      await this.apiClient.deleteProduct(id);
      return {
        success: true,
        message: 'Product deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete product'
      };
    }
  }

  async getProductByHandle(args) {
    try {
      const { handle } = args;
      const response = await this.apiClient.getProductByHandle(handle);
      return {
        success: true,
        data: response.data,
        message: 'Product retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get product by handle'
      };
    }
  }

  // Category Management Methods
  async createCategory(args) {
    try {
      const response = await this.apiClient.createCategory(args);
      return {
        success: true,
        data: response.data,
        message: 'Category created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create category'
      };
    }
  }

  async listCategories(args) {
    try {
      const { tree = false, page = 1, pageSize = 50 } = args;
      if (tree) {
        const response = await this.apiClient.getCategoryTree();
        return {
          success: true,
          data: response.data,
          message: 'Category tree retrieved successfully'
        };
      } else {
        const response = await this.apiClient.listCategories({ page, pageSize });
        return {
          success: true,
          data: response.data,
          pagination: response.pagination,
          message: 'Categories retrieved successfully'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list categories'
      };
    }
  }

  async getCategory(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getCategory(id);
      return {
        success: true,
        data: response.data,
        message: 'Category retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get category'
      };
    }
  }

  async updateCategory(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updateCategory(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Category updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update category'
      };
    }
  }

  async deleteCategory(args) {
    try {
      const { id } = args;
      await this.apiClient.deleteCategory(id);
      return {
        success: true,
        message: 'Category deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete category'
      };
    }
  }

  // Pricing Rules Methods
  async createPricingRule(args) {
    try {
      const response = await this.apiClient.createPricingRule(args);
      return {
        success: true,
        data: response.data,
        message: 'Pricing rule created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create pricing rule'
      };
    }
  }

  async getPricingRule(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getPricingRule(id);
      return {
        success: true,
        data: response.data,
        message: 'Pricing rule retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get pricing rule'
      };
    }
  }

  async updatePricingRule(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updatePricingRule(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Pricing rule updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update pricing rule'
      };
    }
  }

  async deletePricingRule(args) {
    try {
      const { id } = args;
      await this.apiClient.deletePricingRule(id);
      return {
        success: true,
        message: 'Pricing rule deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete pricing rule'
      };
    }
  }

  async applyPricingRules(args) {
    try {
      const response = await this.apiClient.applyPricingRules(args);
      return {
        success: true,
        data: response.data,
        message: 'Pricing rules applied successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to apply pricing rules'
      };
    }
  }

  async listPricingRules(args) {
    try {
      const response = await this.apiClient.getPricingRules(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Pricing rules retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list pricing rules'
      };
    }
  }

  async validatePricingRule(args) {
    try {
      const response = await this.apiClient.validatePricingRule(args);
      return {
        success: true,
        data: response.data,
        message: 'Pricing rule validation completed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to validate pricing rule'
      };
    }
  }

  // Cart Management Methods
  async createCart(args) {
    try {
      const response = await this.apiClient.createCart(args);
      return {
        success: true,
        data: response.data,
        message: 'Cart created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create cart'
      };
    }
  }

  async addCartItem(args) {
    try {
      const response = await this.apiClient.addCartItem(args);
      return {
        success: true,
        data: response.data,
        message: 'Item added to cart successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to add item to cart'
      };
    }
  }

  async updateCartItem(args) {
    try {
      const response = await this.apiClient.updateCartItem(args);
      return {
        success: true,
        data: response.data,
        message: 'Cart item updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update cart item'
      };
    }
  }

  async removeCartItem(args) {
    try {
      const { cartId, itemId } = args;
      await this.apiClient.removeCartItem(cartId, itemId);
      return {
        success: true,
        message: 'Item removed from cart successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to remove cart item'
      };
    }
  }

  async getCart(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getCart(id);
      return {
        success: true,
        data: response.data,
        message: 'Cart retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get cart'
      };
    }
  }

  async getCartSummary(args) {
    try {
      const { cartId } = args;
      const response = await this.apiClient.getCartSummary(cartId);
      return {
        success: true,
        data: response.data,
        message: 'Cart summary retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get cart summary'
      };
    }
  }

  async getCartItems(args) {
    try {
      const { cartId, page = 1, pageSize = 20 } = args;
      const response = await this.apiClient.getCartItems(cartId, { page, pageSize });
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Cart items retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get cart items'
      };
    }
  }

  async clearCart(args) {
    try {
      const { cartId } = args;
      await this.apiClient.clearCart(cartId);
      return {
        success: true,
        message: 'Cart cleared successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to clear cart'
      };
    }
  }

  // Inventory Management Methods
  async createInventory(args) {
    try {
      const response = await this.apiClient.createInventory(args);
      return {
        success: true,
        data: response.data,
        message: 'Inventory created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create inventory'
      };
    }
  }

  async getInventoryByProduct(args) {
    try {
      const response = await this.apiClient.getInventoryByProduct(args);
      return {
        success: true,
        data: response.data,
        message: 'Inventory retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get inventory by product'
      };
    }
  }

  async checkInventoryAvailability(args) {
    try {
      const response = await this.apiClient.checkInventoryAvailability(args);
      return {
        success: true,
        data: response.data,
        message: 'Inventory availability checked successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to check inventory availability'
      };
    }
  }

  async reserveInventory(args) {
    try {
      const response = await this.apiClient.reserveInventory(args);
      return {
        success: true,
        data: response.data,
        message: 'Inventory reserved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to reserve inventory'
      };
    }
  }

  async getInventory(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getInventory(id);
      return {
        success: true,
        data: response.data,
        message: 'Inventory retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get inventory'
      };
    }
  }

  async listInventory(args) {
    try {
      const response = await this.apiClient.getInventoryList(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Inventory list retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list inventory'
      };
    }
  }

  async updateInventory(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updateInventory(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Inventory updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update inventory'
      };
    }
  }

  // Media Management Methods
  async uploadMedia(args) {
    try {
      const response = await this.apiClient.uploadMedia(args);
      return {
        success: true,
        data: response.data,
        message: 'Media uploaded successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to upload media'
      };
    }
  }

  async getMedia(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getMedia(id);
      return {
        success: true,
        data: response.data,
        message: 'Media retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get media'
      };
    }
  }

  async listMedia(args) {
    try {
      const response = await this.apiClient.getMediaList(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Media list retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list media'
      };
    }
  }

  async updateMedia(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updateMedia(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Media updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update media'
      };
    }
  }

  async deleteMedia(args) {
    try {
      const { id } = args;
      await this.apiClient.deleteMedia(id);
      return {
        success: true,
        message: 'Media deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete media'
      };
    }
  }

  // Partner Management Methods
  async createPartner(args) {
    try {
      const response = await this.apiClient.createPartner(args);
      return {
        success: true,
        data: response.data,
        message: 'Partner created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create partner'
      };
    }
  }

  async getPartner(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getPartner(id);
      return {
        success: true,
        data: response.data,
        message: 'Partner retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get partner'
      };
    }
  }

  async listPartners(args) {
    try {
      const response = await this.apiClient.getPartners(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Partners retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list partners'
      };
    }
  }

  // Sales Channel Management Methods
  async createSalesChannel(args) {
    try {
      const response = await this.apiClient.createSalesChannel(args);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create sales channel'
      };
    }
  }

  async getSalesChannel(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getSalesChannel(id);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get sales channel'
      };
    }
  }

  async getSalesChannelByCode(args) {
    try {
      const { code } = args;
      const response = await this.apiClient.getSalesChannelByCode(code);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get sales channel by code'
      };
    }
  }

  async listSalesChannels(args) {
    try {
      const response = await this.apiClient.getSalesChannels(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Sales channels retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list sales channels'
      };
    }
  }

  async updateSalesChannel(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updateSalesChannel(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update sales channel'
      };
    }
  }

  async deleteSalesChannel(args) {
    try {
      const { id } = args;
      await this.apiClient.deleteSalesChannel(id);
      return {
        success: true,
        message: 'Sales channel deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete sales channel'
      };
    }
  }

  async activateSalesChannel(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.activateSalesChannel(id);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel activated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to activate sales channel'
      };
    }
  }

  async deactivateSalesChannel(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.deactivateSalesChannel(id);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel deactivated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to deactivate sales channel'
      };
    }
  }

  async getSalesChannelStatistics(args) {
    try {
      const response = await this.apiClient.getSalesChannelStatistics(args);
      return {
        success: true,
        data: response.data,
        message: 'Sales channel statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get sales channel statistics'
      };
    }
  }

  // Translation Management Methods
  async createTranslation(args) {
    try {
      const response = await this.apiClient.createTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Translation created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create translation'
      };
    }
  }

  async getTranslation(args) {
    try {
      const response = await this.apiClient.getTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Translation retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get translation'
      };
    }
  }

  async getSupportedLanguages(args) {
    try {
      const response = await this.apiClient.getSupportedLanguages();
      return {
        success: true,
        data: response.data,
        message: 'Supported languages retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get supported languages'
      };
    }
  }

  // Product Translation Methods
  async createProductTranslation(args) {
    try {
      const response = await this.apiClient.createProductTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product translation created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create product translation'
      };
    }
  }

  async getProductTranslation(args) {
    try {
      const response = await this.apiClient.getProductTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product translation retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get product translation'
      };
    }
  }

  async updateProductTranslation(args) {
    try {
      const response = await this.apiClient.updateProductTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product translation updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update product translation'
      };
    }
  }

  async deleteProductTranslation(args) {
    try {
      const { productId, language } = args;
      await this.apiClient.deleteProductTranslation(productId, language);
      return {
        success: true,
        message: 'Product translation deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete product translation'
      };
    }
  }

  async listProductTranslations(args) {
    try {
      const { productId } = args;
      const response = await this.apiClient.getProductTranslations(productId);
      return {
        success: true,
        data: response.data,
        message: 'Product translations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list product translations'
      };
    }
  }

  // Category Translation Methods
  async createCategoryTranslation(args) {
    try {
      const response = await this.apiClient.createCategoryTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Category translation created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create category translation'
      };
    }
  }

  async getCategoryTranslation(args) {
    try {
      const response = await this.apiClient.getCategoryTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Category translation retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get category translation'
      };
    }
  }

  async updateCategoryTranslation(args) {
    try {
      const response = await this.apiClient.updateCategoryTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Category translation updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update category translation'
      };
    }
  }

  async deleteCategoryTranslation(args) {
    try {
      const { categoryId, language } = args;
      await this.apiClient.deleteCategoryTranslation(categoryId, language);
      return {
        success: true,
        message: 'Category translation deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete category translation'
      };
    }
  }

  async listCategoryTranslations(args) {
    try {
      const { categoryId } = args;
      const response = await this.apiClient.getCategoryTranslations(categoryId);
      return {
        success: true,
        data: response.data,
        message: 'Category translations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list category translations'
      };
    }
  }

  // Product Attribute Translation Methods
  async createProductAttributeTranslation(args) {
    try {
      const response = await this.apiClient.createProductAttributeTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product attribute translation created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create product attribute translation'
      };
    }
  }

  async getProductAttributeTranslation(args) {
    try {
      const response = await this.apiClient.getProductAttributeTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product attribute translation retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get product attribute translation'
      };
    }
  }

  async updateProductAttributeTranslation(args) {
    try {
      const response = await this.apiClient.updateProductAttributeTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product attribute translation updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update product attribute translation'
      };
    }
  }

  async deleteProductAttributeTranslation(args) {
    try {
      const { attributeId, language } = args;
      await this.apiClient.deleteProductAttributeTranslation(attributeId, language);
      return {
        success: true,
        message: 'Product attribute translation deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete product attribute translation'
      };
    }
  }

  async listProductAttributeTranslations(args) {
    try {
      const { attributeId } = args;
      const response = await this.apiClient.getProductAttributeTranslations(attributeId);
      return {
        success: true,
        data: response.data,
        message: 'Product attribute translations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list product attribute translations'
      };
    }
  }

  // Product Variant Translation Methods
  async createProductVariantTranslation(args) {
    try {
      const response = await this.apiClient.createProductVariantTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product variant translation created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create product variant translation'
      };
    }
  }

  async getProductVariantTranslation(args) {
    try {
      const response = await this.apiClient.getProductVariantTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product variant translation retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get product variant translation'
      };
    }
  }

  async updateProductVariantTranslation(args) {
    try {
      const response = await this.apiClient.updateProductVariantTranslation(args);
      return {
        success: true,
        data: response.data,
        message: 'Product variant translation updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update product variant translation'
      };
    }
  }

  async deleteProductVariantTranslation(args) {
    try {
      const { variantId, language } = args;
      await this.apiClient.deleteProductVariantTranslation(variantId, language);
      return {
        success: true,
        message: 'Product variant translation deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete product variant translation'
      };
    }
  }

  async listProductVariantTranslations(args) {
    try {
      const { variantId } = args;
      const response = await this.apiClient.getProductVariantTranslations(variantId);
      return {
        success: true,
        data: response.data,
        message: 'Product variant translations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list product variant translations'
      };
    }
  }

  // Bulk Translation Methods
  async bulkCreateTranslations(args) {
    try {
      const response = await this.apiClient.bulkCreateTranslations(args);
      return {
        success: true,
        data: response.data,
        message: 'Bulk translations created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create bulk translations'
      };
    }
  }

  async bulkDeleteTranslations(args) {
    try {
      const response = await this.apiClient.bulkDeleteTranslations(args);
      return {
        success: true,
        data: response.data,
        message: 'Bulk translations deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete bulk translations'
      };
    }
  }

  async getTranslationStats(args) {
    try {
      const response = await this.apiClient.getTranslationStats(args);
      return {
        success: true,
        data: response.data,
        message: 'Translation statistics retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get translation statistics'
      };
    }
  }

  // Attribute Management Methods
  async createAttribute(args) {
    try {
      const response = await this.apiClient.createAttribute(args);
      return {
        success: true,
        data: response.data,
        message: 'Attribute created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create attribute'
      };
    }
  }

  async getAttribute(args) {
    try {
      const { id } = args;
      const response = await this.apiClient.getAttribute(id);
      return {
        success: true,
        data: response.data,
        message: 'Attribute retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get attribute'
      };
    }
  }

  async listAttributes(args) {
    try {
      const response = await this.apiClient.getAttributes(args);
      return {
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: 'Attributes retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to list attributes'
      };
    }
  }

  async createAttributeValue(args) {
    try {
      const response = await this.apiClient.createAttributeValue(args);
      return {
        success: true,
        data: response.data,
        message: 'Attribute value created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create attribute value'
      };
    }
  }

  async getAttributeValues(args) {
    try {
      const { attributeId } = args;
      const response = await this.apiClient.getAttributeValues(attributeId);
      return {
        success: true,
        data: response.data,
        message: 'Attribute values retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get attribute values'
      };
    }
  }

  async getAttributeByName(args) {
    try {
      const { name } = args;
      const response = await this.apiClient.getAttributeByName(name);
      return {
        success: true,
        data: response.data,
        message: 'Attribute retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get attribute by name'
      };
    }
  }

  async updateAttribute(args) {
    try {
      const { id, ...updateData } = args;
      const response = await this.apiClient.updateAttribute(id, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Attribute updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update attribute'
      };
    }
  }

  async deleteAttribute(args) {
    try {
      const { id } = args;
      await this.apiClient.deleteAttribute(id);
      return {
        success: true,
        message: 'Attribute deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete attribute'
      };
    }
  }

  async updateAttributeValue(args) {
    try {
      const response = await this.apiClient.updateAttributeValue(args);
      return {
        success: true,
        data: response.data,
        message: 'Attribute value updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update attribute value'
      };
    }
  }

  async deleteAttributeValue(args) {
    try {
      const { attributeId, valueId } = args;
      await this.apiClient.deleteAttributeValue(attributeId, valueId);
      return {
        success: true,
        message: 'Attribute value deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete attribute value'
      };
    }
  }

  // System Methods
  async healthCheck(args) {
    try {
      const response = await this.apiClient.getSystemHealth();
      return {
        success: true,
        data: response.data,
        message: 'Health check completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Health check failed'
      };
    }
  }

  async getSystemHealth(args) {
    try {
      const response = await this.apiClient.getSystemHealth();
      return {
        success: true,
        data: response.data,
        message: 'System health retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get system health'
      };
    }
  }

  async getSystemInfo(args) {
    try {
      const response = await this.apiClient.getSystemInfo();
      return {
        success: true,
        data: response.data,
        message: 'System information retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get system information'
      };
    }
  }
}