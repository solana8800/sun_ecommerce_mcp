# Cart Management Examples - Sun eCommerce MCP Server

Các ví dụ thực tế về quản lý giỏ hàng trong Sun eCommerce MCP Server.

## 📋 Tổng quan

Cart Management bao gồm các chức năng:
- Tạo và quản lý giỏ hàng
- Thêm/xóa/cập nhật sản phẩm trong giỏ
- Áp dụng mã giảm giá và pricing rules
- Tính toán tổng tiền và thuế
- Quản lý session và persistence
- Xử lý abandoned carts

## 🛒 Basic Cart Operations

### 1. Create Cart

```typescript
// Tạo giỏ hàng mới cho khách hàng
async function createCart(customerId?: string) {
  try {
    const cartData = {
      customer_id: customerId,
      currency: "VND",
      session_id: generateSessionId(),
      created_at: new Date().toISOString()
    };
    
    const result = await apiClient.createCart(cartData);
    
    if (result.success) {
      console.log('Created cart:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to create cart:', error.message);
    throw error;
  }
}

// Sử dụng
const newCart = await createCart('customer-001');
console.log('Cart ID:', newCart.cart_id);
```

### 2. Add Items to Cart

```typescript
// Thêm sản phẩm vào giỏ hàng
async function addItemToCart(cartId: string, item: CartItem) {
  try {
    const result = await apiClient.addCartItem({
      cart_id: cartId,
      product_id: item.product_id,
      quantity: item.quantity,
      variant_id: item.variant_id,
      custom_attributes: item.custom_attributes
    });
    
    if (result.success) {
      console.log('Added item to cart:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to add item to cart:', error.message);
    throw error;
  }
}

// Ví dụ thêm nhiều sản phẩm
const items = [
  {
    product_id: "laptop-001",
    quantity: 1,
    variant_id: "laptop-001-16gb-512gb"
  },
  {
    product_id: "mouse-001",
    quantity: 2
  },
  {
    product_id: "keyboard-001",
    quantity: 1,
    custom_attributes: {
      engraving: "John Doe",
      color: "black"
    }
  }
];

for (const item of items) {
  await addItemToCart(newCart.cart_id, item);
}
```

### 3. Update Cart Items

```typescript
// Cập nhật số lượng sản phẩm trong giỏ
async function updateCartItem(cartId: string, itemId: string, updates: Partial<CartItem>) {
  try {
    const result = await apiClient.updateCartItem({
      cart_id: cartId,
      item_id: itemId,
      ...updates
    });
    
    if (result.success) {
      console.log('Updated cart item:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to update cart item:', error.message);
    throw error;
  }
}

// Ví dụ: Tăng số lượng laptop từ 1 lên 2
await updateCartItem(newCart.cart_id, 'item-001', {
  quantity: 2
});

// Ví dụ: Thay đổi variant của sản phẩm
await updateCartItem(newCart.cart_id, 'item-001', {
  variant_id: "laptop-001-32gb-1tb"
});
```

### 4. Remove Items from Cart

```typescript
// Xóa sản phẩm khỏi giỏ hàng
async function removeCartItem(cartId: string, itemId: string) {
  try {
    const result = await apiClient.removeCartItem({
      cart_id: cartId,
      item_id: itemId
    });
    
    if (result.success) {
      console.log('Removed item from cart');
      return true;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to remove cart item:', error.message);
    throw error;
  }
}

// Sử dụng
await removeCartItem(newCart.cart_id, 'item-002');
```

## 💰 Cart Calculations

### 5. Calculate Cart Total

