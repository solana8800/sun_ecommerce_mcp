# API Workflow Examples - Sun eCommerce MCP Server

Các ví dụ workflow API thực tế cho Sun eCommerce MCP Server.

## 📋 Tổng quan

API Workflows bao gồm các quy trình nghiệp vụ phức tạp:
- Complete eCommerce workflows
- Multi-step business processes
- Error handling and recovery
- Performance optimization
- Integration patterns

## 🛍️ Complete eCommerce Workflows

### 1. Product Catalog Setup Workflow

```typescript
// Workflow hoàn chỉnh để setup catalog sản phẩm
class ProductCatalogSetupWorkflow {
  private apiClient: ApiClient;
  private logger: Logger;
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.logger = new Logger('ProductCatalogSetup');
  }
  
  async execute(catalogData: CatalogSetupData): Promise<CatalogSetupResult> {
    const workflow = new WorkflowExecutor('product-catalog-setup');
    
    try {
      // Step 1: Create categories
      const categories = await workflow.step('create-categories', async () => {
        this.logger.info('Creating product categories...');
        const createdCategories = [];
        
        for (const categoryData of catalogData.categories) {
          const result = await this.apiClient.createCategory({
            name: categoryData.name,
            description: categoryData.description,
            parent_id: categoryData.parent_id,
            attributes: categoryData.attributes,
            seo_settings: categoryData.seo_settings
          });
          
          if (result.success) {
            createdCategories.push(result.data);
            this.logger.info(`Created category: ${categoryData.name}`);
          } else {
            throw new Error(`Failed to create category ${categoryData.name}: ${result.error.message}`);
          }
        }
        
        return createdCategories;
      });
      
      // Step 2: Upload product images
      const uploadedImages = await workflow.step('upload-images', async () => {
        this.logger.info('Uploading product images...');
        const imageResults = [];
        
        for (const imageData of catalogData.images) {
          const result = await this.apiClient.uploadMedia({
            file_path: imageData.file_path,
            alt_text: imageData.alt_text,
            tags: imageData.tags
          });
          
          if (result.success) {
            imageResults.push({
              original_path: imageData.file_path,
              uploaded_url: result.data.url,
              media_id: result.data.media_id
            });
          }
        }
        
        return imageResults;
      });
      
      // Step 3: Create products
      const products = await workflow.step('create-products', async () => {
        this.logger.info('Creating products...');
        const createdProducts = [];
        
        for (const productData of catalogData.products) {
          // Map image URLs
          const productImages = this.mapProductImages(productData.images, uploadedImages);
          
          // Find category ID
          const category = categories.find(c => c.name === productData.category_name);
          
          const result = await this.apiClient.createProduct({
            name: productData.name,
            description: productData.description,
            sku: productData.sku,
            price: productData.price,
            category_id: category?.category_id,
            images: productImages,
            attributes: productData.attributes,
            inventory: {
              quantity: productData.initial_stock,
              track_inventory: true
            },
            seo_settings: productData.seo_settings
          });
          
          if (result.success) {
            createdProducts.push(result.data);
            this.logger.info(`Created product: ${productData.name}`);
          } else {
            this.logger.error(`Failed to create product ${productData.name}: ${result.error.message}`);
          }
        }
        
        return createdProducts;
      });
      
      // Step 4: Setup pricing rules
      const pricingRules = await workflow.step('setup-pricing-rules', async () => {
        this.logger.info('Setting up pricing rules...');
        const createdRules = [];
        
        for (const ruleData of catalogData.pricing_rules || []) {
          const result = await this.apiClient.createPricingRule(ruleData);
          
          if (result.success) {
            createdRules.push(result.data);
            this.logger.info(`Created pricing rule: ${ruleData.name}`);
          }
        }
        
        return createdRules;
      });
      
      // Step 5: Generate SEO content
      await workflow.step('generate-seo', async () => {
        this.logger.info('Generating SEO content...');
        
        for (const product of products) {
          if (!product.seo_settings?.meta_description) {
            const seoResult = await this.apiClient.generateSEOContent({
              product_id: product.product_id,
              type: 'meta_description'
            });
            
            if (seoResult.success) {
              await this.apiClient.updateProduct({
                product_id: product.product_id,
                seo_settings: {
                  ...product.seo_settings,
                  meta_description: seoResult.data.content
                }
              });
            }
          }
        }
      });
      
      const result: CatalogSetupResult = {
        success: true,
        categories: categories,
        products: products,
        pricing_rules: pricingRules,
        uploaded_images: uploadedImages,
        workflow_id: workflow.getId(),
        execution_time: workflow.getExecutionTime()
      };
      
      this.logger.info('Catalog setup completed successfully');
      return result;
      
    } catch (error) {
      this.logger.error('Catalog setup failed:', error);
      
      // Rollback on failure
      await this.rollbackCatalogSetup(workflow.getCompletedSteps());
      
      throw error;
    }
  }
  
  private mapProductImages(imageNames: string[], uploadedImages: any[]): string[] {
    return imageNames.map(imageName => {
      const uploaded = uploadedImages.find(img => 
        img.original_path.includes(imageName)
      );
      return uploaded?.uploaded_url || '';
    }).filter(url => url);
  }
  
  private async rollbackCatalogSetup(completedSteps: string[]): Promise<void> {
    this.logger.info('Rolling back catalog setup...');
    
    // Implement rollback logic based on completed steps
    if (completedSteps.includes('create-products')) {
      // Delete created products
    }
    
    if (completedSteps.includes('create-categories')) {
      // Delete created categories
    }
    
    if (completedSteps.includes('upload-images')) {
      // Delete uploaded images
    }
  }
}

// Sử dụng workflow
const catalogSetup = new ProductCatalogSetupWorkflow(apiClient);

const catalogData: CatalogSetupData = {
  categories: [
    {
      name: "Electronics",
      description: "Electronic devices and accessories",
      attributes: ["brand", "warranty", "color"]
    },
    {
      name: "Laptops",
      description: "Laptop computers",
      parent_id: null, // Will be set to Electronics category ID
      attributes: ["processor", "ram", "storage"]
    }
  ],
  images: [
    {
      file_path: "/uploads/laptop-001.jpg",
      alt_text: "Gaming Laptop",
      tags: ["laptop", "gaming"]
    }
  ],
  products: [
    {
      name: "Gaming Laptop Pro",
      description: "High-performance gaming laptop",
      sku: "LAPTOP-001",
      price: 25000000,
      category_name: "Laptops",
      images: ["laptop-001.jpg"],
      initial_stock: 50,
      attributes: {
        processor: "Intel i7",
        ram: "16GB",
        storage: "512GB SSD"
      }
    }
  ],
  pricing_rules: [
    {
      name: "Laptop Bulk Discount",
      type: "percentage",
      value: 10,
      conditions: {
        category_ids: [], // Will be populated with Laptops category ID
        min_quantity: 2
      }
    }
  ]
};

const result = await catalogSetup.execute(catalogData);
console.log('Catalog setup result:', result);
```

