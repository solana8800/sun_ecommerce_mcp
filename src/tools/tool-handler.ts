import { SunEcommerceApiClient } from '../client/api-client.js';
import {
  CreateProductSchema,
  SearchProductsParamsSchema,
  GetProductParamsSchema,
  CreateCategorySchema,
  CreatePricingRuleSchema,
  ApplyPricingRuleParamsSchema,
  CreateCartParamsSchema,
  AddCartItemSchema,
  CreateInventorySchema,
  UploadMediaSchema,
} from '../types/index.js';

export class ToolHandler {
  constructor(private apiClient: SunEcommerceApiClient) {}

  async handleTool(name: string, args: Record<string, any>): Promise<any> {
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

      // Category Management
      case 'create_category':
        return this.createCategory(args);
      case 'list_categories':
        return this.listCategories(args);
      case 'get_category':
        return this.getCategory(args);

      // Pricing Rules
      case 'create_pricing_rule':
        return this.createPricingRule(args);
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
      case 'get_cart':
        return this.getCart(args);
      case 'get_cart_summary':
        return this.getCartSummary(args);

      // Inventory Management
      case 'check_inventory':
        return this.checkInventory(args);
      case 'reserve_inventory':
        return this.reserveInventory(args);
      case 'get_inventory':
        return this.getInventory(args);

      // Media Management
      case 'upload_media':
        return this.uploadMedia(args);
      case 'list_media':
        return this.listMedia(args);

      // System
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

      // Enhanced Pricing Rules
      case 'get_pricing_rule_by_name':
        return this.getPricingRuleByName(args);
      case 'update_pricing_rule_status':
        return this.updatePricingRuleStatus(args);
      case 'get_active_pricing_rules':
        return this.getActivePricingRules(args);
      case 'bulk_calculate_price':
        return this.bulkCalculatePrice(args);
      case 'get_pricing_rules_by_priority':
        return this.getPricingRulesByPriority(args);
      case 'bulk_update_pricing_rule_status':
        return this.bulkUpdatePricingRuleStatus(args);
      case 'get_pricing_rule_stats':
        return this.getPricingRuleStats(args);
      case 'duplicate_pricing_rule':
        return this.duplicatePricingRule(args);

      // Enhanced Product Attributes
      case 'update_attribute_value':
        return this.updateAttributeValue(args);
      case 'delete_attribute_value':
        return this.deleteAttributeValue(args);
      case 'bulk_create_attribute_values':
        return this.bulkCreateAttributeValues(args);
      case 'get_attribute_usage':
        return this.getAttributeUsage(args);

      // Translation Management
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
      case 'bulk_create_translations':
        return this.bulkCreateTranslations(args);
      case 'bulk_delete_translations':
        return this.bulkDeleteTranslations(args);
      case 'get_translation_stats':
        return this.getTranslationStats(args);

      case 'health_check':
        return this.healthCheck();
      case 'get_system_info':
        return this.getSystemInfo();
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  // Product Management Methods
  private async createProduct(args: Record<string, any>): Promise<any> {
    const validatedArgs = CreateProductSchema.parse(args);
    const result = await this.apiClient.createProduct(validatedArgs);
    
    return {
      success: true,
      message: 'Product created successfully',
      data: result,
      nextSteps: [
        'Add product images using upload_media tool',
        'Set up inventory using check_inventory tool',
        'Configure pricing rules if needed',
        'Add product to categories',
      ],
    };
  }

  private async searchProducts(args: Record<string, any>): Promise<any> {
    const validatedArgs = SearchProductsParamsSchema.parse(args);
    const result = await this.apiClient.searchProducts(validatedArgs);
    
    return {
      success: true,
      message: `Found ${result.total || 0} products`,
      data: result,
      searchTips: [
        'Use specific keywords for better results',
        'Filter by category or product type',
        'Use price range filters for targeted searches',
      ],
    };
  }

  private async getProduct(args: Record<string, any>): Promise<any> {
    const validatedArgs = GetProductParamsSchema.parse(args);
    const result = await this.apiClient.getProduct(validatedArgs.id, {
      include_variants: validatedArgs.includeVariants,
      include_inventory: validatedArgs.includeInventory,
      include_pricing: validatedArgs.includePricing,
    });
    
    return {
      success: true,
      message: 'Product retrieved successfully',
      data: result,
      availableActions: [
        'Update product details',
        'Manage inventory',
        'Set pricing rules',
        'Upload media',
        'Add translations',
      ],
    };
  }

  private async updateProduct(args: Record<string, any>): Promise<any> {
    const { id, ...updateData } = args;
    if (!id) {
      throw new Error('Product ID is required');
    }
    
    const result = await this.apiClient.updateProduct(id, updateData);
    
    return {
      success: true,
      message: 'Product updated successfully',
      data: result,
    };
  }

  // Category Management Methods
  private async createCategory(args: Record<string, any>): Promise<any> {
    const validatedArgs = CreateCategorySchema.parse(args);
    const result = await this.apiClient.createCategory(validatedArgs);
    
    return {
      success: true,
      message: 'Category created successfully',
      data: result,
      nextSteps: [
        'Add products to this category',
        'Create subcategories if needed',
        'Set up category-specific attributes',
        'Configure SEO settings',
      ],
    };
  }

  private async listCategories(args: Record<string, any>): Promise<any> {
    if (args.tree) {
      const result = await this.apiClient.getCategoryTree();
      return {
        success: true,
        message: 'Category tree retrieved successfully',
        data: result,
        structure: 'hierarchical',
      };
    } else {
      const result = await this.apiClient.listCategories({
        page: args.page || 1,
        page_size: args.pageSize || 50,
      });
      return {
        success: true,
        message: 'Categories listed successfully',
        data: result,
        structure: 'flat',
      };
    }
  }

  private async getCategory(args: Record<string, any>): Promise<any> {
    const { id } = args;
    if (!id) {
      throw new Error('Category ID is required');
    }
    
    const result = await this.apiClient.getCategory(id);
    
    return {
      success: true,
      message: 'Category retrieved successfully',
      data: result,
    };
  }

  // Pricing Rules Methods
  private async createPricingRule(args: Record<string, any>): Promise<any> {
    const validatedArgs = CreatePricingRuleSchema.parse(args);
    const result = await this.apiClient.createPricingRule(validatedArgs);
    
    return {
      success: true,
      message: 'Pricing rule created successfully',
      data: result,
      ruleInfo: {
        type: validatedArgs.ruleType,
        discountValue: validatedArgs.discountValue,
        validPeriod: `${validatedArgs.validFrom} to ${validatedArgs.validTo || 'indefinite'}`,
      },
      nextSteps: [
        'Test the rule with apply_pricing_rules',
        'Monitor rule usage and effectiveness',
        'Adjust priority if needed',
      ],
    };
  }

  private async applyPricingRules(args: Record<string, any>): Promise<any> {
    const validatedArgs = ApplyPricingRuleParamsSchema.parse(args);
    const result = await this.apiClient.applyPricingRules(validatedArgs);
    
    return {
      success: true,
      message: 'Pricing rules applied successfully',
      data: result,
      calculation: {
        originalPrice: validatedArgs.basePrice,
        quantity: validatedArgs.quantity,
        totalOriginal: validatedArgs.basePrice * validatedArgs.quantity,
        finalPrice: result.finalPrice || result.data?.finalPrice,
        savings: result.discountAmount || result.data?.discountAmount,
      },
    };
  }

  private async listPricingRules(args: Record<string, any>): Promise<any> {
    const params: any = {
      page: args.page || 1,
      page_size: args.pageSize || 20,
    };
    
    if (args.active !== undefined) {
      params.active = args.active;
    }
    if (args.ruleType) {
      params.rule_type = args.ruleType;
    }
    
    const result = await this.apiClient.listPricingRules(params);
    
    return {
      success: true,
      message: 'Pricing rules listed successfully',
      data: result,
      summary: {
        totalRules: result.total || 0,
        activeRules: result.data?.filter((rule: any) => rule.isActive).length || 0,
      },
    };
  }

  private async validatePricingRule(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.validatePricingRule(args);
    
    return {
      success: true,
      message: 'Pricing rule validation completed',
      data: result,
      isValid: result.valid || result.data?.valid,
      errors: result.errors || result.data?.errors || [],
    };
  }

  // Cart Management Methods
  private async createCart(args: Record<string, any>): Promise<any> {
    const validatedArgs = CreateCartParamsSchema.parse(args);
    const result = await this.apiClient.createCart(validatedArgs);
    
    return {
      success: true,
      message: 'Cart created successfully',
      data: result,
      nextSteps: [
        'Add items using add_cart_item',
        'Apply coupons if available',
        'Calculate totals with get_cart_summary',
      ],
    };
  }

  private async addCartItem(args: Record<string, any>): Promise<any> {
    const { cartId, ...itemData } = args;
    if (!cartId) {
      throw new Error('Cart ID is required');
    }
    
    const validatedItemData = AddCartItemSchema.parse(itemData);
    const result = await this.apiClient.addCartItem(cartId, validatedItemData);
    
    return {
      success: true,
      message: 'Item added to cart successfully',
      data: result,
    };
  }

  private async getCart(args: Record<string, any>): Promise<any> {
    const { cartId } = args;
    if (!cartId) {
      throw new Error('Cart ID is required');
    }
    
    const result = await this.apiClient.getCart(cartId);
    
    return {
      success: true,
      message: 'Cart retrieved successfully',
      data: result,
      itemCount: result.items?.length || 0,
    };
  }

  private async getCartSummary(args: Record<string, any>): Promise<any> {
    const { cartId } = args;
    if (!cartId) {
      throw new Error('Cart ID is required');
    }
    
    const result = await this.apiClient.getCartSummary(cartId);
    
    return {
      success: true,
      message: 'Cart summary retrieved successfully',
      data: result,
    };
  }

  // Inventory Management Methods
  private async checkInventory(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.checkInventoryAvailability(args);

    return {
      success: true,
      message: 'Inventory availability checked',
      data: result,
      available: result.available || result.data?.available,
      availableQuantity: result.availableQuantity || result.data?.availableQuantity,
    };
  }

  private async reserveInventory(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.reserveInventory(args);

    return {
      success: true,
      message: 'Inventory reserved successfully',
      data: result,
      reservationId: args.reservationId,
      expiresAt: args.expiresAt,
    };
  }

  private async getInventory(args: Record<string, any>): Promise<any> {
    const { productId } = args;
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const result = await this.apiClient.getInventoryByProduct(productId);

    return {
      success: true,
      message: 'Inventory information retrieved',
      data: result,
    };
  }

  // Media Management Methods
  private async uploadMedia(args: Record<string, any>): Promise<any> {
    const validatedArgs = UploadMediaSchema.parse(args);
    const result = await this.apiClient.uploadMedia(validatedArgs);

    return {
      success: true,
      message: 'Media uploaded successfully',
      data: result,
      mediaInfo: {
        type: validatedArgs.mediaType,
        entity: `${validatedArgs.entityType}:${validatedArgs.entityId}`,
        fileName: validatedArgs.fileName,
      },
    };
  }

  private async listMedia(args: Record<string, any>): Promise<any> {
    const params: any = {
      page: args.page || 1,
      page_size: args.pageSize || 20,
    };

    if (args.entityType) params.entity_type = args.entityType;
    if (args.entityId) params.entity_id = args.entityId;
    if (args.mediaType) params.media_type = args.mediaType;

    const result = await this.apiClient.listMedia(params);

    return {
      success: true,
      message: 'Media files listed successfully',
      data: result,
      totalFiles: result.total || 0,
    };
  }

  // System Methods
  private async healthCheck(): Promise<any> {
    const result = await this.apiClient.healthCheck();

    return {
      success: true,
      message: 'Health check completed',
      data: result,
      status: result.status || 'unknown',
      timestamp: new Date().toISOString(),
    };
  }

  private async getSystemInfo(): Promise<any> {
    try {
      const health = await this.apiClient.healthCheck();

      return {
        success: true,
        message: 'System information retrieved',
        data: {
          platform: 'Sun eCommerce Platform',
          version: '1.0.0',
          status: health.status || 'operational',
          services: health.services || {},
          capabilities: [
            'Product Management',
            'Category Management',
            'Pricing Rules',
            'Cart Management',
            'Inventory Management',
            'Media Management',
            'Partner Management',
            'Sales Channel Management',
            'Multi-language Support',
          ],
          endpoints: {
            products: '/api/v1/products',
            categories: '/api/v1/categories',
            pricingRules: '/api/v1/pricing-rules',
            carts: '/api/v1/carts',
            inventory: '/api/v1/inventory',
            media: '/api/v1/media',
            partners: '/api/v1/partners',
            salesChannels: '/api/v1/sales-channels',
            translations: '/api/v1/translations',
          },
          lastUpdated: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve system information',
        error: error instanceof Error ? error.message : 'Unknown error',
        data: {
          platform: 'Sun eCommerce Platform',
          version: '1.0.0',
          status: 'error',
          lastUpdated: new Date().toISOString(),
        },
      };
    }
  }

  // Sales Channel Management Methods
  private async createSalesChannel(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.createSalesChannel(args);
    return {
      success: true,
      message: 'Sales channel created successfully',
      data: result,
    };
  }

  private async getSalesChannel(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getSalesChannel(args.id);
    return {
      success: true,
      message: 'Sales channel retrieved successfully',
      data: result,
    };
  }

  private async getSalesChannelByCode(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getSalesChannelByCode(args.code);
    return {
      success: true,
      message: 'Sales channel retrieved successfully',
      data: result,
    };
  }

  private async listSalesChannels(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.listSalesChannels(args);
    return {
      success: true,
      message: 'Sales channels listed successfully',
      data: result,
    };
  }

  private async updateSalesChannel(args: Record<string, any>): Promise<any> {
    const { id, ...updateData } = args;
    const result = await this.apiClient.updateSalesChannel(id, updateData);
    return {
      success: true,
      message: 'Sales channel updated successfully',
      data: result,
    };
  }

  private async deleteSalesChannel(args: Record<string, any>): Promise<any> {
    await this.apiClient.deleteSalesChannel(args.id);
    return {
      success: true,
      message: 'Sales channel deleted successfully',
    };
  }

  private async activateSalesChannel(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.activateSalesChannel(args.id);
    return {
      success: true,
      message: 'Sales channel activated successfully',
      data: result,
    };
  }

  private async deactivateSalesChannel(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.deactivateSalesChannel(args.id);
    return {
      success: true,
      message: 'Sales channel deactivated successfully',
      data: result,
    };
  }

  private async getSalesChannelStatistics(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getSalesChannelStatistics(args.id);
    return {
      success: true,
      message: 'Sales channel statistics retrieved successfully',
      data: result,
    };
  }

  // Enhanced Pricing Rules Methods
  private async getPricingRuleByName(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getPricingRuleByName(args.name);
    return {
      success: true,
      message: 'Pricing rule retrieved successfully',
      data: result,
    };
  }

  private async updatePricingRuleStatus(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.updatePricingRuleStatus(args.id, args.isActive);
    return {
      success: true,
      message: 'Pricing rule status updated successfully',
      data: result,
    };
  }

  private async getActivePricingRules(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getActivePricingRules(args);
    return {
      success: true,
      message: 'Active pricing rules retrieved successfully',
      data: result,
    };
  }

  private async bulkCalculatePrice(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.bulkCalculatePrice(args);
    return {
      success: true,
      message: 'Bulk price calculation completed successfully',
      data: result,
    };
  }

  private async getPricingRulesByPriority(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getPricingRulesByPriority(args.priority);
    return {
      success: true,
      message: 'Pricing rules by priority retrieved successfully',
      data: result,
    };
  }

  private async bulkUpdatePricingRuleStatus(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.bulkUpdatePricingRuleStatus(args.ruleIds, args.isActive);
    return {
      success: true,
      message: 'Pricing rule statuses updated successfully',
      data: result,
    };
  }

  private async getPricingRuleStats(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getPricingRuleStats(args.id);
    return {
      success: true,
      message: 'Pricing rule statistics retrieved successfully',
      data: result,
    };
  }

  private async duplicatePricingRule(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.duplicatePricingRule(args.id, args.newName);
    return {
      success: true,
      message: 'Pricing rule duplicated successfully',
      data: result,
    };
  }

  // Enhanced Product Attribute Methods
  private async updateAttributeValue(args: Record<string, any>): Promise<any> {
    const { attributeId, valueId, ...updateData } = args;
    const result = await this.apiClient.updateAttributeValue(attributeId, valueId, updateData);
    return {
      success: true,
      message: 'Attribute value updated successfully',
      data: result,
    };
  }

  private async deleteAttributeValue(args: Record<string, any>): Promise<any> {
    await this.apiClient.deleteAttributeValue(args.attributeId, args.valueId);
    return {
      success: true,
      message: 'Attribute value deleted successfully',
    };
  }

  private async bulkCreateAttributeValues(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.bulkCreateAttributeValues(args.attributeId, args.values);
    return {
      success: true,
      message: 'Attribute values created successfully',
      data: result,
    };
  }

  private async getAttributeUsage(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getAttributeUsage(args.id);
    return {
      success: true,
      message: 'Attribute usage retrieved successfully',
      data: result,
    };
  }

  // Translation Management Methods
  private async createProductTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.createProductTranslation(args);
    return {
      success: true,
      message: 'Product translation created successfully',
      data: result,
    };
  }

  private async getProductTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getProductTranslation(args.productId, args.language);
    return {
      success: true,
      message: 'Product translation retrieved successfully',
      data: result,
    };
  }