```typescript
// Tính tổng tiền giỏ hàng với pricing rules
async function calculateCartTotal(cartId: string, options?: CalculationOptions) {
  try {
    const result = await apiClient.calculateCartTotal({
      cart_id: cartId,
      apply_pricing_rules: options?.apply_pricing_rules ?? true,
      include_tax: options?.include_tax ?? true,
      shipping_address: options?.shipping_address,
      coupon_codes: options?.coupon_codes
    });
    
    if (result.success) {
      const calculation = result.data;
      
      console.log('Cart Calculation:');
      console.log(`- Subtotal: ${calculation.subtotal.toLocaleString()} VND`);
      console.log(`- Discount: ${calculation.total_discount.toLocaleString()} VND`);
      console.log(`- Tax: ${calculation.tax_amount.toLocaleString()} VND`);
      console.log(`- Shipping: ${calculation.shipping_cost.toLocaleString()} VND`);
      console.log(`- Total: ${calculation.total.toLocaleString()} VND`);
      
      return calculation;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to calculate cart total:', error.message);
    throw error;
  }
}

// Sử dụng với options
const calculation = await calculateCartTotal(newCart.cart_id, {
  apply_pricing_rules: true,
  include_tax: true,
  shipping_address: {
    city: "Ho Chi Minh City",
    district: "District 1",
    country: "Vietnam"
  },
  coupon_codes: ["WELCOME10", "FREESHIP"]
});
```

### 6. Apply Coupon Codes

```typescript
// Áp dụng mã giảm giá
async function applyCouponToCart(cartId: string, couponCode: string) {
  try {
    const result = await apiClient.applyCoupon({
      cart_id: cartId,
      coupon_code: couponCode
    });
    
    if (result.success) {
      const couponResult = result.data;
      
      if (couponResult.valid) {
        console.log(`Applied coupon: ${couponCode}`);
        console.log(`Discount: ${couponResult.discount_amount.toLocaleString()} VND`);
        return couponResult;
      } else {
        console.log(`Invalid coupon: ${couponResult.error_message}`);
        return null;
      }
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to apply coupon:', error.message);
    throw error;
  }
}

// Sử dụng
const couponResult = await applyCouponToCart(newCart.cart_id, "WELCOME10");
if (couponResult) {
  console.log('Coupon applied successfully');
}
```

### 7. Remove Coupon

```typescript
// Xóa mã giảm giá
async function removeCouponFromCart(cartId: string, couponCode: string) {
  try {
    const result = await apiClient.removeCoupon({
      cart_id: cartId,
      coupon_code: couponCode
    });
    
    if (result.success) {
      console.log(`Removed coupon: ${couponCode}`);
      return true;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to remove coupon:', error.message);
    throw error;
  }
}

// Sử dụng
await removeCouponFromCart(newCart.cart_id, "WELCOME10");
```

## 🔄 Advanced Cart Management

### 8. Merge Carts

```typescript
// Gộp giỏ hàng (khi khách hàng đăng nhập)
async function mergeCarts(sourceCartId: string, targetCartId: string) {
  try {
    const result = await apiClient.mergeCarts({
      source_cart_id: sourceCartId,
      target_cart_id: targetCartId,
      merge_strategy: "combine", // "combine" | "replace" | "keep_target"
      handle_duplicates: "increase_quantity" // "increase_quantity" | "keep_existing" | "replace"
    });
    
    if (result.success) {
      console.log('Merged carts successfully');
      console.log('Merged cart:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to merge carts:', error.message);
    throw error;
  }
}

// Sử dụng khi khách hàng đăng nhập
const guestCartId = "guest-cart-001";
const customerCartId = "customer-cart-001";
const mergedCart = await mergeCarts(guestCartId, customerCartId);
```

### 9. Save Cart for Later

```typescript
// Lưu giỏ hàng để mua sau
async function saveCartForLater(cartId: string, customerId: string) {
  try {
    const result = await apiClient.saveCart({
      cart_id: cartId,
      customer_id: customerId,
      save_type: "wishlist", // "wishlist" | "saved_for_later"
      expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    });
    
    if (result.success) {
      console.log('Saved cart for later');
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to save cart:', error.message);
    throw error;
  }
}

// Sử dụng
const savedCart = await saveCartForLater(newCart.cart_id, "customer-001");
```