### 2. Order Processing Workflow

```typescript
// Workflow xử lý đơn hàng hoàn chỉnh
class OrderProcessingWorkflow {
  private apiClient: ApiClient;
  private paymentService: PaymentService;
  private inventoryService: InventoryService;
  private shippingService: ShippingService;
  private notificationService: NotificationService;
  
  constructor(services: WorkflowServices) {
    this.apiClient = services.apiClient;
    this.paymentService = services.paymentService;
    this.inventoryService = services.inventoryService;
    this.shippingService = services.shippingService;
    this.notificationService = services.notificationService;
  }
  
  async processOrder(orderData: OrderData): Promise<OrderProcessingResult> {
    const workflow = new WorkflowExecutor(`order-${orderData.order_id}`);
    
    try {
      // Step 1: Validate order
      const validationResult = await workflow.step('validate-order', async () => {
        const validation = await this.apiClient.validateOrder({
          order_id: orderData.order_id,
          checks: [
            'inventory_availability',
            'pricing_accuracy',
            'customer_eligibility',
            'shipping_address',
            'payment_method'
          ]
        });
        
        if (!validation.data.is_valid) {
          throw new ValidationError('Order validation failed', validation.data.errors);
        }
        
        return validation.data;
      });
      
      // Step 2: Reserve inventory
      const reservationResult = await workflow.step('reserve-inventory', async () => {
        const reservations = [];
        
        for (const item of orderData.items) {
          const reservation = await this.inventoryService.reserveStock({
            product_id: item.product_id,
            variant_id: item.variant_id,
            quantity: item.quantity,
            order_id: orderData.order_id,
            expiry_minutes: 30 // Reserve for 30 minutes
          });
          
          if (reservation.success) {
            reservations.push(reservation.data);
          } else {
            throw new InventoryError(`Failed to reserve ${item.product_name}`);
          }
        }
        
        return reservations;
      });
      
      // Step 3: Process payment
      const paymentResult = await workflow.step('process-payment', async () => {
        const payment = await this.paymentService.processPayment({
          order_id: orderData.order_id,
          amount: orderData.total_amount,
          currency: orderData.currency,
          payment_method: orderData.payment_method,
          customer_id: orderData.customer_id
        });
        
        if (!payment.success) {
          throw new PaymentError('Payment processing failed', payment.error);
        }
        
        return payment.data;
      });
      
      // Step 4: Confirm inventory allocation
      await workflow.step('confirm-inventory', async () => {
        for (const reservation of reservationResult) {
          await this.inventoryService.confirmReservation({
            reservation_id: reservation.reservation_id,
            order_id: orderData.order_id
          });
        }
      });
      
      // Step 5: Create shipping label
      const shippingResult = await workflow.step('create-shipping', async () => {
        const shipping = await this.shippingService.createShipment({
          order_id: orderData.order_id,
          shipping_address: orderData.shipping_address,
          items: orderData.items,
          shipping_method: orderData.shipping_method
        });
        
        if (!shipping.success) {
          throw new ShippingError('Failed to create shipment');
        }
        
        return shipping.data;
      });
      
      // Step 6: Update order status
      const orderUpdate = await workflow.step('update-order-status', async () => {
        const result = await this.apiClient.updateOrder({
          order_id: orderData.order_id,
          status: 'confirmed',
          payment_status: 'paid',
          shipping_status: 'pending',
          tracking_number: shippingResult.tracking_number,
          estimated_delivery: shippingResult.estimated_delivery
        });
        
        return result.data;
      });
      
      // Step 7: Send notifications
      await workflow.step('send-notifications', async () => {
        // Send order confirmation email
        await this.notificationService.sendEmail({
          to: orderData.customer_email,
          template: 'order_confirmation',
          data: {
            order_id: orderData.order_id,
            items: orderData.items,
            total_amount: orderData.total_amount,
            tracking_number: shippingResult.tracking_number
          }
        });
        
        // Send SMS notification
        if (orderData.customer_phone) {
          await this.notificationService.sendSMS({
            to: orderData.customer_phone,
            message: `Đơn hàng ${orderData.order_id} đã được xác nhận. Mã vận đơn: ${shippingResult.tracking_number}`
          });
        }
        
        // Send push notification
        await this.notificationService.sendPushNotification({
          user_id: orderData.customer_id,
          title: 'Đơn hàng đã được xác nhận',
          body: `Đơn hàng #${orderData.order_id} đang được chuẩn bị`,
          data: {
            order_id: orderData.order_id,
            type: 'order_confirmation'
          }
        });
      });
      
      // Step 8: Update analytics
      await workflow.step('update-analytics', async () => {
        await this.apiClient.trackEvent({
          event_type: 'order_completed',
          customer_id: orderData.customer_id,
          order_id: orderData.order_id,
          revenue: orderData.total_amount,
          items: orderData.items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            revenue: item.price * item.quantity
          }))
        });
      });
      
      return {
        success: true,
        order_id: orderData.order_id,
        payment_id: paymentResult.payment_id,
        tracking_number: shippingResult.tracking_number,
        estimated_delivery: shippingResult.estimated_delivery,
        workflow_id: workflow.getId(),
        execution_time: workflow.getExecutionTime()
      };
      
    } catch (error) {
      // Rollback on failure
      await this.rollbackOrder(workflow.getCompletedSteps(), orderData, workflow.getStepData());
      throw error;
    }
  }
  
  private async rollbackOrder(completedSteps: string[], orderData: OrderData, stepData: any): Promise<void> {
    console.log('Rolling back order processing...');
    
    // Rollback in reverse order
    if (completedSteps.includes('confirm-inventory')) {
      // Release inventory reservations
      for (const reservation of stepData['reserve-inventory'] || []) {
        await this.inventoryService.releaseReservation({
          reservation_id: reservation.reservation_id
        });
      }
    }
    
    if (completedSteps.includes('process-payment')) {
      // Refund payment
      const paymentData = stepData['process-payment'];
      if (paymentData) {
        await this.paymentService.refundPayment({
          payment_id: paymentData.payment_id,
          amount: orderData.total_amount,
          reason: 'Order processing failed'
        });
      }
    }
    
    if (completedSteps.includes('create-shipping')) {
      // Cancel shipment
      const shippingData = stepData['create-shipping'];
      if (shippingData) {
        await this.shippingService.cancelShipment({
          shipment_id: shippingData.shipment_id
        });
      }
    }
    
    // Update order status to failed
    await this.apiClient.updateOrder({
      order_id: orderData.order_id,
      status: 'failed',
      failure_reason: 'Processing workflow failed'
    });
  }
}

