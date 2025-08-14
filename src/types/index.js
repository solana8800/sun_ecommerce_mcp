// Base configuration defaults
export const defaultConfig = {
  baseUrl: 'http://42.96.60.253:8080',
  apiVersion: 'v1',
  timeout: 30000,
  retries: 3,
  enableLogging: true,
};

// Enum constants
export const ProductType = {
  SIMPLE: 'simple',
  CONFIGURABLE: 'configurable',
  BUNDLE: 'bundle',
  GROUPED: 'grouped',
  VIRTUAL: 'virtual',
};

export const ProductStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
};

export const PricingRuleType = {
  PERCENTAGE_DISCOUNT: 'percentage_discount',
  FIXED_DISCOUNT: 'fixed_discount',
  BUY_X_GET_Y: 'buy_x_get_y',
  TIER_PRICING: 'tier_pricing',
  BULK_DISCOUNT: 'bulk_discount',
};

export const DiscountType = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
};

export const MediaType = {
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document',
  AUDIO: 'audio',
};

export const EntityType = {
  PRODUCT: 'product',
  CATEGORY: 'category',
  USER: 'user',
  ORDER: 'order',
};

export const PartnerTier = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
};

export const PartnerStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
};

export const ChannelType = {
  ONLINE: 'online',
  RETAIL: 'retail',
  WHOLESALE: 'wholesale',
  MARKETPLACE: 'marketplace',
};

export const LanguageCode = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
  PT: 'pt',
  JA: 'ja',
  KO: 'ko',
  ZH: 'zh',
  AR: 'ar',
};

// Default values for common objects
export const defaultPagination = {
  page: 1,
  pageSize: 20,
};

export const defaultProductStatus = ProductStatus.DRAFT;
export const defaultPartnerTier = PartnerTier.BRONZE;
export const defaultPartnerStatus = PartnerStatus.PENDING;
export const defaultChannelCurrency = 'USD';
export const defaultCommissionRate = 5;
export const defaultTaxRate = 0;
export const defaultLowStockThreshold = 10;
export const defaultSortOrder = 0;
export const defaultPriority = 0;

// Utility functions for validation (basic)
export const isValidUUID = (str) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper functions for creating default objects
export const createDefaultProduct = (overrides = {}) => ({
  name: '',
  sku: '',
  productType: ProductType.SIMPLE,
  status: ProductStatus.DRAFT,
  tags: [],
  ...overrides,
});

export const createDefaultCategory = (overrides = {}) => ({
  name: '',
  slug: '',
  isActive: true,
  sortOrder: defaultSortOrder,
  ...overrides,
});

export const createDefaultPricingRule = (overrides = {}) => ({
  name: '',
  ruleType: PricingRuleType.PERCENTAGE_DISCOUNT,
  discountType: DiscountType.PERCENTAGE,
  discountValue: 0,
  conditions: {},
  actions: {},
  priority: defaultPriority,
  isActive: true,
  ...overrides,
});

export const createDefaultInventory = (overrides = {}) => ({
  quantity: 0,
  reservedQuantity: 0,
  lowStockThreshold: defaultLowStockThreshold,
  trackQuantity: true,
  allowBackorder: false,
  ...overrides,
});

export const createDefaultPartner = (overrides = {}) => ({
  name: '',
  email: '',
  tier: PartnerTier.BRONZE,
  status: PartnerStatus.PENDING,
  commissionRate: defaultCommissionRate,
  ...overrides,
});

export const createDefaultSalesChannel = (overrides = {}) => ({
  name: '',
  code: '',
  type: ChannelType.ONLINE,
  isActive: true,
  currency: defaultChannelCurrency,
  taxRate: defaultTaxRate,
  ...overrides,
});

export const createDefaultTranslation = (overrides = {}) => ({
  entityType: EntityType.PRODUCT,
  languageCode: LanguageCode.EN,
  fields: {},
  ...overrides,
});