### 10. Restore Saved Cart

```typescript
// Khôi phục giỏ hàng đã lưu
async function restoreSavedCart(savedCartId: string, newCartId?: string) {
  try {
    const result = await apiClient.restoreCart({
      saved_cart_id: savedCartId,
      target_cart_id: newCartId,
      restore_mode: "create_new" // "create_new" | "merge_with_existing"
    });
    
    if (result.success) {
      console.log('Restored saved cart');
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to restore cart:', error.message);
    throw error;
  }
}

// Sử dụng
const restoredCart = await restoreSavedCart(savedCart.saved_cart_id);
```

## 📊 Cart Analytics

### 11. Get Cart Analytics

```typescript
// Lấy thống kê giỏ hàng
async function getCartAnalytics(cartId: string) {
  try {
    const result = await apiClient.getCartAnalytics({
      cart_id: cartId,
      include_metrics: [
        'item_count',
        'total_value',
        'discount_amount',
        'abandonment_risk',
        'conversion_probability'
      ]
    });
    
    if (result.success) {
      const analytics = result.data;
      
      console.log('Cart Analytics:');
      console.log(`- Item Count: ${analytics.item_count}`);
      console.log(`- Total Value: ${analytics.total_value.toLocaleString()} VND`);
      console.log(`- Discount Amount: ${analytics.discount_amount.toLocaleString()} VND`);
      console.log(`- Abandonment Risk: ${analytics.abandonment_risk}%`);
      console.log(`- Conversion Probability: ${analytics.conversion_probability}%`);
      
      return analytics;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to get cart analytics:', error.message);
    throw error;
  }
}

// Sử dụng
const analytics = await getCartAnalytics(newCart.cart_id);
```

### 12. Track Cart Events

```typescript
// Theo dõi sự kiện giỏ hàng
class CartEventTracker {
  private events: CartEvent[] = [];
  
  async trackEvent(cartId: string, eventType: string, eventData: any) {
    const event: CartEvent = {
      cart_id: cartId,
      event_type: eventType,
      event_data: eventData,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId()
    };
    
    this.events.push(event);
    
    try {
      await apiClient.trackCartEvent(event);
      console.log(`Tracked event: ${eventType}`);
    } catch (error) {
      console.error('Failed to track event:', error.message);
    }
  }
  
  async trackItemAdded(cartId: string, item: CartItem) {
    await this.trackEvent(cartId, 'item_added', {
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    });
  }
  
  async trackItemRemoved(cartId: string, itemId: string) {
    await this.trackEvent(cartId, 'item_removed', {
      item_id: itemId
    });
  }
  
  async trackCouponApplied(cartId: string, couponCode: string, discountAmount: number) {
    await this.trackEvent(cartId, 'coupon_applied', {
      coupon_code: couponCode,
      discount_amount: discountAmount
    });
  }
  
  async trackCheckoutStarted(cartId: string) {
    await this.trackEvent(cartId, 'checkout_started', {
      total_items: await this.getCartItemCount(cartId),
      total_value: await this.getCartTotal(cartId)
    });
  }
  
  private getSessionId(): string {
    return sessionStorage.getItem('session_id') || 'anonymous';
  }
  
  private async getCartItemCount(cartId: string): Promise<number> {
    const cart = await apiClient.getCart({ cart_id: cartId });
    return cart.data.items.length;
  }
  
  private async getCartTotal(cartId: string): Promise<number> {
    const calculation = await calculateCartTotal(cartId);
    return calculation.total;
  }
}

// Sử dụng
const tracker = new CartEventTracker();

// Track khi thêm sản phẩm
await tracker.trackItemAdded(newCart.cart_id, {
  product_id: "laptop-001",
  quantity: 1,
  price: 15000000
});

// Track khi áp dụng coupon
await tracker.trackCouponApplied(newCart.cart_id, "WELCOME10", 150000);

// Track khi bắt đầu checkout
await tracker.trackCheckoutStarted(newCart.cart_id);
```