// Sử dụng workflow
const orderProcessor = new OrderProcessingWorkflow({
  apiClient,
  paymentService,
  inventoryService,
  shippingService,
  notificationService
});

const orderData: OrderData = {
  order_id: "ORDER-001",
  customer_id: "CUSTOMER-001",
  customer_email: "customer@example.com",
  customer_phone: "+84901234567",
  items: [
    {
      product_id: "LAPTOP-001",
      product_name: "Gaming Laptop Pro",
      variant_id: "LAPTOP-001-16GB-512GB",
      quantity: 1,
      price: 25000000
    }
  ],
  total_amount: 25000000,
  currency: "VND",
  payment_method: {
    type: "credit_card",
    card_token: "card_token_123"
  },
  shipping_address: {
    name: "Nguyen Van A",
    phone: "+84901234567",
    address: "123 Nguyen Hue Street",
    district: "District 1",
    city: "Ho Chi Minh City",
    country: "Vietnam"
  },
  shipping_method: "standard"
};

try {
  const result = await orderProcessor.processOrder(orderData);
  console.log('Order processed successfully:', result);
} catch (error) {
  console.error('Order processing failed:', error);
}
```

### 3. Customer Onboarding Workflow

```typescript
// Workflow onboarding khách hàng mới
class CustomerOnboardingWorkflow {
  private apiClient: ApiClient;
  private emailService: EmailService;
  private loyaltyService: LoyaltyService;
  