  private async updateProductTranslation(args: Record<string, any>): Promise<any> {
    const { productId, language, ...updateData } = args;
    const result = await this.apiClient.updateProductTranslation(productId, language, updateData);
    return {
      success: true,
      message: 'Product translation updated successfully',
      data: result,
    };
  }

  private async deleteProductTranslation(args: Record<string, any>): Promise<any> {
    await this.apiClient.deleteProductTranslation(args.productId, args.language);
    return {
      success: true,
      message: 'Product translation deleted successfully',
    };
  }

  private async listProductTranslations(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.listProductTranslations(args.productId);
    return {
      success: true,
      message: 'Product translations listed successfully',
      data: result,
    };
  }

  private async createCategoryTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.createCategoryTranslation(args);
    return {
      success: true,
      message: 'Category translation created successfully',
      data: result,
    };
  }

  private async getCategoryTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getCategoryTranslation(args.categoryId, args.language);
    return {
      success: true,
      message: 'Category translation retrieved successfully',
      data: result,
    };
  }

  private async updateCategoryTranslation(args: Record<string, any>): Promise<any> {
    const { categoryId, language, ...updateData } = args;
    const result = await this.apiClient.updateCategoryTranslation(categoryId, language, updateData);
    return {
      success: true,
      message: 'Category translation updated successfully',
      data: result,
    };
  }

  private async deleteCategoryTranslation(args: Record<string, any>): Promise<any> {
    await this.apiClient.deleteCategoryTranslation(args.categoryId, args.language);
    return {
      success: true,
      message: 'Category translation deleted successfully',
    };
  }

  private async listCategoryTranslations(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.listCategoryTranslations(args.categoryId);
    return {
      success: true,
      message: 'Category translations listed successfully',
      data: result,
    };
  }

  private async createProductAttributeTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.createProductAttributeTranslation(args);
    return {
      success: true,
      message: 'Product attribute translation created successfully',
      data: result,
    };
  }

  private async getProductAttributeTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getProductAttributeTranslation(args.attributeId, args.language);
    return {
      success: true,
      message: 'Product attribute translation retrieved successfully',
      data: result,
    };
  }

  private async updateProductAttributeTranslation(args: Record<string, any>): Promise<any> {
    const { attributeId, language, ...updateData } = args;
    const result = await this.apiClient.updateProductAttributeTranslation(attributeId, language, updateData);
    return {
      success: true,
      message: 'Product attribute translation updated successfully',
      data: result,
    };
  }

  private async deleteProductAttributeTranslation(args: Record<string, any>): Promise<any> {
    await this.apiClient.deleteProductAttributeTranslation(args.attributeId, args.language);
    return {
      success: true,
      message: 'Product attribute translation deleted successfully',
    };
  }

  private async listProductAttributeTranslations(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.listProductAttributeTranslations(args.attributeId);
    return {
      success: true,
      message: 'Product attribute translations listed successfully',
      data: result,
    };
  }

  private async createProductVariantTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.createProductVariantTranslation(args);
    return {
      success: true,
      message: 'Product variant translation created successfully',
      data: result,
    };
  }

  private async getProductVariantTranslation(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getProductVariantTranslation(args.variantId, args.language);
    return {
      success: true,
      message: 'Product variant translation retrieved successfully',
      data: result,
    };
  }

  private async updateProductVariantTranslation(args: Record<string, any>): Promise<any> {
    const { variantId, language, ...updateData } = args;
    const result = await this.apiClient.updateProductVariantTranslation(variantId, language, updateData);
    return {
      success: true,
      message: 'Product variant translation updated successfully',
      data: result,
    };
  }

  private async deleteProductVariantTranslation(args: Record<string, any>): Promise<any> {
    await this.apiClient.deleteProductVariantTranslation(args.variantId, args.language);
    return {
      success: true,
      message: 'Product variant translation deleted successfully',
    };
  }

  private async listProductVariantTranslations(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.listProductVariantTranslations(args.variantId);
    return {
      success: true,
      message: 'Product variant translations listed successfully',
      data: result,
    };
  }

  private async bulkCreateTranslations(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.bulkCreateTranslations(args.translations);
    return {
      success: true,
      message: 'Translations created successfully',
      data: result,
    };
  }

  private async bulkDeleteTranslations(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.bulkDeleteTranslations(args.translations);
    return {
      success: true,
      message: 'Translations deleted successfully',
      data: result,
    };
  }

  private async getTranslationStats(args: Record<string, any>): Promise<any> {
    const result = await this.apiClient.getTranslationStats(args);
    return {
      success: true,
      message: 'Translation statistics retrieved successfully',
      data: result,
    };
  }
}
