import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const toolDefinitions: Tool[] = [
  // Product Management Tools
  {
    name: 'create_product',
    description: 'Tạo sản phẩm mới trong nền tảng thương mại điện tử',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên sản phẩm' },
        description: { type: 'string', description: 'Mô tả sản phẩm' },
        sku: { type: 'string', description: 'Mã SKU duy nhất của sản phẩm' },
        productType: {
          type: 'string',
          enum: ['simple', 'configurable', 'bundle', 'grouped', 'virtual'],
          description: 'Loại sản phẩm'
        },
        categoryId: { type: 'string', description: 'UUID danh mục' },
        price: { type: 'number', description: 'Giá cơ bản' },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'draft', 'archived'],
          default: 'draft'
        },
        weight: { type: 'number', description: 'Trọng lượng sản phẩm' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Thẻ tag sản phẩm' },
      },
      required: ['name', 'sku', 'productType'],
    },
  },
  {
    name: 'search_products',
    description: 'Tìm kiếm sản phẩm với các bộ lọc đa dạng',
    inputSchema: {
      type: 'object',
      properties: {
        search: { type: 'string', description: 'Từ khóa tìm kiếm' },
        categoryId: { type: 'string', description: 'Lọc theo UUID danh mục' },
        productType: {
          type: 'string',
          enum: ['simple', 'configurable', 'bundle', 'grouped', 'virtual']
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'draft', 'archived']
        },
        priceMin: { type: 'number', description: 'Bộ lọc giá tối thiểu' },
        priceMax: { type: 'number', description: 'Bộ lọc giá tối đa' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        pageSize: { type: 'number', default: 20, description: 'Số mục trên mỗi trang' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Lấy thông tin chi tiết về một sản phẩm cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID sản phẩm' },
        includeVariants: { type: 'boolean', default: true },
        includeInventory: { type: 'boolean', default: true },
        includePricing: { type: 'boolean', default: true },
      },
      required: ['id'],
    },
  },
  {
    name: 'update_product',
    description: 'Cập nhật sản phẩm hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID sản phẩm' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'draft', 'archived']
        },
        categoryId: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_product',
    description: 'Xóa sản phẩm khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID sản phẩm cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_product_by_handle',
    description: 'Lấy thông tin sản phẩm theo handle/slug',
    inputSchema: {
      type: 'object',
      properties: {
        handle: { type: 'string', description: 'Handle/slug của sản phẩm' },
      },
      required: ['handle'],
    },
  },

  // Category Management Tools
  {
    name: 'create_category',
    description: 'Tạo danh mục sản phẩm mới',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên danh mục' },
        description: { type: 'string', description: 'Mô tả danh mục' },
        parentId: { type: 'string', description: 'UUID danh mục cha' },
        slug: { type: 'string', description: 'Slug thân thiện với URL' },
        isActive: { type: 'boolean', default: true },
        sortOrder: { type: 'number', default: 0 },
      },
      required: ['name', 'slug'],
    },
  },
  {
    name: 'list_categories',
    description: 'Liệt kê tất cả danh mục hoặc lấy cây danh mục',
    inputSchema: {
      type: 'object',
      properties: {
        tree: { type: 'boolean', default: false, description: 'Trả về cấu trúc cây phân cấp' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 50 },
      },
    },
  },
  {
    name: 'get_category',
    description: 'Lấy thông tin chi tiết về một danh mục cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID danh mục' },
      },
      required: ['id'],
    },
  },
  {
    name: 'update_category',
    description: 'Cập nhật thông tin danh mục hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID danh mục' },
        name: { type: 'string', description: 'Tên danh mục' },
        description: { type: 'string', description: 'Mô tả danh mục' },
        parentId: { type: 'string', description: 'UUID danh mục cha' },
        slug: { type: 'string', description: 'Slug thân thiện với URL' },
        isActive: { type: 'boolean' },
        sortOrder: { type: 'number' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_category',
    description: 'Xóa danh mục khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID danh mục cần xóa' },
      },
      required: ['id'],
    },
  },

  // Pricing Rule Tools
  {
    name: 'create_pricing_rule',
    description: 'Tạo quy tắc định giá mới cho giảm giá và khuyến mãi',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên quy tắc' },
        description: { type: 'string', description: 'Mô tả quy tắc' },
        ruleType: {
          type: 'string',
          enum: ['percentage_discount', 'fixed_discount', 'buy_x_get_y', 'tier_pricing', 'bulk_discount']
        },
        discountType: {
          type: 'string',
          enum: ['percentage', 'fixed_amount']
        },
        discountValue: { type: 'number', description: 'Số tiền hoặc phần trăm giảm giá' },
        conditions: {
          type: 'object',
          description: 'Điều kiện quy tắc (số lượng tối thiểu, ID danh mục, v.v.)'
        },
        actions: {
          type: 'object',
          description: 'Hành động quy tắc (phần trăm giảm giá, v.v.)'
        },
        priority: { type: 'number', default: 0 },
        validFrom: { type: 'string', format: 'date-time' },
        validTo: { type: 'string', format: 'date-time' },
        usageLimit: { type: 'number', description: 'Số lần sử dụng tối đa' },
      },
      required: ['name', 'ruleType', 'discountType', 'discountValue', 'validFrom'],
    },
  },
  {
    name: 'get_pricing_rule',
    description: 'Lấy thông tin chi tiết về một quy tắc định giá cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID quy tắc định giá' },
      },
      required: ['id'],
    },
  },
  {
    name: 'update_pricing_rule',
    description: 'Cập nhật quy tắc định giá hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID quy tắc định giá' },
        name: { type: 'string', description: 'Tên quy tắc' },
        description: { type: 'string', description: 'Mô tả quy tắc' },
        discountValue: { type: 'number', description: 'Số tiền hoặc phần trăm giảm giá' },
        conditions: { type: 'object', description: 'Điều kiện quy tắc' },
        actions: { type: 'object', description: 'Hành động quy tắc' },
        priority: { type: 'number' },
        validFrom: { type: 'string', format: 'date-time' },
        validTo: { type: 'string', format: 'date-time' },
        usageLimit: { type: 'number' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_pricing_rule',
    description: 'Xóa quy tắc định giá khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID quy tắc định giá cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'apply_pricing_rules',
    description: 'Tính toán giá với các quy tắc định giá áp dụng',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        quantity: { type: 'number', minimum: 1 },
        basePrice: { type: 'number', minimum: 0 },
        customerId: { type: 'string', description: 'UUID khách hàng' },
        channelId: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['quantity', 'basePrice'],
    },
  },
  {
    name: 'list_pricing_rules',
    description: 'Liệt kê tất cả quy tắc định giá với các bộ lọc tùy chọn',
    inputSchema: {
      type: 'object',
      properties: {
        active: { type: 'boolean', description: 'Lọc theo trạng thái hoạt động' },
        ruleType: {
          type: 'string',
          enum: ['percentage_discount', 'fixed_discount', 'buy_x_get_y', 'tier_pricing', 'bulk_discount']
        },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'validate_pricing_rule',
    description: 'Xác thực cấu hình quy tắc định giá trước khi tạo',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        conditions: { type: 'object' },
        actions: { type: 'object' },
        validFrom: { type: 'string', format: 'date-time' },
        validUntil: { type: 'string', format: 'date-time' },
      },
      required: ['name', 'type', 'conditions', 'actions', 'validFrom'],
    },
  },

  // Cart Management Tools
  {
    name: 'create_cart',
    description: 'Tạo giỏ hàng mới',
    inputSchema: {
      type: 'object',
      properties: {
        customerId: { type: 'string', description: 'UUID khách hàng' },
        channelId: { type: 'string', description: 'UUID kênh bán hàng' },
        currency: { type: 'string', default: 'USD', description: 'Mã tiền tệ' },
      },
      required: ['customerId'],
    },
  },
  {
    name: 'add_cart_item',
    description: 'Thêm sản phẩm vào giỏ hàng',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        quantity: { type: 'number', minimum: 1 },
        customAttributes: { type: 'object', description: 'Thuộc tính tùy chỉnh của sản phẩm' },
      },
      required: ['cartId', 'productId', 'quantity'],
    },
  },
  {
    name: 'update_cart_item',
    description: 'Cập nhật sản phẩm trong giỏ hàng',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
        itemId: { type: 'string', description: 'UUID sản phẩm trong giỏ hàng' },
        quantity: { type: 'number', minimum: 1 },
        customAttributes: { type: 'object', description: 'Thuộc tính tùy chỉnh của sản phẩm' },
      },
      required: ['cartId', 'itemId', 'quantity'],
    },
  },
  {
    name: 'remove_cart_item',
    description: 'Xóa sản phẩm khỏi giỏ hàng',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
        itemId: { type: 'string', description: 'UUID sản phẩm trong giỏ hàng cần xóa' },
      },
      required: ['cartId', 'itemId'],
    },
  },
  {
    name: 'get_cart',
    description: 'Lấy chi tiết giỏ hàng bao gồm sản phẩm và tổng tiền',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
      },
      required: ['cartId'],
    },
  },
  {
    name: 'get_cart_items',
    description: 'Lấy danh sách sản phẩm trong giỏ hàng với phân trang',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        pageSize: { type: 'number', default: 20, description: 'Số mục trên mỗi trang' },
      },
      required: ['cartId'],
    },
  },
  {
    name: 'get_cart_summary',
    description: 'Lấy tóm tắt giỏ hàng với tính toán giá',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
      },
      required: ['cartId'],
    },
  },
  {
    name: 'clear_cart',
    description: 'Xóa tất cả sản phẩm khỏi giỏ hàng',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng cần xóa sạch' },
      },
      required: ['cartId'],
    },
  },

  // Inventory Management Tools
  {
    name: 'create_inventory',
    description: 'Tạo bản ghi tồn kho mới cho sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        quantity: { type: 'number', minimum: 0, description: 'Số lượng tồn kho' },
        reservedQuantity: { type: 'number', minimum: 0, default: 0 },
        lowStockThreshold: { type: 'number', minimum: 0, default: 10 },
        location: { type: 'string', description: 'Vị trí kho' },
      },
      required: ['productId', 'quantity'],
    },
  },
  {
    name: 'check_inventory',
    description: 'Kiểm tra tình trạng tồn kho của sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        quantity: { type: 'number', minimum: 1 },
        location: { type: 'string', description: 'Vị trí kho' },
      },
      required: ['productId', 'quantity'],
    },
  },
  {
    name: 'reserve_inventory',
    description: 'Đặt trước tồn kho cho đơn hàng',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        quantity: { type: 'number', minimum: 1 },
        reservationId: { type: 'string', description: 'ID đặt trước duy nhất' },
        expiresAt: { type: 'string', format: 'date-time' },
      },
      required: ['productId', 'quantity', 'reservationId'],
    },
  },
  {
    name: 'get_inventory',
    description: 'Lấy thông tin tồn kho của sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
      },
      required: ['productId'],
    },
  },
  {
    name: 'list_inventory',
    description: 'Liệt kê tất cả bản ghi tồn kho với các bộ lọc',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'Lọc theo UUID sản phẩm' },
        location: { type: 'string', description: 'Lọc theo vị trí kho' },
        lowStock: { type: 'boolean', description: 'Chỉ hiển thị sản phẩm sắp hết hàng' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_inventory',
    description: 'Cập nhật thông tin tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        quantity: { type: 'number', minimum: 0 },
        reservedQuantity: { type: 'number', minimum: 0 },
        lowStockThreshold: { type: 'number', minimum: 0 },
        location: { type: 'string', description: 'Vị trí kho' },
      },
      required: ['productId'],
    },
  },

  // Media Management Tools
  {
    name: 'upload_media',
    description: 'Tải lên tệp đa phương tiện (hình ảnh, video, tài liệu)',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: ['product', 'category', 'user', 'order']
        },
        entityId: { type: 'string', description: 'UUID thực thể' },
        fileName: { type: 'string', description: 'Tên tệp' },
        mediaType: {
          type: 'string',
          enum: ['image', 'video', 'document', 'audio']
        },
        altText: { type: 'string', description: 'Văn bản thay thế cho khả năng tiếp cận' },
        title: { type: 'string', description: 'Tiêu đề phương tiện' },
      },
      required: ['entityType', 'entityId', 'fileName', 'mediaType'],
    },
  },
  {
    name: 'get_media',
    description: 'Lấy thông tin chi tiết về một tệp đa phương tiện cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID tệp đa phương tiện' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_media',
    description: 'Liệt kê tệp đa phương tiện với các bộ lọc tùy chọn',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: ['product', 'category', 'user', 'order']
        },
        entityId: { type: 'string', description: 'UUID thực thể' },
        mediaType: {
          type: 'string',
          enum: ['image', 'video', 'document', 'audio']
        },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_media',
    description: 'Cập nhật thông tin tệp đa phương tiện',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID tệp đa phương tiện' },
        altText: { type: 'string', description: 'Văn bản thay thế' },
        title: { type: 'string', description: 'Tiêu đề phương tiện' },
        description: { type: 'string', description: 'Mô tả phương tiện' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_media',
    description: 'Xóa tệp đa phương tiện khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID tệp đa phương tiện cần xóa' },
      },
      required: ['id'],
    },
  },

  // Partner Management Tools
  {
    name: 'create_partner',
    description: 'Tạo đối tác kinh doanh mới',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên đối tác' },
        email: { type: 'string', description: 'Email đối tác' },
        phone: { type: 'string', description: 'Số điện thoại' },
        address: { type: 'string', description: 'Địa chỉ' },
        tier: {
          type: 'string',
          enum: ['bronze', 'silver', 'gold', 'platinum'],
          description: 'Cấp độ đối tác'
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending', 'suspended'],
          description: 'Trạng thái đối tác'
        },
        commissionRate: { type: 'number', description: 'Tỷ lệ hoa hồng (%)' },
      },
      required: ['name', 'email'],
    },
  },
  {
    name: 'get_partner',
    description: 'Lấy thông tin chi tiết về một đối tác cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_partners',
    description: 'Liệt kê tất cả đối tác với các bộ lọc tùy chọn',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending', 'suspended'],
          description: 'Lọc theo trạng thái'
        },
        tier: {
          type: 'string',
          enum: ['bronze', 'silver', 'gold', 'platinum'],
          description: 'Lọc theo cấp độ'
        },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_partner',
    description: 'Cập nhật thông tin đối tác hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
        name: { type: 'string', description: 'Tên đối tác' },
        email: { type: 'string', description: 'Email đối tác' },
        phone: { type: 'string', description: 'Số điện thoại' },
        address: { type: 'string', description: 'Địa chỉ' },
        tier: {
          type: 'string',
          enum: ['bronze', 'silver', 'gold', 'platinum']
        },
        commissionRate: { type: 'number', description: 'Tỷ lệ hoa hồng (%)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_partner',
    description: 'Xóa đối tác khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác cần xóa' },
      },
      required: ['id'],
    },
  },

  // Sales Channel Management Tools
  {
    name: 'create_sales_channel',
    description: 'Tạo kênh bán hàng mới',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên kênh bán hàng' },
        code: { type: 'string', description: 'Mã kênh bán hàng' },
        type: {
          type: 'string',
          enum: ['online', 'retail', 'wholesale', 'marketplace'],
          description: 'Loại kênh bán hàng'
        },
        description: { type: 'string', description: 'Mô tả kênh bán hàng' },
        isActive: { type: 'boolean', default: true },
        currency: { type: 'string', default: 'VND', description: 'Mã tiền tệ' },
        taxRate: { type: 'number', description: 'Tỷ lệ thuế (%)' },
      },
      required: ['name', 'code', 'type'],
    },
  },
  {
    name: 'get_sales_channel',
    description: 'Lấy thông tin chi tiết về một kênh bán hàng cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_sales_channels',
    description: 'Liệt kê tất cả kênh bán hàng với các bộ lọc tùy chọn',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['online', 'retail', 'wholesale', 'marketplace'],
          description: 'Lọc theo loại kênh'
        },
        isActive: { type: 'boolean', description: 'Lọc theo trạng thái hoạt động' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_sales_channel',
    description: 'Cập nhật thông tin kênh bán hàng hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
        name: { type: 'string', description: 'Tên kênh bán hàng' },
        description: { type: 'string', description: 'Mô tả kênh bán hàng' },
        isActive: { type: 'boolean' },
        currency: { type: 'string', description: 'Mã tiền tệ' },
        taxRate: { type: 'number', description: 'Tỷ lệ thuế (%)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_sales_channel',
    description: 'Xóa kênh bán hàng khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng cần xóa' },
      },
      required: ['id'],
    },
  },

  // Translation Management Tools
  {
    name: 'create_translation',
    description: 'Tạo bản dịch mới cho sản phẩm hoặc danh mục',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: ['product', 'category', 'attribute'],
          description: 'Loại thực thể cần dịch'
        },
        entityId: { type: 'string', description: 'UUID thực thể' },
        languageCode: {
          type: 'string',
          enum: ['en', 'vi', 'fr', 'de', 'ja', 'ko', 'zh'],
          description: 'Mã ngôn ngữ'
        },
        fields: {
          type: 'object',
          description: 'Các trường cần dịch (name, description, v.v.)'
        },
      },
      required: ['entityType', 'entityId', 'languageCode', 'fields'],
    },
  },
  {
    name: 'get_translation',
    description: 'Lấy bản dịch cho một thực thể và ngôn ngữ cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        entityId: { type: 'string', description: 'UUID thực thể' },
        languageCode: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['entityId', 'languageCode'],
    },
  },
  {
    name: 'update_translation',
    description: 'Cập nhật bản dịch hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        entityId: { type: 'string', description: 'UUID thực thể' },
        languageCode: { type: 'string', description: 'Mã ngôn ngữ' },
        fields: {
          type: 'object',
          description: 'Các trường cần cập nhật'
        },
      },
      required: ['entityId', 'languageCode', 'fields'],
    },
  },
  {
    name: 'delete_translation',
    description: 'Xóa bản dịch khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        entityId: { type: 'string', description: 'UUID thực thể' },
        languageCode: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['entityId', 'languageCode'],
    },
  },
  {
    name: 'get_supported_languages',
    description: 'Lấy danh sách các ngôn ngữ được hỗ trợ',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // Product Attribute Management Tools
  {
    name: 'create_attribute',
    description: 'Tạo thuộc tính sản phẩm mới',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên thuộc tính' },
        type: {
          type: 'string',
          enum: ['text', 'number', 'boolean', 'select', 'multiselect'],
          description: 'Loại thuộc tính'
        },
        isRequired: { type: 'boolean', default: false },
        isFilterable: { type: 'boolean', default: false },
        description: { type: 'string', description: 'Mô tả thuộc tính' },
      },
      required: ['name', 'type'],
    },
  },
  {
    name: 'get_attribute',
    description: 'Lấy thông tin chi tiết về một thuộc tính cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_attribute_by_name',
    description: 'Lấy thông tin thuộc tính theo tên',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên thuộc tính' },
      },
      required: ['name'],
    },
  },
  {
    name: 'list_attributes',
    description: 'Liệt kê tất cả thuộc tính sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['text', 'number', 'boolean', 'select', 'multiselect'],
          description: 'Lọc theo loại thuộc tính'
        },
        isRequired: { type: 'boolean', description: 'Lọc theo thuộc tính bắt buộc' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_attribute',
    description: 'Cập nhật thuộc tính sản phẩm hiện có',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính' },
        name: { type: 'string', description: 'Tên thuộc tính' },
        isRequired: { type: 'boolean' },
        isFilterable: { type: 'boolean' },
        description: { type: 'string', description: 'Mô tả thuộc tính' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_attribute',
    description: 'Xóa thuộc tính sản phẩm khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_attribute_value',
    description: 'Tạo giá trị mới cho thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        value: { type: 'string', description: 'Giá trị thuộc tính' },
        sortOrder: { type: 'number', default: 0, description: 'Thứ tự sắp xếp' },
      },
      required: ['attributeId', 'value'],
    },
  },
  {
    name: 'get_attribute_values',
    description: 'Lấy tất cả giá trị của một thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
      },
      required: ['attributeId'],
    },
  },

  // Sales Channel Management Tools
  {
    name: 'create_sales_channel',
    description: 'Tạo mới kênh bán hàng trong hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên kênh bán hàng' },
        code: { type: 'string', description: 'Mã kênh bán hàng duy nhất' },
        type: {
          type: 'string',
          enum: ['online', 'offline', 'mobile', 'marketplace'],
          description: 'Loại kênh bán hàng'
        },
        description: { type: 'string', description: 'Mô tả kênh bán hàng' },
        configuration: { type: 'object', description: 'Cấu hình kênh bán hàng' },
        isActive: { type: 'boolean', default: true, description: 'Trạng thái hoạt động' },
      },
      required: ['name', 'code', 'type'],
    },
  },
  {
    name: 'get_sales_channel',
    description: 'Lấy thông tin chi tiết về một kênh bán hàng cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_sales_channel_by_code',
    description: 'Lấy thông tin kênh bán hàng theo mã code',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Mã kênh bán hàng' },
      },
      required: ['code'],
    },
  },
  {
    name: 'list_sales_channels',
    description: 'Liệt kê tất cả kênh bán hàng với các bộ lọc',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['online', 'offline', 'mobile', 'marketplace'],
          description: 'Lọc theo loại kênh bán hàng'
        },
        isActive: { type: 'boolean', description: 'Lọc theo trạng thái hoạt động' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_sales_channel',
    description: 'Cập nhật thông tin kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
        name: { type: 'string', description: 'Tên kênh bán hàng' },
        description: { type: 'string', description: 'Mô tả kênh bán hàng' },
        configuration: { type: 'object', description: 'Cấu hình kênh bán hàng' },
        isActive: { type: 'boolean', description: 'Trạng thái hoạt động' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_sales_channel',
    description: 'Xóa kênh bán hàng khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'activate_sales_channel',
    description: 'Kích hoạt kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['id'],
    },
  },
  {
    name: 'deactivate_sales_channel',
    description: 'Vô hiệu hóa kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_sales_channel_statistics',
    description: 'Lấy thống kê của kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['id'],
    },
  },

  // Enhanced Pricing Rules Tools
  {
    name: 'get_pricing_rule_by_name',
    description: 'Lấy thông tin quy tắc định giá theo tên',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên quy tắc định giá' },
      },
      required: ['name'],
    },
  },
  {
    name: 'update_pricing_rule_status',
    description: 'Cập nhật trạng thái quy tắc định giá',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID quy tắc định giá' },
        isActive: { type: 'boolean', description: 'Trạng thái hoạt động' },
      },
      required: ['id', 'isActive'],
    },
  },
  {
    name: 'get_active_pricing_rules',
    description: 'Lấy danh sách quy tắc định giá đang hoạt động',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'bulk_calculate_price',
    description: 'Tính toán giá hàng loạt cho nhiều sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              variantId: { type: 'string' },
              quantity: { type: 'number', minimum: 1 },
              basePrice: { type: 'number', minimum: 0 },
            },
            required: ['productId', 'quantity', 'basePrice'],
          },
        },
        customerId: { type: 'string', description: 'UUID khách hàng' },
        channelId: { type: 'string', description: 'UUID kênh bán hàng' },
      },
      required: ['items'],
    },
  },
  {
    name: 'get_pricing_rules_by_priority',
    description: 'Lấy quy tắc định giá theo độ ưu tiên',
    inputSchema: {
      type: 'object',
      properties: {
        priority: { type: 'number', description: 'Độ ưu tiên' },
      },
      required: ['priority'],
    },
  },
  {
    name: 'bulk_update_pricing_rule_status',
    description: 'Cập nhật trạng thái hàng loạt cho quy tắc định giá',
    inputSchema: {
      type: 'object',
      properties: {
        ruleIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Danh sách UUID quy tắc định giá'
        },
        isActive: { type: 'boolean', description: 'Trạng thái hoạt động' },
      },
      required: ['ruleIds', 'isActive'],
    },
  },
  {
    name: 'get_pricing_rule_stats',
    description: 'Lấy thống kê quy tắc định giá',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID quy tắc định giá' },
      },
      required: ['id'],
    },
  },
  {
    name: 'duplicate_pricing_rule',
    description: 'Sao chép quy tắc định giá',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID quy tắc định giá gốc' },
        newName: { type: 'string', description: 'Tên mới cho quy tắc sao chép' },
      },
      required: ['id', 'newName'],
    },
  },

  // Enhanced Product Attribute Tools
  {
    name: 'update_attribute_value',
    description: 'Cập nhật giá trị thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        valueId: { type: 'string', description: 'UUID giá trị thuộc tính' },
        value: { type: 'string', description: 'Giá trị mới' },
        sortOrder: { type: 'number', description: 'Thứ tự sắp xếp' },
      },
      required: ['attributeId', 'valueId'],
    },
  },
  {
    name: 'delete_attribute_value',
    description: 'Xóa giá trị thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        valueId: { type: 'string', description: 'UUID giá trị thuộc tính cần xóa' },
      },
      required: ['attributeId', 'valueId'],
    },
  },
  {
    name: 'bulk_create_attribute_values',
    description: 'Tạo hàng loạt giá trị thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        values: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: { type: 'string', description: 'Giá trị thuộc tính' },
              sortOrder: { type: 'number', default: 0 },
            },
            required: ['value'],
          },
        },
      },
      required: ['attributeId', 'values'],
    },
  },
  {
    name: 'get_attribute_usage',
    description: 'Lấy thông tin sử dụng thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính' },
      },
      required: ['id'],
    },
  },

  // Translation Management Tools
  {
    name: 'create_product_translation',
    description: 'Tạo bản dịch cho sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ (ví dụ: en, vi)' },
        title: { type: 'string', description: 'Tiêu đề sản phẩm' },
        description: { type: 'string', description: 'Mô tả sản phẩm' },
        metaTitle: { type: 'string', description: 'Meta title cho SEO' },
        metaDescription: { type: 'string', description: 'Meta description cho SEO' },
      },
      required: ['productId', 'language', 'title'],
    },
  },
  {
    name: 'get_product_translation',
    description: 'Lấy bản dịch sản phẩm theo ngôn ngữ',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['productId', 'language'],
    },
  },
  {
    name: 'update_product_translation',
    description: 'Cập nhật bản dịch sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        title: { type: 'string', description: 'Tiêu đề sản phẩm' },
        description: { type: 'string', description: 'Mô tả sản phẩm' },
        metaTitle: { type: 'string', description: 'Meta title cho SEO' },
        metaDescription: { type: 'string', description: 'Meta description cho SEO' },
      },
      required: ['productId', 'language'],
    },
  },
  {
    name: 'delete_product_translation',
    description: 'Xóa bản dịch sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['productId', 'language'],
    },
  },
  {
    name: 'list_product_translations',
    description: 'Liệt kê tất cả bản dịch của sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
      },
      required: ['productId'],
    },
  },
  {
    name: 'create_category_translation',
    description: 'Tạo bản dịch cho danh mục',
    inputSchema: {
      type: 'object',
      properties: {
        categoryId: { type: 'string', description: 'UUID danh mục' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên danh mục' },
        description: { type: 'string', description: 'Mô tả danh mục' },
        metaTitle: { type: 'string', description: 'Meta title cho SEO' },
        metaDescription: { type: 'string', description: 'Meta description cho SEO' },
      },
      required: ['categoryId', 'language', 'name'],
    },
  },
  {
    name: 'get_category_translation',
    description: 'Lấy bản dịch danh mục theo ngôn ngữ',
    inputSchema: {
      type: 'object',
      properties: {
        categoryId: { type: 'string', description: 'UUID danh mục' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['categoryId', 'language'],
    },
  },
  {
    name: 'update_category_translation',
    description: 'Cập nhật bản dịch danh mục',
    inputSchema: {
      type: 'object',
      properties: {
        categoryId: { type: 'string', description: 'UUID danh mục' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên danh mục' },
        description: { type: 'string', description: 'Mô tả danh mục' },
        metaTitle: { type: 'string', description: 'Meta title cho SEO' },
        metaDescription: { type: 'string', description: 'Meta description cho SEO' },
      },
      required: ['categoryId', 'language'],
    },
  },
  {
    name: 'delete_category_translation',
    description: 'Xóa bản dịch danh mục',
    inputSchema: {
      type: 'object',
      properties: {
        categoryId: { type: 'string', description: 'UUID danh mục' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['categoryId', 'language'],
    },
  },
  {
    name: 'list_category_translations',
    description: 'Liệt kê tất cả bản dịch của danh mục',
    inputSchema: {
      type: 'object',
      properties: {
        categoryId: { type: 'string', description: 'UUID danh mục' },
      },
      required: ['categoryId'],
    },
  },
  {
    name: 'create_product_attribute_translation',
    description: 'Tạo bản dịch cho thuộc tính sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên thuộc tính' },
        description: { type: 'string', description: 'Mô tả thuộc tính' },
      },
      required: ['attributeId', 'language', 'name'],
    },
  },
  {
    name: 'get_product_attribute_translation',
    description: 'Lấy bản dịch thuộc tính sản phẩm theo ngôn ngữ',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['attributeId', 'language'],
    },
  },
  {
    name: 'update_product_attribute_translation',
    description: 'Cập nhật bản dịch thuộc tính sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên thuộc tính' },
        description: { type: 'string', description: 'Mô tả thuộc tính' },
      },
      required: ['attributeId', 'language'],
    },
  },
  {
    name: 'delete_product_attribute_translation',
    description: 'Xóa bản dịch thuộc tính sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['attributeId', 'language'],
    },
  },
  {
    name: 'list_product_attribute_translations',
    description: 'Liệt kê tất cả bản dịch của thuộc tính sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
      },
      required: ['attributeId'],
    },
  },
  {
    name: 'create_product_variant_translation',
    description: 'Tạo bản dịch cho biến thể sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên biến thể' },
        description: { type: 'string', description: 'Mô tả biến thể' },
      },
      required: ['variantId', 'language', 'name'],
    },
  },
  {
    name: 'get_product_variant_translation',
    description: 'Lấy bản dịch biến thể sản phẩm theo ngôn ngữ',
    inputSchema: {
      type: 'object',
      properties: {
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['variantId', 'language'],
    },
  },
  {
    name: 'update_product_variant_translation',
    description: 'Cập nhật bản dịch biến thể sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên biến thể' },
        description: { type: 'string', description: 'Mô tả biến thể' },
      },
      required: ['variantId', 'language'],
    },
  },
  {
    name: 'delete_product_variant_translation',
    description: 'Xóa bản dịch biến thể sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
      required: ['variantId', 'language'],
    },
  },
  {
    name: 'list_product_variant_translations',
    description: 'Liệt kê tất cả bản dịch của biến thể sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
      },
      required: ['variantId'],
    },
  },
  {
    name: 'bulk_create_translations',
    description: 'Tạo hàng loạt bản dịch',
    inputSchema: {
      type: 'object',
      properties: {
        translations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              entityType: {
                type: 'string',
                enum: ['product', 'category', 'product_attribute', 'product_variant']
              },
              entityId: { type: 'string' },
              language: { type: 'string' },
              data: { type: 'object' },
            },
            required: ['entityType', 'entityId', 'language', 'data'],
          },
        },
      },
      required: ['translations'],
    },
  },
  {
    name: 'bulk_delete_translations',
    description: 'Xóa hàng loạt bản dịch',
    inputSchema: {
      type: 'object',
      properties: {
        translations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              entityType: {
                type: 'string',
                enum: ['product', 'category', 'product_attribute', 'product_variant']
              },
              entityId: { type: 'string' },
              language: { type: 'string' },
            },
            required: ['entityType', 'entityId', 'language'],
          },
        },
      },
      required: ['translations'],
    },
  },
  {
    name: 'get_translation_stats',
    description: 'Lấy thống kê bản dịch',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: ['product', 'category', 'product_attribute', 'product_variant']
        },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
      },
    },
  },

  // System Tools
  {
    name: 'health_check',
    description: 'Kiểm tra tình trạng sức khỏe của nền tảng thương mại điện tử',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_system_info',
    description: 'Lấy thông tin hệ thống và khả năng',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];