  constructor(services: OnboardingServices) {
    this.apiClient = services.apiClient;
    this.emailService = services.emailService;
    this.loyaltyService = services.loyaltyService;
  }
  
  async onboardCustomer(customerData: CustomerRegistrationData): Promise<OnboardingResult> {
    const workflow = new WorkflowExecutor(`onboarding-${customerData.email}`);
    
    try {
      // Step 1: Create customer account
      const customer = await workflow.step('create-customer', async () => {
        const result = await this.apiClient.createCustomer({
          email: customerData.email,
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          phone: customerData.phone,
          date_of_birth: customerData.date_of_birth,
          preferences: customerData.preferences,
          marketing_consent: customerData.marketing_consent
        });
        
        if (!result.success) {
          throw new Error(`Failed to create customer: ${result.error.message}`);
        }
        
        return result.data;
      });
      
      // Step 2: Setup loyalty account
      const loyaltyAccount = await workflow.step('setup-loyalty', async () => {
        const result = await this.loyaltyService.createAccount({
          customer_id: customer.customer_id,
          tier: 'bronze',
          welcome_bonus_points: 100
        });
        
        return result.data;
      });
      
      // Step 3: Send welcome email series
      await workflow.step('send-welcome-emails', async () => {
        // Welcome email
        await this.emailService.sendEmail({
          to: customer.email,
          template: 'welcome',
          data: {
            first_name: customer.first_name,
            loyalty_points: loyaltyAccount.points,
            welcome_discount_code: await this.generateWelcomeDiscount(customer.customer_id)
          }
        });
        
        // Schedule follow-up emails
        await this.emailService.scheduleEmail({
          to: customer.email,
          template: 'onboarding_tips',
          data: { first_name: customer.first_name },
          send_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours later
        });
        
        await this.emailService.scheduleEmail({
          to: customer.email,
          template: 'product_recommendations',
          data: {
            first_name: customer.first_name,
            recommendations: await this.getPersonalizedRecommendations(customer)
          },
          send_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days later
        });
      });
      
      // Step 4: Create personalized shopping experience
      await workflow.step('personalize-experience', async () => {
        // Set up personalized product recommendations
        await this.apiClient.updateCustomerPreferences({
          customer_id: customer.customer_id,
          recommendation_settings: {
            categories: customerData.interests || [],
            price_range: customerData.budget_range,
            brands: customerData.preferred_brands || []
          }
        });
        
        // Create personalized homepage
        await this.apiClient.createPersonalizedContent({
          customer_id: customer.customer_id,
          content_type: 'homepage',
          sections: [
            {
              type: 'hero_banner',
              content: 'welcome_new_customer'
            },
            {
              type: 'product_recommendations',
              source: 'onboarding_preferences'
            },
            {
              type: 'category_highlights',
              categories: customerData.interests
            }
          ]
        });
      });
      
      // Step 5: Setup customer segments
      await workflow.step('assign-segments', async () => {
        const segments = ['new_customer'];
        
        // Add segments based on preferences
        if (customerData.interests) {
          segments.push(...customerData.interests.map(interest => `interested_in_${interest}`));
        }
        
        if (customerData.budget_range) {
          segments.push(`budget_${customerData.budget_range}`);
        }
        
        await this.apiClient.assignCustomerSegments({
          customer_id: customer.customer_id,
          segments: segments
        });
      });
      
      // Step 6: Track onboarding completion
      await workflow.step('track-completion', async () => {
        await this.apiClient.trackEvent({
          event_type: 'customer_onboarded',
          customer_id: customer.customer_id,
          properties: {
            onboarding_source: customerData.source,
            interests: customerData.interests,
            marketing_consent: customerData.marketing_consent,
            completion_time: workflow.getExecutionTime()
          }
        });
      });
      
      return {
        success: true,
        customer: customer,
        loyalty_account: loyaltyAccount,
        workflow_id: workflow.getId(),
        next_steps: [
          'Complete profile setup',
          'Browse recommended products',
          'Use welcome discount code'
        ]
      };
      
    } catch (error) {
      console.error('Customer onboarding failed:', error);
      
      // Cleanup on failure
      await this.cleanupFailedOnboarding(workflow.getCompletedSteps(), workflow.getStepData());
      
      throw error;
    }
  }
  