## 🚨 Abandoned Cart Recovery

### 13. Detect Abandoned Carts

```typescript
// Phát hiện giỏ hàng bị bỏ
async function detectAbandonedCarts(timeThreshold: number = 24) {
  try {
    const result = await apiClient.getAbandonedCarts({
      time_threshold_hours: timeThreshold,
      min_cart_value: 100000, // Chỉ quan tâm giỏ hàng > 100k
      include_guest_carts: true,
      status: 'active'
    });
    
    if (result.success) {
      const abandonedCarts = result.data;
      
      console.log(`Found ${abandonedCarts.length} abandoned carts`);
      
      for (const cart of abandonedCarts) {
        console.log(`Cart ${cart.cart_id}:`);
        console.log(`- Customer: ${cart.customer_id || 'Guest'}`);
        console.log(`- Value: ${cart.total_value.toLocaleString()} VND`);
        console.log(`- Last Activity: ${cart.last_activity}`);
        console.log(`- Items: ${cart.item_count}`);
      }
      
      return abandonedCarts;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to detect abandoned carts:', error.message);
    throw error;
  }
}

// Sử dụng
const abandonedCarts = await detectAbandonedCarts(24); // Carts abandoned for 24+ hours
```

### 14. Send Recovery Emails

```typescript
// Gửi email khôi phục giỏ hàng
async function sendCartRecoveryEmail(cartId: string, emailTemplate: string) {
  try {
    const result = await apiClient.sendCartRecoveryEmail({
      cart_id: cartId,
      email_template: emailTemplate,
      personalization: {
        include_cart_items: true,
        include_recommendations: true,
        offer_discount: {
          type: "percentage",
          value: 10,
          expiry_hours: 48
        }
      }
    });
    
    if (result.success) {
      console.log(`Sent recovery email for cart: ${cartId}`);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to send recovery email:', error.message);
    throw error;
  }
}

// Gửi email cho tất cả abandoned carts
for (const cart of abandonedCarts) {
  if (cart.customer_email) {
    await sendCartRecoveryEmail(cart.cart_id, 'abandoned_cart_template');
  }
}
```

### 15. Create Recovery Campaigns

```typescript
// Tạo chiến dịch khôi phục giỏ hàng
async function createRecoveryCampaign(campaignConfig: RecoveryCampaignConfig) {
  try {
    const result = await apiClient.createRecoveryCampaign({
      name: campaignConfig.name,
      description: campaignConfig.description,
      
      // Điều kiện kích hoạt
      triggers: {
        time_threshold_hours: campaignConfig.timeThreshold,
        min_cart_value: campaignConfig.minCartValue,
        customer_segments: campaignConfig.customerSegments
      },
      
      // Chuỗi email
      email_sequence: [
        {
          delay_hours: 1,
          template: 'gentle_reminder',
          subject: 'Bạn quên gì đó trong giỏ hàng?'
        },
        {
          delay_hours: 24,
          template: 'discount_offer',
          subject: 'Giảm 10% cho đơn hàng của bạn!',
          discount: {
            type: 'percentage',
            value: 10,
            expiry_hours: 48
          }
        },
        {
          delay_hours: 72,
          template: 'final_reminder',
          subject: 'Cơ hội cuối cùng - Giảm 15%!',
          discount: {
            type: 'percentage',
            value: 15,
            expiry_hours: 24
          }
        }
      ],
      
      active: true
    });
    
    if (result.success) {
      console.log('Created recovery campaign:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to create recovery campaign:', error.message);
    throw error;
  }
}

// Sử dụng
const campaign = await createRecoveryCampaign({
  name: "Standard Cart Recovery",
  description: "3-email sequence for abandoned cart recovery",
  timeThreshold: 2, // Start after 2 hours
  minCartValue: 50000,
  customerSegments: ['regular', 'vip']
});
```

