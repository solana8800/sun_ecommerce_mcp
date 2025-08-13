import { z } from 'zod';
// Base configuration schema
export const ConfigSchema = z.object({
    baseUrl: z.string().url().default('http://localhost:8080'),
    apiVersion: z.string().default('v1'),
    timeout: z.number().default(30000),
    retries: z.number().default(3),
    authToken: z.string().optional(),
    enableLogging: z.boolean().default(true),
});
// Common schemas
export const UUIDSchema = z.string().uuid();
export const DateTimeSchema = z.string().datetime();
export const PaginationSchema = z.object({
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(20),
});
// Product schemas
export const ProductTypeSchema = z.enum(['simple', 'configurable', 'bundle', 'grouped', 'virtual']);
export const ProductStatusSchema = z.enum(['active', 'inactive', 'draft', 'archived']);
export const CreateProductSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    sku: z.string().min(1).max(100),
    productType: ProductTypeSchema,
    status: ProductStatusSchema.default('draft'),
    categoryId: UUIDSchema.optional(),
    price: z.number().min(0).optional(),
    compareAtPrice: z.number().min(0).optional(),
    costPrice: z.number().min(0).optional(),
    weight: z.number().min(0).optional(),
    dimensions: z.object({
        length: z.number().min(0),
        width: z.number().min(0),
        height: z.number().min(0),
    }).optional(),
    tags: z.array(z.string()).default([]),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    handle: z.string().optional(),
});
// Category schemas
export const CreateCategorySchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    parentId: UUIDSchema.optional(),
    slug: z.string().min(1).max(255),
    isActive: z.boolean().default(true),
    sortOrder: z.number().default(0),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});
// Pricing Rule schemas
export const PricingRuleTypeSchema = z.enum(['percentage_discount', 'fixed_discount', 'buy_x_get_y', 'tier_pricing', 'bulk_discount']);
export const DiscountTypeSchema = z.enum(['percentage', 'fixed_amount']);
export const CreatePricingRuleSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    ruleType: PricingRuleTypeSchema,
    discountType: DiscountTypeSchema,
    discountValue: z.number().min(0),
    conditions: z.record(z.any()),
    actions: z.record(z.any()),
    priority: z.number().default(0),
    validFrom: DateTimeSchema,
    validTo: DateTimeSchema.optional(),
    isActive: z.boolean().default(true),
    usageLimit: z.number().min(1).optional(),
});
// Cart schemas
export const AddCartItemSchema = z.object({
    productId: UUIDSchema,
    variantId: UUIDSchema.optional(),
    quantity: z.number().min(1),
    customAttributes: z.record(z.any()).optional(),
});
// Inventory schemas
export const CreateInventorySchema = z.object({
    productId: UUIDSchema,
    variantId: UUIDSchema.optional(),
    quantity: z.number().min(0),
    reservedQuantity: z.number().min(0).default(0),
    lowStockThreshold: z.number().min(0).default(10),
    trackQuantity: z.boolean().default(true),
    allowBackorder: z.boolean().default(false),
    location: z.string().optional(),
});
// Media schemas
export const MediaTypeSchema = z.enum(['image', 'video', 'document', 'audio']);
export const EntityTypeSchema = z.enum(['product', 'category', 'user', 'order']);
export const UploadMediaSchema = z.object({
    entityType: EntityTypeSchema,
    entityId: UUIDSchema,
    mediaType: MediaTypeSchema,
    fileName: z.string(),
    fileSize: z.number().min(1),
    mimeType: z.string(),
    altText: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
});
// Partner schemas
export const PartnerTierSchema = z.enum(['bronze', 'silver', 'gold', 'platinum']);
export const PartnerStatusSchema = z.enum(['active', 'inactive', 'pending', 'suspended']);
export const CreatePartnerSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    tier: PartnerTierSchema.default('bronze'),
    status: PartnerStatusSchema.default('pending'),
    commissionRate: z.number().min(0).max(100).default(5),
    paymentTerms: z.string().optional(),
});
// Sales Channel schemas
export const ChannelTypeSchema = z.enum(['online', 'retail', 'wholesale', 'marketplace']);
export const CreateSalesChannelSchema = z.object({
    name: z.string().min(1).max(255),
    code: z.string().min(1).max(50),
    type: ChannelTypeSchema,
    description: z.string().optional(),
    isActive: z.boolean().default(true),
    currency: z.string().length(3).default('USD'),
    taxRate: z.number().min(0).max(100).default(0),
    settings: z.record(z.any()).optional(),
});
// Translation schemas
export const LanguageCodeSchema = z.enum(['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar']);
export const CreateTranslationSchema = z.object({
    entityType: z.enum(['product', 'category', 'attribute']),
    entityId: UUIDSchema,
    languageCode: LanguageCodeSchema,
    fields: z.record(z.string()),
});
// API Response schemas
export const ApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.any().optional(),
    error: z.string().optional(),
    message: z.string().optional(),
});
export const PaginatedResponseSchema = z.object({
    data: z.array(z.any()),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
});
// Error schemas
export const ApiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional(),
    timestamp: z.string(),
});
// Tool parameter schemas for MCP
export const SearchProductsParamsSchema = z.object({
    search: z.string().optional(),
    categoryId: UUIDSchema.optional(),
    productType: ProductTypeSchema.optional(),
    status: ProductStatusSchema.optional(),
    priceMin: z.number().min(0).optional(),
    priceMax: z.number().min(0).optional(),
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(20),
});
export const GetProductParamsSchema = z.object({
    id: UUIDSchema,
    includeVariants: z.boolean().default(true),
    includeInventory: z.boolean().default(true),
    includePricing: z.boolean().default(true),
});
export const CreateCartParamsSchema = z.object({
    customerId: UUIDSchema,
    channelId: UUIDSchema.optional(),
    currency: z.string().length(3).default('USD'),
});
export const ApplyPricingRuleParamsSchema = z.object({
    productId: UUIDSchema.optional(),
    variantId: UUIDSchema.optional(),
    quantity: z.number().min(1),
    basePrice: z.number().min(0),
    customerId: UUIDSchema.optional(),
    channelId: UUIDSchema.optional(),
});
//# sourceMappingURL=index.js.map