  private async generateWelcomeDiscount(customerId: string): Promise<string> {
    const result = await this.apiClient.createCoupon({
      code: `WELCOME${customerId.slice(-6)}`,
      type: 'percentage',
      value: 10,
      usage_limit: 1,
      customer_id: customerId,
      expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
    
    return result.data.code;
  }
  
  private async getPersonalizedRecommendations(customer: Customer): Promise<Product[]> {
    const result = await this.apiClient.getProductRecommendations({
      customer_id: customer.customer_id,
      type: 'onboarding',
      limit: 6
    });
    
    return result.data.products;
  }
  
  private async cleanupFailedOnboarding(completedSteps: string[], stepData: any): Promise<void> {
    if (completedSteps.includes('create-customer')) {
      const customerData = stepData['create-customer'];
      if (customerData) {
        // Mark customer as incomplete instead of deleting
        await this.apiClient.updateCustomer({
          customer_id: customerData.customer_id,
          status: 'incomplete_onboarding'
        });
      }
    }
  }
}

// Sử dụng workflow
const onboarding = new CustomerOnboardingWorkflow({
  apiClient,
  emailService,
  loyaltyService
});

const customerData: CustomerRegistrationData = {
  email: "newcustomer@example.com",
  first_name: "Nguyen",
  last_name: "Van A",
  phone: "+84901234567",
  date_of_birth: "1990-01-01",
  interests: ["electronics", "fashion"],
  budget_range: "medium",
  preferred_brands: ["Apple", "Samsung"],
  marketing_consent: true,
  source: "website_registration"
};

const result = await onboarding.onboardCustomer(customerData);
console.log('Customer onboarded successfully:', result);
```

## 🔄 Integration Workflows

### 4. Third-Party Integration Workflow

```typescript
// Workflow tích hợp với hệ thống bên thứ 3
class ThirdPartyIntegrationWorkflow {
  private apiClient: ApiClient;
  private integrationService: IntegrationService;
  
  constructor(apiClient: ApiClient, integrationService: IntegrationService) {
    this.apiClient = apiClient;
    this.integrationService = integrationService;
  }
  
  async syncWithERP(syncConfig: ERPSyncConfig): Promise<SyncResult> {
    const workflow = new WorkflowExecutor('erp-sync');
    
    try {
      // Step 1: Authenticate with ERP
      const erpConnection = await workflow.step('authenticate-erp', async () => {
        const auth = await this.integrationService.authenticateERP({
          endpoint: syncConfig.erp_endpoint,
          credentials: syncConfig.credentials
        });
        
        if (!auth.success) {
          throw new Error('ERP authentication failed');
        }
        
        return auth.data;
      });
      
      // Step 2: Fetch data from ERP
      const erpData = await workflow.step('fetch-erp-data', async () => {
        const data = await this.integrationService.fetchERPData({
          connection: erpConnection,
          entities: syncConfig.sync_entities,
          last_sync: syncConfig.last_sync_timestamp
        });
        
        return data.data;
      });
      
      // Step 3: Transform data
      const transformedData = await workflow.step('transform-data', async () => {
        const transformer = new DataTransformer(syncConfig.mapping_rules);
        
        const transformed = {
          products: transformer.transformProducts(erpData.products || []),
          inventory: transformer.transformInventory(erpData.inventory || []),
          customers: transformer.transformCustomers(erpData.customers || []),
          orders: transformer.transformOrders(erpData.orders || [])
        };
        
        return transformed;
      });
      
      // Step 4: Validate transformed data
      const validationResult = await workflow.step('validate-data', async () => {
        const validator = new DataValidator();
        
        const results = {
          products: validator.validateProducts(transformedData.products),
          inventory: validator.validateInventory(transformedData.inventory),
          customers: validator.validateCustomers(transformedData.customers),
          orders: validator.validateOrders(transformedData.orders)
        };
        
        // Check for validation errors
        const hasErrors = Object.values(results).some(result => result.errors.length > 0);
        if (hasErrors) {
          throw new ValidationError('Data validation failed', results);
        }
        
        return results;
      });
      
      // Step 5: Sync products
      const productSyncResult = await workflow.step('sync-products', async () => {
        const results = [];
        
        for (const product of transformedData.products) {
          try {
            const existing = await this.apiClient.findProductBySKU({
              sku: product.sku
            });
            
            let result;
            if (existing.data) {
              // Update existing product
              result = await this.apiClient.updateProduct({
                product_id: existing.data.product_id,
                ...product
              });
            } else {
              // Create new product
              result = await this.apiClient.createProduct(product);
            }
            
            results.push({
              sku: product.sku,
              action: existing.data ? 'updated' : 'created',
              success: result.success,
              product_id: result.data?.product_id
            });
            
          } catch (error) {
            results.push({
              sku: product.sku,
              action: 'failed',
              success: false,
              error: error.message
            });
          }
        }
        
        return results;
      });
      
      // Step 6: Sync inventory
      const inventorySyncResult = await workflow.step('sync-inventory', async () => {
        const results = [];
        
        for (const inventory of transformedData.inventory) {
          try {
            const result = await this.apiClient.updateInventory({
              product_sku: inventory.sku,
              quantity: inventory.quantity,
              location: inventory.location,
              sync_source: 'erp'
            });
            
            results.push({
              sku: inventory.sku,
              success: result.success,
              quantity: inventory.quantity
            });
            
          } catch (error) {
            results.push({
              sku: inventory.sku,
              success: false,
              error: error.message
            });
          }
        }
        
        return results;
      });
      
      // Step 7: Update sync timestamp
      await workflow.step('update-sync-timestamp', async () => {
        await this.apiClient.updateIntegrationConfig({
          integration_id: syncConfig.integration_id,
          last_sync_timestamp: new Date().toISOString(),
          last_sync_status: 'success'
        });
      });
      
      // Step 8: Generate sync report
      const syncReport = await workflow.step('generate-report', async () => {
        const report = {
          sync_id: workflow.getId(),
          timestamp: new Date().toISOString(),
          duration: workflow.getExecutionTime(),
          summary: {
            products_processed: transformedData.products.length,
            products_created: productSyncResult.filter(r => r.action === 'created').length,
            products_updated: productSyncResult.filter(r => r.action === 'updated').length,
            products_failed: productSyncResult.filter(r => !r.success).length,
            inventory_updated: inventorySyncResult.filter(r => r.success).length,
            inventory_failed: inventorySyncResult.filter(r => !r.success).length
          },
          details: {
            products: productSyncResult,
            inventory: inventorySyncResult
          }
        };
        
        // Save report
        await this.apiClient.saveSyncReport(report);
        
        return report;
      });
      
      return {
        success: true,
        sync_id: workflow.getId(),
        report: syncReport
      };
      
    } catch (error) {
      console.error('ERP sync failed:', error);
      
      // Update sync status
      await this.apiClient.updateIntegrationConfig({
        integration_id: syncConfig.integration_id,
        last_sync_status: 'failed',
        last_error: error.message
      });
      
      throw error;
    }
  }
}

// Sử dụng workflow
const erpIntegration = new ThirdPartyIntegrationWorkflow(apiClient, integrationService);

const syncConfig: ERPSyncConfig = {
  integration_id: "erp-001",
  erp_endpoint: "https://erp.company.com/api",
  credentials: {
    username: "api_user",
    password: "api_password"
  },
  sync_entities: ['products', 'inventory', 'customers'],
  last_sync_timestamp: "2024-01-01T00:00:00Z",
  mapping_rules: {
    product_name: "item_description",
    product_sku: "item_code",
    product_price: "unit_price"
  }
};

const syncResult = await erpIntegration.syncWithERP(syncConfig);
console.log('ERP sync completed:', syncResult);
```

### 5. Bulk Operations Workflow

```typescript
// Workflow xử lý hàng loạt
class BulkOperationsWorkflow {
  private apiClient: ApiClient;
  private batchSize: number = 100;
  
  constructor(apiClient: ApiClient, batchSize?: number) {
    this.apiClient = apiClient;
    if (batchSize) this.batchSize = batchSize;
  }
  
  async bulkUpdatePrices(priceUpdates: PriceUpdate[]): Promise<BulkUpdateResult> {
    const workflow = new WorkflowExecutor('bulk-price-update');
    
    try {
      // Step 1: Validate all updates
      const validationResult = await workflow.step('validate-updates', async () => {
        const validator = new PriceUpdateValidator();
        const results = [];
        
        for (const update of priceUpdates) {
          const validation = validator.validate(update);
          results.push({
            sku: update.sku,
            valid: validation.isValid,
            errors: validation.errors
          });
        }
        
        const invalidUpdates = results.filter(r => !r.valid);
        if (invalidUpdates.length > 0) {
          throw new ValidationError('Some price updates are invalid', invalidUpdates);
        }
        
        return results;
      });
      
      // Step 2: Process in batches
      const batchResults = await workflow.step('process-batches', async () => {
        const batches = this.createBatches(priceUpdates, this.batchSize);
        const results = [];
        
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          console.log(`Processing batch ${i + 1}/${batches.length}`);
          
          try {
            const batchResult = await this.processPriceBatch(batch);
            results.push({
              batch_number: i + 1,
              success: true,
              processed_count: batchResult.length,
              results: batchResult
            });
            
            // Add delay between batches to avoid rate limiting
            if (i < batches.length - 1) {
              await this.delay(1000); // 1 second delay
            }
            
          } catch (error) {
            results.push({
              batch_number: i + 1,
              success: false,
              error: error.message,
              processed_count: 0
            });
          }
        }
        
        return results;
      });
      
      // Step 3: Generate summary
      const summary = await workflow.step('generate-summary', async () => {
        const totalProcessed = batchResults.reduce((sum, batch) => 
          sum + (batch.processed_count || 0), 0
        );
        
        const successfulBatches = batchResults.filter(batch => batch.success).length;
        const failedBatches = batchResults.filter(batch => !batch.success).length;
        
        const allResults = batchResults
          .filter(batch => batch.results)
          .flatMap(batch => batch.results);
        
        const successfulUpdates = allResults.filter(result => result.success).length;
        const failedUpdates = allResults.filter(result => !result.success).length;
        
        return {
          total_items: priceUpdates.length,
          total_processed: totalProcessed,
          successful_updates: successfulUpdates,
          failed_updates: failedUpdates,
          successful_batches: successfulBatches,
          failed_batches: failedBatches,
          execution_time: workflow.getExecutionTime()
        };
      });
      
      // Step 4: Send notification
      await workflow.step('send-notification', async () => {
        await this.apiClient.sendNotification({
          type: 'bulk_operation_completed',
          title: 'Bulk Price Update Completed',
          message: `Updated ${summary.successful_updates} products successfully`,
          data: summary
        });
      });
      
      return {
        success: true,
        workflow_id: workflow.getId(),
        summary: summary,
        batch_results: batchResults
      };
      
    } catch (error) {
      console.error('Bulk price update failed:', error);
      throw error;
    }
  }
  
  private async processPriceBatch(batch: PriceUpdate[]): Promise<PriceUpdateResult[]> {
    const results = [];
    
    for (const update of batch) {
      try {
        const result = await this.apiClient.updateProductPrice({
          sku: update.sku,
          price: update.new_price,
          effective_date: update.effective_date,
          reason: update.reason
        });
        
        results.push({
          sku: update.sku,
          success: result.success,
          old_price: update.old_price,
          new_price: update.new_price,
          product_id: result.data?.product_id
        });
        
      } catch (error) {
        results.push({
          sku: update.sku,
          success: false,
          error: error.message,
          old_price: update.old_price,
          new_price: update.new_price
        });
      }
    }
    
    return results;
  }
  
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Sử dụng workflow
const bulkOperations = new BulkOperationsWorkflow(apiClient, 50);

const priceUpdates: PriceUpdate[] = [
  {
    sku: "LAPTOP-001",
    old_price: 25000000,
    new_price: 23000000,
    effective_date: "2024-02-01T00:00:00Z",
    reason: "Seasonal discount"
  },
  {
    sku: "MOUSE-001",
    old_price: 500000,
    new_price: 450000,
    effective_date: "2024-02-01T00:00:00Z",
    reason: "Competitive pricing"
  }
  // ... more updates
];

const result = await bulkOperations.bulkUpdatePrices(priceUpdates);
console.log('Bulk price update completed:', result);
```

## 🎯 Best Practices

### Workflow Error Handling

```typescript
class WorkflowExecutor {
  private steps: Map<string, any> = new Map();
  private completedSteps: string[] = [];
  private startTime: Date;
  
  constructor(private workflowId: string) {
    this.startTime = new Date();
  }
  
  async step<T>(stepName: string, stepFunction: () => Promise<T>): Promise<T> {
    try {
      console.log(`Executing step: ${stepName}`);
      const result = await stepFunction();
      
      this.steps.set(stepName, result);
      this.completedSteps.push(stepName);
      
      console.log(`Completed step: ${stepName}`);
      return result;
      
    } catch (error) {
      console.error(`Step failed: ${stepName}`, error);
      throw new WorkflowStepError(stepName, error);
    }
  }
  
  getId(): string {
    return this.workflowId;
  }
  
  getCompletedSteps(): string[] {
    return [...this.completedSteps];
  }
  
  getStepData(): Record<string, any> {
    return Object.fromEntries(this.steps);
  }
  
  getExecutionTime(): number {
    return Date.now() - this.startTime.getTime();
  }
}

class WorkflowStepError extends Error {
  constructor(public stepName: string, public originalError: Error) {
    super(`Workflow step '${stepName}' failed: ${originalError.message}`);
    this.name = 'WorkflowStepError';
  }
}
```

### Workflow Monitoring

```typescript
class WorkflowMonitor {
  private metrics: Map<string, WorkflowMetrics> = new Map();
  
  startWorkflow(workflowId: string, workflowType: string): void {
    this.metrics.set(workflowId, {
      workflow_id: workflowId,
      workflow_type: workflowType,
      start_time: new Date(),
      status: 'running',
      steps_completed: 0,
      steps_total: 0
    });
  }
  
  updateWorkflowProgress(workflowId: string, stepsCompleted: number, stepsTotal: number): void {
    const metrics = this.metrics.get(workflowId);
    if (metrics) {
      metrics.steps_completed = stepsCompleted;
      metrics.steps_total = stepsTotal;
      metrics.progress_percentage = (stepsCompleted / stepsTotal) * 100;
    }
  }
  
  completeWorkflow(workflowId: string, success: boolean, error?: Error): void {
    const metrics = this.metrics.get(workflowId);
    if (metrics) {
      metrics.end_time = new Date();
      metrics.status = success ? 'completed' : 'failed';
      metrics.duration = metrics.end_time.getTime() - metrics.start_time.getTime();
      
      if (error) {
        metrics.error_message = error.message;
      }
      
      // Send metrics to monitoring system
      this.sendMetrics(metrics);
    }
  }
  
  private async sendMetrics(metrics: WorkflowMetrics): Promise<void> {
    try {
      await fetch('/api/workflow-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metrics)
      });
    } catch (error) {
      console.error('Failed to send workflow metrics:', error);
    }
  }
}

// Sử dụng monitoring
const monitor = new WorkflowMonitor();

// Trong workflow
monitor.startWorkflow('workflow-001', 'order-processing');
monitor.updateWorkflowProgress('workflow-001', 3, 8);
monitor.completeWorkflow('workflow-001', true);
```

---

*Các workflow examples này cung cấp foundation mạnh mẽ để xây dựng các quy trình nghiệp vụ phức tạp và đáng tin cậy trong hệ thống eCommerce.*