## 🔧 Cart Utilities

### 16. Cart Validation

```typescript
// Validate giỏ hàng trước checkout
async function validateCart(cartId: string): Promise<CartValidationResult> {
  try {
    const result = await apiClient.validateCart({
      cart_id: cartId,
      checks: [
        'inventory_availability',
        'price_accuracy',
        'shipping_eligibility',
        'coupon_validity',
        'customer_eligibility'
      ]
    });
    
    if (result.success) {
      const validation = result.data;
      
      console.log('Cart Validation Results:');
      console.log(`- Valid: ${validation.is_valid}`);
      
      if (validation.errors.length > 0) {
        console.log('Errors:');
        validation.errors.forEach(error => {
          console.log(`  - ${error.field}: ${error.message}`);
        });
      }
      
      if (validation.warnings.length > 0) {
        console.log('Warnings:');
        validation.warnings.forEach(warning => {
          console.log(`  - ${warning.field}: ${warning.message}`);
        });
      }
      
      return validation;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to validate cart:', error.message);
    throw error;
  }
}

// Sử dụng
const validation = await validateCart(newCart.cart_id);
if (validation.is_valid) {
  console.log('Cart is ready for checkout');
} else {
  console.log('Cart has validation errors');
}
```

### 17. Cart Cleanup

```typescript
// Dọn dẹp giỏ hàng cũ
async function cleanupOldCarts(daysOld: number = 30) {
  try {
    const result = await apiClient.cleanupCarts({
      older_than_days: daysOld,
      status: ['abandoned', 'expired'],
      preserve_customer_carts: true, // Giữ lại giỏ hàng của khách hàng đã đăng ký
      batch_size: 100
    });
    
    if (result.success) {
      console.log(`Cleaned up ${result.data.deleted_count} old carts`);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to cleanup carts:', error.message);
    throw error;
  }
}

// Chạy cleanup hàng ngày
setInterval(async () => {
  await cleanupOldCarts(30);
}, 24 * 60 * 60 * 1000); // Mỗi 24 giờ
```

### 18. Cart Export/Import

```typescript
// Export giỏ hàng để backup hoặc migration
async function exportCart(cartId: string, format: 'json' | 'csv' = 'json') {
  try {
    const result = await apiClient.exportCart({
      cart_id: cartId,
      format: format,
      include_customer_data: true,
      include_pricing_details: true
    });
    
    if (result.success) {
      console.log('Exported cart data');
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to export cart:', error.message);
    throw error;
  }
}

// Import giỏ hàng từ backup
async function importCart(cartData: any, customerId?: string) {
  try {
    const result = await apiClient.importCart({
      cart_data: cartData,
      customer_id: customerId,
      merge_strategy: 'create_new', // 'create_new' | 'merge_existing'
      validate_products: true,
      update_prices: true
    });
    
    if (result.success) {
      console.log('Imported cart:', result.data);
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Failed to import cart:', error.message);
    throw error;
  }
}

// Sử dụng
const exportedData = await exportCart(newCart.cart_id, 'json');
const importedCart = await importCart(exportedData, 'customer-002');
```

## 🎯 Best Practices

### 1. Cart Session Management

```typescript
class CartSessionManager {
  private sessionKey = 'cart_session';
  
  getSessionId(): string {
    let sessionId = localStorage.getItem(this.sessionKey);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem(this.sessionKey, sessionId);
    }
    return sessionId;
  }
  
  private generateSessionId(): string {
    return 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }
  
  async getOrCreateCart(customerId?: string): Promise<Cart> {
    const sessionId = this.getSessionId();
    
    // Tìm cart hiện tại
    let cart = await this.findCartBySession(sessionId);
    
    if (!cart) {
      // Tạo cart mới
      cart = await createCart(customerId);
      await this.associateCartWithSession(cart.cart_id, sessionId);
    }
    
    return cart;
  }
  
  private async findCartBySession(sessionId: string): Promise<Cart | null> {
    try {
      const result = await apiClient.findCartBySession({ session_id: sessionId });
      return result.success ? result.data : null;
    } catch {
      return null;
    }
  }
  
  private async associateCartWithSession(cartId: string, sessionId: string): Promise<void> {
    await apiClient.updateCart({
      cart_id: cartId,
      session_id: sessionId
    });
  }
}

// Sử dụng
const sessionManager = new CartSessionManager();
const cart = await sessionManager.getOrCreateCart();
```

