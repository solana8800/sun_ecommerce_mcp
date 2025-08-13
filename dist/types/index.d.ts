import { z } from 'zod';
export declare const ConfigSchema: z.ZodObject<{
    baseUrl: z.ZodDefault<z.ZodString>;
    apiVersion: z.ZodDefault<z.ZodString>;
    timeout: z.ZodDefault<z.ZodNumber>;
    retries: z.ZodDefault<z.ZodNumber>;
    authToken: z.ZodOptional<z.ZodString>;
    enableLogging: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    baseUrl: string;
    apiVersion: string;
    timeout: number;
    retries: number;
    enableLogging: boolean;
    authToken?: string | undefined;
}, {
    baseUrl?: string | undefined;
    apiVersion?: string | undefined;
    timeout?: number | undefined;
    retries?: number | undefined;
    authToken?: string | undefined;
    enableLogging?: boolean | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
export declare const UUIDSchema: z.ZodString;
export declare const DateTimeSchema: z.ZodString;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export declare const ProductTypeSchema: z.ZodEnum<["simple", "configurable", "bundle", "grouped", "virtual"]>;
export declare const ProductStatusSchema: z.ZodEnum<["active", "inactive", "draft", "archived"]>;
export declare const CreateProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodString>;
    sku: z.ZodString;
    productType: z.ZodEnum<["simple", "configurable", "bundle", "grouped", "virtual"]>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "draft", "archived"]>>;
    categoryId: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    costPrice: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        length: number;
        width: number;
        height: number;
    }, {
        length: number;
        width: number;
        height: number;
    }>>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    handle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "draft" | "archived";
    name: string;
    sku: string;
    productType: "simple" | "configurable" | "bundle" | "grouped" | "virtual";
    tags: string[];
    description?: string | undefined;
    shortDescription?: string | undefined;
    categoryId?: string | undefined;
    price?: number | undefined;
    compareAtPrice?: number | undefined;
    costPrice?: number | undefined;
    weight?: number | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    } | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    handle?: string | undefined;
}, {
    name: string;
    sku: string;
    productType: "simple" | "configurable" | "bundle" | "grouped" | "virtual";
    status?: "active" | "inactive" | "draft" | "archived" | undefined;
    description?: string | undefined;
    shortDescription?: string | undefined;
    categoryId?: string | undefined;
    price?: number | undefined;
    compareAtPrice?: number | undefined;
    costPrice?: number | undefined;
    weight?: number | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    } | undefined;
    tags?: string[] | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    handle?: string | undefined;
}>;
export declare const CreateCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    isActive: boolean;
    sortOrder: number;
    description?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    parentId?: string | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    parentId?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
}>;
export declare const PricingRuleTypeSchema: z.ZodEnum<["percentage_discount", "fixed_discount", "buy_x_get_y", "tier_pricing", "bulk_discount"]>;
export declare const DiscountTypeSchema: z.ZodEnum<["percentage", "fixed_amount"]>;
export declare const CreatePricingRuleSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    ruleType: z.ZodEnum<["percentage_discount", "fixed_discount", "buy_x_get_y", "tier_pricing", "bulk_discount"]>;
    discountType: z.ZodEnum<["percentage", "fixed_amount"]>;
    discountValue: z.ZodNumber;
    conditions: z.ZodRecord<z.ZodString, z.ZodAny>;
    actions: z.ZodRecord<z.ZodString, z.ZodAny>;
    priority: z.ZodDefault<z.ZodNumber>;
    validFrom: z.ZodString;
    validTo: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    ruleType: "percentage_discount" | "fixed_discount" | "buy_x_get_y" | "tier_pricing" | "bulk_discount";
    discountType: "percentage" | "fixed_amount";
    discountValue: number;
    conditions: Record<string, any>;
    actions: Record<string, any>;
    priority: number;
    validFrom: string;
    description?: string | undefined;
    validTo?: string | undefined;
    usageLimit?: number | undefined;
}, {
    name: string;
    ruleType: "percentage_discount" | "fixed_discount" | "buy_x_get_y" | "tier_pricing" | "bulk_discount";
    discountType: "percentage" | "fixed_amount";
    discountValue: number;
    conditions: Record<string, any>;
    actions: Record<string, any>;
    validFrom: string;
    description?: string | undefined;
    isActive?: boolean | undefined;
    priority?: number | undefined;
    validTo?: string | undefined;
    usageLimit?: number | undefined;
}>;
export declare const AddCartItemSchema: z.ZodObject<{
    productId: z.ZodString;
    variantId: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    customAttributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
    variantId?: string | undefined;
    customAttributes?: Record<string, any> | undefined;
}, {
    productId: string;
    quantity: number;
    variantId?: string | undefined;
    customAttributes?: Record<string, any> | undefined;
}>;
export declare const CreateInventorySchema: z.ZodObject<{
    productId: z.ZodString;
    variantId: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    reservedQuantity: z.ZodDefault<z.ZodNumber>;
    lowStockThreshold: z.ZodDefault<z.ZodNumber>;
    trackQuantity: z.ZodDefault<z.ZodBoolean>;
    allowBackorder: z.ZodDefault<z.ZodBoolean>;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
    reservedQuantity: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
    variantId?: string | undefined;
    location?: string | undefined;
}, {
    productId: string;
    quantity: number;
    variantId?: string | undefined;
    reservedQuantity?: number | undefined;
    lowStockThreshold?: number | undefined;
    trackQuantity?: boolean | undefined;
    allowBackorder?: boolean | undefined;
    location?: string | undefined;
}>;
export declare const MediaTypeSchema: z.ZodEnum<["image", "video", "document", "audio"]>;
export declare const EntityTypeSchema: z.ZodEnum<["product", "category", "user", "order"]>;
export declare const UploadMediaSchema: z.ZodObject<{
    entityType: z.ZodEnum<["product", "category", "user", "order"]>;
    entityId: z.ZodString;
    mediaType: z.ZodEnum<["image", "video", "document", "audio"]>;
    fileName: z.ZodString;
    fileSize: z.ZodNumber;
    mimeType: z.ZodString;
    altText: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    entityType: "product" | "category" | "user" | "order";
    entityId: string;
    mediaType: "image" | "video" | "document" | "audio";
    fileName: string;
    fileSize: number;
    mimeType: string;
    description?: string | undefined;
    altText?: string | undefined;
    title?: string | undefined;
}, {
    entityType: "product" | "category" | "user" | "order";
    entityId: string;
    mediaType: "image" | "video" | "document" | "audio";
    fileName: string;
    fileSize: number;
    mimeType: string;
    description?: string | undefined;
    altText?: string | undefined;
    title?: string | undefined;
}>;
export declare const PartnerTierSchema: z.ZodEnum<["bronze", "silver", "gold", "platinum"]>;
export declare const PartnerStatusSchema: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
export declare const CreatePartnerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    tier: z.ZodDefault<z.ZodEnum<["bronze", "silver", "gold", "platinum"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>;
    commissionRate: z.ZodDefault<z.ZodNumber>;
    paymentTerms: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "pending" | "suspended";
    name: string;
    email: string;
    tier: "bronze" | "silver" | "gold" | "platinum";
    commissionRate: number;
    phone?: string | undefined;
    address?: string | undefined;
    paymentTerms?: string | undefined;
}, {
    name: string;
    email: string;
    status?: "active" | "inactive" | "pending" | "suspended" | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    tier?: "bronze" | "silver" | "gold" | "platinum" | undefined;
    commissionRate?: number | undefined;
    paymentTerms?: string | undefined;
}>;
export declare const ChannelTypeSchema: z.ZodEnum<["online", "retail", "wholesale", "marketplace"]>;
export declare const CreateSalesChannelSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    type: z.ZodEnum<["online", "retail", "wholesale", "marketplace"]>;
    description: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    currency: z.ZodDefault<z.ZodString>;
    taxRate: z.ZodDefault<z.ZodNumber>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    type: "online" | "retail" | "wholesale" | "marketplace";
    name: string;
    isActive: boolean;
    currency: string;
    taxRate: number;
    description?: string | undefined;
    settings?: Record<string, any> | undefined;
}, {
    code: string;
    type: "online" | "retail" | "wholesale" | "marketplace";
    name: string;
    description?: string | undefined;
    isActive?: boolean | undefined;
    currency?: string | undefined;
    taxRate?: number | undefined;
    settings?: Record<string, any> | undefined;
}>;
export declare const LanguageCodeSchema: z.ZodEnum<["en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh", "ar"]>;
export declare const CreateTranslationSchema: z.ZodObject<{
    entityType: z.ZodEnum<["product", "category", "attribute"]>;
    entityId: z.ZodString;
    languageCode: z.ZodEnum<["en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh", "ar"]>;
    fields: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    entityType: "product" | "category" | "attribute";
    entityId: string;
    languageCode: "en" | "es" | "fr" | "de" | "it" | "pt" | "ja" | "ko" | "zh" | "ar";
    fields: Record<string, string>;
}, {
    entityType: "product" | "category" | "attribute";
    entityId: string;
    languageCode: "en" | "es" | "fr" | "de" | "it" | "pt" | "ja" | "ko" | "zh" | "ar";
    fields: Record<string, string>;
}>;
export declare const ApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    message?: string | undefined;
    data?: any;
    error?: string | undefined;
}, {
    success: boolean;
    message?: string | undefined;
    data?: any;
    error?: string | undefined;
}>;
export declare const PaginatedResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodAny, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
    totalPages: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    data: any[];
    total: number;
    totalPages: number;
}, {
    page: number;
    pageSize: number;
    data: any[];
    total: number;
    totalPages: number;
}>;
export declare const ApiErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodAny>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    timestamp: string;
    details?: any;
}, {
    code: string;
    message: string;
    timestamp: string;
    details?: any;
}>;
export declare const SearchProductsParamsSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    productType: z.ZodOptional<z.ZodEnum<["simple", "configurable", "bundle", "grouped", "virtual"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "draft", "archived"]>>;
    priceMin: z.ZodOptional<z.ZodNumber>;
    priceMax: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    status?: "active" | "inactive" | "draft" | "archived" | undefined;
    productType?: "simple" | "configurable" | "bundle" | "grouped" | "virtual" | undefined;
    categoryId?: string | undefined;
    search?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
}, {
    status?: "active" | "inactive" | "draft" | "archived" | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
    productType?: "simple" | "configurable" | "bundle" | "grouped" | "virtual" | undefined;
    categoryId?: string | undefined;
    search?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
}>;
export declare const GetProductParamsSchema: z.ZodObject<{
    id: z.ZodString;
    includeVariants: z.ZodDefault<z.ZodBoolean>;
    includeInventory: z.ZodDefault<z.ZodBoolean>;
    includePricing: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    includeVariants: boolean;
    includeInventory: boolean;
    includePricing: boolean;
}, {
    id: string;
    includeVariants?: boolean | undefined;
    includeInventory?: boolean | undefined;
    includePricing?: boolean | undefined;
}>;
export declare const CreateCartParamsSchema: z.ZodObject<{
    customerId: z.ZodString;
    channelId: z.ZodOptional<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: string;
    customerId: string;
    channelId?: string | undefined;
}, {
    customerId: string;
    currency?: string | undefined;
    channelId?: string | undefined;
}>;
export declare const ApplyPricingRuleParamsSchema: z.ZodObject<{
    productId: z.ZodOptional<z.ZodString>;
    variantId: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    basePrice: z.ZodNumber;
    customerId: z.ZodOptional<z.ZodString>;
    channelId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    basePrice: number;
    productId?: string | undefined;
    variantId?: string | undefined;
    customerId?: string | undefined;
    channelId?: string | undefined;
}, {
    quantity: number;
    basePrice: number;
    productId?: string | undefined;
    variantId?: string | undefined;
    customerId?: string | undefined;
    channelId?: string | undefined;
}>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type CreatePricingRule = z.infer<typeof CreatePricingRuleSchema>;
export type AddCartItem = z.infer<typeof AddCartItemSchema>;
export type CreateInventory = z.infer<typeof CreateInventorySchema>;
export type UploadMedia = z.infer<typeof UploadMediaSchema>;
export type CreatePartner = z.infer<typeof CreatePartnerSchema>;
export type CreateSalesChannel = z.infer<typeof CreateSalesChannelSchema>;
export type CreateTranslation = z.infer<typeof CreateTranslationSchema>;
export type SearchProductsParams = z.infer<typeof SearchProductsParamsSchema>;
export type GetProductParams = z.infer<typeof GetProductParamsSchema>;
export type CreateCartParams = z.infer<typeof CreateCartParamsSchema>;
export type ApplyPricingRuleParams = z.infer<typeof ApplyPricingRuleParamsSchema>;
//# sourceMappingURL=index.d.ts.map