### 2. Cart State Management (React)

```typescript
// React Hook cho cart management
import { useState, useEffect, useContext, createContext } from 'react';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<CartItem>) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: (code: string) => Promise<void>;
  calculateTotal: () => Promise<CartCalculation>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const sessionManager = new CartSessionManager();
  
  useEffect(() => {
    initializeCart();
  }, []);
  
  const initializeCart = async () => {
    setLoading(true);
    try {
      const cart = await sessionManager.getOrCreateCart();
      setCart(cart);
    } catch (error) {
      console.error('Failed to initialize cart:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const addItem = async (item: CartItem) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      await addItemToCart(cart.cart_id, item);
      // Refresh cart
      const updatedCart = await apiClient.getCart({ cart_id: cart.cart_id });
      setCart(updatedCart.data);
    } catch (error) {
      console.error('Failed to add item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const updateItem = async (itemId: string, updates: Partial<CartItem>) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      await updateCartItem(cart.cart_id, itemId, updates);
      // Refresh cart
      const updatedCart = await apiClient.getCart({ cart_id: cart.cart_id });
      setCart(updatedCart.data);
    } catch (error) {
      console.error('Failed to update item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const removeItem = async (itemId: string) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      await removeCartItem(cart.cart_id, itemId);
      // Refresh cart
      const updatedCart = await apiClient.getCart({ cart_id: cart.cart_id });
      setCart(updatedCart.data);
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const applyCoupon = async (code: string) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      await applyCouponToCart(cart.cart_id, code);
      // Refresh cart
      const updatedCart = await apiClient.getCart({ cart_id: cart.cart_id });
      setCart(updatedCart.data);
    } catch (error) {
      console.error('Failed to apply coupon:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const removeCoupon = async (code: string) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      await removeCouponFromCart(cart.cart_id, code);
      // Refresh cart
      const updatedCart = await apiClient.getCart({ cart_id: cart.cart_id });
      setCart(updatedCart.data);
    } catch (error) {
      console.error('Failed to remove coupon:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const calculateTotal = async (): Promise<CartCalculation> => {
    if (!cart) throw new Error('No cart available');
    
    return await calculateCartTotal(cart.cart_id);
  };
  
  const value: CartContextType = {
    cart,
    loading,
    addItem,
    updateItem,
    removeItem,
    applyCoupon,
    removeCoupon,
    calculateTotal
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Sử dụng trong component
function CartComponent() {
  const { cart, loading, addItem, updateItem, removeItem } = useCart();
  
  if (loading) return <div>Loading...</div>;
  if (!cart) return <div>No cart</div>;
  
  return (
    <div>
      <h2>Shopping Cart ({cart.items.length} items)</h2>
      {cart.items.map(item => (
        <div key={item.item_id}>
          <span>{item.product_name}</span>
          <span>Qty: {item.quantity}</span>
          <span>{item.price.toLocaleString()} VND</span>
          <button onClick={() => updateItem(item.item_id, { quantity: item.quantity + 1 })}>
            +
          </button>
          <button onClick={() => updateItem(item.item_id, { quantity: item.quantity - 1 })}>
            -
          </button>
          <button onClick={() => removeItem(item.item_id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

*Các ví dụ này cung cấp foundation hoàn chỉnh để triển khai cart management hiệu quả trong ứng dụng eCommerce của bạn.*