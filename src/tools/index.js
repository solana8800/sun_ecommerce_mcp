export const toolDefinitions = [
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
          enum: ['simple', 'configurable', 'grouped', 'bundle', 'combo', 'virtual', 'gift_card', 'flight_ticket', 'park_ticket', 'hotel_room', 'souvenir', 'gift_item'],
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
          enum: ['simple', 'configurable', 'grouped', 'bundle', 'combo', 'virtual', 'gift_card', 'flight_ticket', 'park_ticket', 'hotel_room', 'souvenir', 'gift_item']
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

  // Pricing Rules Tools
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
    description: 'Lấy thông tin chi tiết về giỏ hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID giỏ hàng' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_cart_summary',
    description: 'Lấy tóm tắt giỏ hàng với tổng tiền',
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
    description: 'Lấy danh sách sản phẩm trong giỏ hàng',
    inputSchema: {
      type: 'object',
      properties: {
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
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
        cartId: { type: 'string', description: 'UUID giỏ hàng' },
      },
      required: ['cartId'],
    },
  },

  // Inventory Management Tools
  {
    name: 'create_inventory',
    description: 'Tạo bản ghi tồn kho mới',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        locationId: { type: 'string', description: 'UUID địa điểm kho' },
        quantity: { type: 'number', minimum: 0, description: 'Số lượng tồn kho' },
        reservedQuantity: { type: 'number', minimum: 0, default: 0 },
        reorderLevel: { type: 'number', minimum: 0, description: 'Mức đặt hàng lại' },
        maxStockLevel: { type: 'number', minimum: 0, description: 'Mức tồn kho tối đa' },
      },
      required: ['productId', 'locationId', 'quantity'],
    },
  },
  {
    name: 'get_inventory_by_product',
    description: 'Lấy thông tin tồn kho theo sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        variantId: { type: 'string', description: 'UUID biến thể sản phẩm' },
        locationId: { type: 'string', description: 'UUID địa điểm kho' },
      },
      required: ['productId'],
    },
  },
  {
    name: 'check_inventory_availability',
    description: 'Kiểm tra tình trạng có sẵn của tồn kho',
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
              locationId: { type: 'string' },
            },
            required: ['productId', 'quantity'],
          },
        },
      },
      required: ['items'],
    },
  },
  {
    name: 'reserve_inventory',
    description: 'Đặt trước tồn kho cho đơn hàng',
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
              locationId: { type: 'string' },
            },
            required: ['productId', 'quantity'],
          },
        },
        orderId: { type: 'string', description: 'UUID đơn hàng' },
        expiresAt: { type: 'string', format: 'date-time', description: 'Thời gian hết hạn đặt trước' },
      },
      required: ['items'],
    },
  },
  {
    name: 'get_inventory',
    description: 'Lấy thông tin chi tiết về tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID bản ghi tồn kho' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_inventory',
    description: 'Liệt kê tất cả bản ghi tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        locationId: { type: 'string', description: 'Lọc theo địa điểm kho' },
        productId: { type: 'string', description: 'Lọc theo sản phẩm' },
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
        id: { type: 'string', description: 'UUID bản ghi tồn kho' },
        quantity: { type: 'number', minimum: 0 },
        reservedQuantity: { type: 'number', minimum: 0 },
        reorderLevel: { type: 'number', minimum: 0 },
        maxStockLevel: { type: 'number', minimum: 0 },
      },
      required: ['id'],
    },
  },

  // Media Management Tools
  {
    name: 'upload_media',
    description: 'Tải lên tệp media (hình ảnh, video)',
    inputSchema: {
      type: 'object',
      properties: {
        file: { type: 'string', description: 'Dữ liệu tệp được mã hóa base64' },
        filename: { type: 'string', description: 'Tên tệp' },
        mimeType: { type: 'string', description: 'Loại MIME của tệp' },
        alt: { type: 'string', description: 'Văn bản thay thế cho hình ảnh' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Thẻ tag cho tệp media' },
      },
      required: ['file', 'filename', 'mimeType'],
    },
  },
  {
    name: 'get_media',
    description: 'Lấy thông tin chi tiết về tệp media',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID tệp media' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_media',
    description: 'Liệt kê tất cả tệp media',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['image', 'video', 'document'], description: 'Lọc theo loại media' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Lọc theo thẻ tag' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'update_media',
    description: 'Cập nhật thông tin metadata của tệp media',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID tệp media' },
        alt: { type: 'string', description: 'Văn bản thay thế' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Thẻ tag' },
        title: { type: 'string', description: 'Tiêu đề tệp media' },
        description: { type: 'string', description: 'Mô tả tệp media' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_media',
    description: 'Xóa tệp media khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID tệp media cần xóa' },
      },
      required: ['id'],
    },
  },

  // Partner Management Tools
  {
    name: 'create_partner',
    description: 'Tạo đối tác mới',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên đối tác' },
        email: { type: 'string', format: 'email', description: 'Email đối tác' },
        phone: { type: 'string', description: 'Số điện thoại' },
        address: { type: 'string', description: 'Địa chỉ' },
        partnerType: {
          type: 'string',
          enum: ['supplier', 'distributor', 'retailer', 'affiliate'],
          description: 'Loại đối tác'
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending'],
          default: 'pending'
        },
        commissionRate: { type: 'number', minimum: 0, maximum: 100, description: 'Tỷ lệ hoa hồng (%)' },
      },
      required: ['name', 'email', 'partnerType'],
    },
  },
  {
    name: 'get_partner',
    description: 'Lấy thông tin chi tiết về đối tác',
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
    description: 'Liệt kê tất cả đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        partnerType: {
          type: 'string',
          enum: ['supplier', 'distributor', 'retailer', 'affiliate']
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending']
        },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
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
        code: { type: 'string', description: 'Mã kênh duy nhất' },
        description: { type: 'string', description: 'Mô tả kênh' },
        channelType: {
          type: 'string',
          enum: ['online', 'retail', 'wholesale', 'marketplace'],
          description: 'Loại kênh bán hàng'
        },
        isActive: { type: 'boolean', default: true },
        currency: { type: 'string', default: 'USD', description: 'Tiền tệ mặc định' },
        taxRate: { type: 'number', minimum: 0, maximum: 100, description: 'Tỷ lệ thuế (%)' },
      },
      required: ['name', 'code', 'channelType'],
    },
  },
  {
    name: 'get_sales_channel',
    description: 'Lấy thông tin chi tiết về kênh bán hàng',
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
    description: 'Lấy thông tin kênh bán hàng theo mã',
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
    description: 'Liệt kê tất cả kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        channelType: {
          type: 'string',
          enum: ['online', 'retail', 'wholesale', 'marketplace']
        },
        isActive: { type: 'boolean' },
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
        description: { type: 'string', description: 'Mô tả kênh' },
        isActive: { type: 'boolean' },
        currency: { type: 'string', description: 'Tiền tệ mặc định' },
        taxRate: { type: 'number', minimum: 0, maximum: 100 },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_sales_channel',
    description: 'Xóa kênh bán hàng',
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
    description: 'Lấy thống kê kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
        startDate: { type: 'string', format: 'date', description: 'Ngày bắt đầu' },
        endDate: { type: 'string', format: 'date', description: 'Ngày kết thúc' },
      },
      required: ['id'],
    },
  },

  // Translation Management Tools
  {
    name: 'create_translation',
    description: 'Tạo bản dịch mới',
    inputSchema: {
      type: 'object',
      properties: {
        entityType: {
          type: 'string',
          enum: ['product', 'category', 'product_attribute', 'product_variant'],
          description: 'Loại thực thể'
        },
        entityId: { type: 'string', description: 'UUID thực thể' },
        language: { type: 'string', description: 'Mã ngôn ngữ (ISO 639-1)' },
        data: { type: 'object', description: 'Dữ liệu bản dịch' },
      },
      required: ['entityType', 'entityId', 'language', 'data'],
    },
  },
  {
    name: 'get_translation',
    description: 'Lấy bản dịch theo thực thể và ngôn ngữ',
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
    description: 'Lấy danh sách ngôn ngữ được hỗ trợ',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // Product Translation Tools
  {
    name: 'create_product_translation',
    description: 'Tạo bản dịch cho sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        productId: { type: 'string', description: 'UUID sản phẩm' },
        language: { type: 'string', description: 'Mã ngôn ngữ' },
        name: { type: 'string', description: 'Tên sản phẩm' },
        description: { type: 'string', description: 'Mô tả sản phẩm' },
        shortDescription: { type: 'string', description: 'Mô tả ngắn' },
        metaTitle: { type: 'string', description: 'Meta title cho SEO' },
        metaDescription: { type: 'string', description: 'Meta description cho SEO' },
        slug: { type: 'string', description: 'Slug thân thiện với URL' },
      },
      required: ['productId', 'language', 'name'],
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
        name: { type: 'string', description: 'Tên sản phẩm' },
        description: { type: 'string', description: 'Mô tả sản phẩm' },
        shortDescription: { type: 'string', description: 'Mô tả ngắn' },
        metaTitle: { type: 'string', description: 'Meta title cho SEO' },
        metaDescription: { type: 'string', description: 'Meta description cho SEO' },
        slug: { type: 'string', description: 'Slug thân thiện với URL' },
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

  // Category Translation Tools
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

  // Product Attribute Translation Tools
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

  // Product Variant Translation Tools
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

  // Bulk Translation Tools
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

  // Attribute Management Tools
  {
    name: 'create_attribute',
    description: 'Tạo thuộc tính sản phẩm mới',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên thuộc tính' },
        code: { type: 'string', description: 'Mã thuộc tính duy nhất' },
        type: {
          type: 'string',
          enum: ['text', 'number', 'boolean', 'select', 'multiselect', 'date'],
          description: 'Loại dữ liệu thuộc tính'
        },
        isRequired: { type: 'boolean', default: false },
        isFilterable: { type: 'boolean', default: false },
        isSearchable: { type: 'boolean', default: false },
        sortOrder: { type: 'number', default: 0 },
        description: { type: 'string', description: 'Mô tả thuộc tính' },
      },
      required: ['name', 'code', 'type'],
    },
  },
  {
    name: 'get_attribute',
    description: 'Lấy thông tin chi tiết về thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính' },
      },
      required: ['id'],
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
          enum: ['text', 'number', 'boolean', 'select', 'multiselect', 'date']
        },
        isRequired: { type: 'boolean' },
        isFilterable: { type: 'boolean' },
        page: { type: 'number', default: 1 },
        pageSize: { type: 'number', default: 20 },
      },
    },
  },
  {
    name: 'create_attribute_value',
    description: 'Tạo giá trị cho thuộc tính select/multiselect',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        value: { type: 'string', description: 'Giá trị thuộc tính' },
        label: { type: 'string', description: 'Nhãn hiển thị' },
        sortOrder: { type: 'number', default: 0 },
      },
      required: ['attributeId', 'value', 'label'],
    },
  },
  {
    name: 'get_attribute_values',
    description: 'Lấy tất cả giá trị của thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
      },
      required: ['attributeId'],
    },
  },
  {
    name: 'get_attribute_by_name',
    description: 'Lấy thuộc tính theo tên',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên thuộc tính' },
      },
      required: ['name'],
    },
  },
  {
    name: 'update_attribute',
    description: 'Cập nhật thông tin thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính' },
        name: { type: 'string', description: 'Tên thuộc tính' },
        isRequired: { type: 'boolean' },
        isFilterable: { type: 'boolean' },
        isSearchable: { type: 'boolean' },
        sortOrder: { type: 'number' },
        description: { type: 'string' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_attribute',
    description: 'Xóa thuộc tính sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID thuộc tính cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'update_attribute_value',
    description: 'Cập nhật giá trị thuộc tính',
    inputSchema: {
      type: 'object',
      properties: {
        attributeId: { type: 'string', description: 'UUID thuộc tính' },
        valueId: { type: 'string', description: 'UUID giá trị thuộc tính' },
        value: { type: 'string', description: 'Giá trị thuộc tính' },
        label: { type: 'string', description: 'Nhãn hiển thị' },
        sortOrder: { type: 'number' },
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

  // Inventory Management Tools
  {
    name: 'list_inventories',
    description: 'Lấy danh sách tồn kho có phân trang và bộ lọc',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
        product_id: { type: 'string', description: 'Lọc theo ID sản phẩm' },
        variant_id: { type: 'string', description: 'Lọc theo ID variant' },
        channel_id: { type: 'string', description: 'Lọc theo ID kênh bán' },
        partner_id: { type: 'string', description: 'Lọc theo ID đối tác' },
        allocation_type: { type: 'string', description: 'Lọc theo loại phân bổ' },
        location: { type: 'string', description: 'Lọc theo vị trí kho' },
      },
    },
  },
  {
    name: 'create_inventory',
    description: 'Tạo mới bản ghi quản lý tồn kho cho sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'UUID sản phẩm' },
        variant_id: { type: 'string', description: 'UUID variant sản phẩm' },
        quantity: { type: 'number', minimum: 0, description: 'Số lượng tồn kho' },
        location: { type: 'string', description: 'Vị trí kho' },
        allocation_type: { type: 'string', enum: ['GENERAL', 'CHANNEL', 'PARTNER'], description: 'Loại phân bổ' },
        channel_id: { type: 'string', description: 'UUID kênh bán (nếu allocation_type = CHANNEL)' },
        partner_id: { type: 'string', description: 'UUID đối tác (nếu allocation_type = PARTNER)' },
      },
      required: ['product_id', 'quantity', 'location', 'allocation_type'],
    },
  },
  {
    name: 'get_inventory',
    description: 'Lấy thông tin chi tiết về một bản ghi tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID bản ghi tồn kho' },
      },
      required: ['id'],
    },
  },
  {
    name: 'update_inventory',
    description: 'Cập nhật thông tin tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID bản ghi tồn kho' },
        quantity: { type: 'number', minimum: 0, description: 'Số lượng tồn kho mới' },
        location: { type: 'string', description: 'Vị trí kho' },
        reserved_quantity: { type: 'number', minimum: 0, description: 'Số lượng đã đặt trước' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_inventory',
    description: 'Xóa bản ghi tồn kho',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID bản ghi tồn kho cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'bulk_update_inventory',
    description: 'Cập nhật nhiều bản ghi tồn kho cùng một lúc',
    inputSchema: {
      type: 'object',
      properties: {
        updates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'UUID bản ghi tồn kho' },
              quantity: { type: 'number', minimum: 0 },
              location: { type: 'string' },
              reserved_quantity: { type: 'number', minimum: 0 },
            },
            required: ['id'],
          },
        },
      },
      required: ['updates'],
    },
  },
  {
    name: 'get_inventory_by_allocation',
    description: 'Lấy danh sách tồn kho được nhóm theo loại phân bổ',
    inputSchema: {
      type: 'object',
      properties: {
        allocation_type: { type: 'string', enum: ['GENERAL', 'CHANNEL', 'PARTNER'], description: 'Loại phân bổ' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        page_size: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['allocation_type'],
    },
  },
  {
    name: 'check_inventory_availability',
    description: 'Kiểm tra xem có đủ tồn kho cho sản phẩm/variant hay không',
    inputSchema: {
      type: 'object',
      properties: {
        variant_id: { type: 'string', description: 'UUID variant sản phẩm' },
        quantity: { type: 'number', minimum: 1, description: 'Số lượng cần kiểm tra' },
        channel_id: { type: 'string', description: 'UUID kênh bán' },
        partner_id: { type: 'string', description: 'UUID đối tác' },
        location: { type: 'string', description: 'Vị trí kho' },
      },
      required: ['variant_id', 'quantity'],
    },
  },
  {
    name: 'create_inventory_movement',
    description: 'Ghi nhận các biến động tồn kho (nhập/xuất/chuyển kho)',
    inputSchema: {
      type: 'object',
      properties: {
        inventory_id: { type: 'string', description: 'UUID bản ghi tồn kho' },
        type: { type: 'string', enum: ['IN', 'OUT', 'TRANSFER'], description: 'Loại biến động' },
        quantity: { type: 'number', description: 'Số lượng biến động (dương cho IN, âm cho OUT)' },
        reason: { type: 'string', description: 'Lý do biến động' },
        reference_id: { type: 'string', description: 'ID tham chiếu (đơn hàng, phiếu nhập, v.v.)' },
        notes: { type: 'string', description: 'Ghi chú thêm' },
      },
      required: ['inventory_id', 'type', 'quantity', 'reason'],
    },
  },
  {
    name: 'get_inventory_by_product',
    description: 'Lấy danh sách tồn kho của tất cả variant thuộc sản phẩm',
    inputSchema: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'UUID sản phẩm' },
      },
      required: ['product_id'],
    },
  },
  {
    name: 'get_inventory_by_variant',
    description: 'Lấy danh sách tồn kho của một variant cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        variant_id: { type: 'string', description: 'UUID variant sản phẩm' },
      },
      required: ['variant_id'],
    },
  },
  {
    name: 'reserve_inventory',
    description: 'Đặt trước tồn kho cho kênh bán hoặc đối tác cụ thể',
    inputSchema: {
      type: 'object',
      properties: {
        variant_id: { type: 'string', description: 'UUID variant sản phẩm' },
        quantity: { type: 'number', minimum: 1, description: 'Số lượng cần đặt trước' },
        channel_id: { type: 'string', description: 'UUID kênh bán' },
        partner_id: { type: 'string', description: 'UUID đối tác' },
        reservation_expires_at: { type: 'string', format: 'date-time', description: 'Thời gian hết hạn đặt trước' },
        reference_id: { type: 'string', description: 'ID tham chiếu (đơn hàng, giỏ hàng)' },
      },
      required: ['variant_id', 'quantity'],
    },
  },
  {
    name: 'release_inventory_reservation',
    description: 'Hủy việc đặt trước tồn kho đã thực hiện trước đó',
    inputSchema: {
      type: 'object',
      properties: {
        variant_id: { type: 'string', description: 'UUID variant sản phẩm' },
        quantity: { type: 'number', minimum: 1, description: 'Số lượng cần hủy đặt trước' },
        channel_id: { type: 'string', description: 'UUID kênh bán' },
        partner_id: { type: 'string', description: 'UUID đối tác' },
        reference_id: { type: 'string', description: 'ID tham chiếu (đơn hàng, giỏ hàng)' },
      },
      required: ['variant_id', 'quantity'],
    },
  },
  {
    name: 'get_inventory_statistics',
    description: 'Lấy thống kê tồn kho tổng quan',
    inputSchema: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'Lọc theo UUID sản phẩm' },
        category_id: { type: 'string', description: 'Lọc theo UUID danh mục' },
        location: { type: 'string', description: 'Lọc theo vị trí kho' },
        allocation_type: { type: 'string', enum: ['GENERAL', 'CHANNEL', 'PARTNER'], description: 'Lọc theo loại phân bổ' },
      },
    },
  },

  // Land Management Tools
  {
    name: 'list_lands',
    description: 'Lấy danh sách các vùng đất/khu vực với phân trang và bộ lọc',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
        country: { type: 'string', description: 'Lọc theo quốc gia' },
        province: { type: 'string', description: 'Lọc theo tỉnh/thành' },
        is_active: { type: 'boolean', description: 'Lọc theo trạng thái hoạt động' },
        search: { type: 'string', description: 'Tìm kiếm theo tên hoặc mô tả' },
      },
    },
  },
  {
    name: 'create_land',
    description: 'Tạo mới một vùng đất/khu vực',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên vùng đất' },
        code: { type: 'string', description: 'Mã vùng đất duy nhất' },
        description: { type: 'string', description: 'Mô tả vùng đất' },
        country: { type: 'string', description: 'Quốc gia' },
        province: { type: 'string', description: 'Tỉnh/thành phố' },
        district: { type: 'string', description: 'Quận/huyện' },
        address: { type: 'string', description: 'Địa chỉ chi tiết' },
        latitude: { type: 'number', description: 'Vĩ độ' },
        longitude: { type: 'number', description: 'Kinh độ' },
        area_size: { type: 'number', description: 'Diện tích (m²)' },
        is_active: { type: 'boolean', default: true, description: 'Trạng thái hoạt động' },
        metadata: { type: 'object', description: 'Thông tin bổ sung' },
      },
      required: ['name', 'code', 'country', 'province'],
    },
  },
  {
    name: 'get_land',
    description: 'Lấy thông tin chi tiết về một vùng đất',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_land_by_code',
    description: 'Lấy thông tin vùng đất theo mã code',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Mã vùng đất' },
      },
      required: ['code'],
    },
  },
  {
    name: 'update_land',
    description: 'Cập nhật thông tin vùng đất',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất' },
        name: { type: 'string', description: 'Tên vùng đất' },
        description: { type: 'string', description: 'Mô tả vùng đất' },
        country: { type: 'string', description: 'Quốc gia' },
        province: { type: 'string', description: 'Tỉnh/thành phố' },
        district: { type: 'string', description: 'Quận/huyện' },
        address: { type: 'string', description: 'Địa chỉ chi tiết' },
        latitude: { type: 'number', description: 'Vĩ độ' },
        longitude: { type: 'number', description: 'Kinh độ' },
        area_size: { type: 'number', description: 'Diện tích (m²)' },
        is_active: { type: 'boolean', description: 'Trạng thái hoạt động' },
        metadata: { type: 'object', description: 'Thông tin bổ sung' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_land',
    description: 'Xóa vùng đất khỏi hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất cần xóa' },
      },
      required: ['id'],
    },
  },
  {
    name: 'search_lands',
    description: 'Tìm kiếm vùng đất theo từ khóa',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Từ khóa tìm kiếm' },
        country: { type: 'string', description: 'Lọc theo quốc gia' },
        province: { type: 'string', description: 'Lọc theo tỉnh/thành' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_lands_by_country',
    description: 'Lấy danh sách vùng đất theo quốc gia',
    inputSchema: {
      type: 'object',
      properties: {
        country: { type: 'string', description: 'Tên quốc gia' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['country'],
    },
  },
  {
    name: 'get_lands_by_province',
    description: 'Lấy danh sách vùng đất theo tỉnh/thành phố',
    inputSchema: {
      type: 'object',
      properties: {
        province: { type: 'string', description: 'Tên tỉnh/thành phố' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['province'],
    },
  },
  {
    name: 'activate_land',
    description: 'Kích hoạt vùng đất',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất' },
      },
      required: ['id'],
    },
  },
  {
    name: 'deactivate_land',
    description: 'Vô hiệu hóa vùng đất',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_land_parks',
    description: 'Lấy danh sách công viên thuộc vùng đất',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_land_statistics',
    description: 'Lấy thống kê của vùng đất',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID vùng đất' },
      },
      required: ['id'],
    },
  },

  // Partner Management Tools
  {
    name: 'list_partners',
    description: 'Lấy danh sách đối tác với phân trang và bộ lọc',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
        name: { type: 'string', description: 'Lọc theo tên đối tác' },
        type: { type: 'string', description: 'Lọc theo loại đối tác' },
        tier: { type: 'string', description: 'Lọc theo cấp độ đối tác' },
        is_active: { type: 'boolean', description: 'Lọc theo trạng thái hoạt động' },
        country: { type: 'string', description: 'Lọc theo quốc gia' },
        search: { type: 'string', description: 'Tìm kiếm theo tên hoặc mã đối tác' },
      },
    },
  },
  {
    name: 'create_partner',
    description: 'Tạo mới đối tác trong hệ thống',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên đối tác' },
        code: { type: 'string', description: 'Mã đối tác duy nhất' },
        type: { type: 'string', description: 'Loại đối tác (DISTRIBUTOR, RETAILER, SUPPLIER)' },
        tier: { type: 'string', description: 'Cấp độ đối tác (BRONZE, SILVER, GOLD, PLATINUM)' },
        email: { type: 'string', description: 'Email liên hệ' },
        phone: { type: 'string', description: 'Số điện thoại' },
        address: { type: 'string', description: 'Địa chỉ' },
        country: { type: 'string', description: 'Quốc gia' },
        province: { type: 'string', description: 'Tỉnh/thành phố' },
        contact_person: { type: 'string', description: 'Người liên hệ' },
        tax_code: { type: 'string', description: 'Mã số thuế' },
        commission_rate: { type: 'number', description: 'Tỷ lệ hoa hồng (%)' },
        credit_limit: { type: 'number', description: 'Hạn mức tín dụng' },
        payment_terms: { type: 'string', description: 'Điều khoản thanh toán' },
        is_active: { type: 'boolean', default: true, description: 'Trạng thái hoạt động' },
        metadata: { type: 'object', description: 'Thông tin bổ sung' },
      },
      required: ['name', 'code', 'type', 'tier'],
    },
  },
  {
    name: 'get_partner',
    description: 'Lấy thông tin chi tiết về một đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_partner_by_code',
    description: 'Lấy thông tin đối tác theo mã code',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Mã đối tác' },
      },
      required: ['code'],
    },
  },
  {
    name: 'update_partner',
    description: 'Cập nhật thông tin đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
        name: { type: 'string', description: 'Tên đối tác' },
        type: { type: 'string', description: 'Loại đối tác' },
        tier: { type: 'string', description: 'Cấp độ đối tác' },
        email: { type: 'string', description: 'Email liên hệ' },
        phone: { type: 'string', description: 'Số điện thoại' },
        address: { type: 'string', description: 'Địa chỉ' },
        country: { type: 'string', description: 'Quốc gia' },
        province: { type: 'string', description: 'Tỉnh/thành phố' },
        contact_person: { type: 'string', description: 'Người liên hệ' },
        tax_code: { type: 'string', description: 'Mã số thuế' },
        commission_rate: { type: 'number', description: 'Tỷ lệ hoa hồng (%)' },
        credit_limit: { type: 'number', description: 'Hạn mức tín dụng' },
        payment_terms: { type: 'string', description: 'Điều khoản thanh toán' },
        is_active: { type: 'boolean', description: 'Trạng thái hoạt động' },
        metadata: { type: 'object', description: 'Thông tin bổ sung' },
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
  {
    name: 'activate_partner',
    description: 'Kích hoạt đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
      },
      required: ['id'],
    },
  },
  {
    name: 'deactivate_partner',
    description: 'Vô hiệu hóa đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_partner_balance',
    description: 'Lấy thông tin số dư tài khoản của đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_partner_statistics',
    description: 'Lấy thống kê hoạt động của đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID đối tác' },
        from_date: { type: 'string', description: 'Ngày bắt đầu (YYYY-MM-DD)' },
        to_date: { type: 'string', description: 'Ngày kết thúc (YYYY-MM-DD)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_partner_tier_benefits',
    description: 'Lấy danh sách quyền lợi theo cấp độ đối tác',
    inputSchema: {
      type: 'object',
      properties: {
        tier: { type: 'string', description: 'Cấp độ đối tác (BRONZE, SILVER, GOLD, PLATINUM)' },
      },
      required: ['tier'],
    },
  },
  {
    name: 'search_partners',
    description: 'Tìm kiếm đối tác theo từ khóa',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Từ khóa tìm kiếm' },
        type: { type: 'string', description: 'Lọc theo loại đối tác' },
        tier: { type: 'string', description: 'Lọc theo cấp độ' },
        country: { type: 'string', description: 'Lọc theo quốc gia' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_partners_by_type',
    description: 'Lấy danh sách đối tác theo loại',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Loại đối tác (DISTRIBUTOR, RETAILER, SUPPLIER)' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['type'],
    },
  },
  {
    name: 'get_partners_by_tier',
    description: 'Lấy danh sách đối tác theo cấp độ',
    inputSchema: {
      type: 'object',
      properties: {
        tier: { type: 'string', description: 'Cấp độ đối tác (BRONZE, SILVER, GOLD, PLATINUM)' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['tier'],
    },
  },

  // Sales Channel Management Tools
  {
    name: 'list_sales_channels',
    description: 'Lấy danh sách kênh bán hàng với phân trang và bộ lọc',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
        name: { type: 'string', description: 'Lọc theo tên kênh bán' },
        type: { type: 'string', description: 'Lọc theo loại kênh bán' },
        is_active: { type: 'boolean', description: 'Lọc theo trạng thái hoạt động' },
        country: { type: 'string', description: 'Lọc theo quốc gia' },
        search: { type: 'string', description: 'Tìm kiếm theo tên hoặc mã kênh' },
      },
    },
  },
  {
    name: 'create_sales_channel',
    description: 'Tạo mới kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Tên kênh bán hàng' },
        code: { type: 'string', description: 'Mã kênh bán duy nhất' },
        type: { type: 'string', description: 'Loại kênh bán (ONLINE, OFFLINE, MARKETPLACE, MOBILE_APP)' },
        description: { type: 'string', description: 'Mô tả kênh bán' },
        url: { type: 'string', description: 'URL kênh bán (nếu có)' },
        country: { type: 'string', description: 'Quốc gia hoạt động' },
        currency: { type: 'string', description: 'Đơn vị tiền tệ' },
        language: { type: 'string', description: 'Ngôn ngữ mặc định' },
        commission_rate: { type: 'number', description: 'Tỷ lệ hoa hồng (%)' },
        is_active: { type: 'boolean', default: true, description: 'Trạng thái hoạt động' },
        settings: { type: 'object', description: 'Cài đặt kênh bán' },
        metadata: { type: 'object', description: 'Thông tin bổ sung' },
      },
      required: ['name', 'code', 'type'],
    },
  },
  {
    name: 'get_sales_channel',
    description: 'Lấy thông tin chi tiết về một kênh bán hàng',
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
    name: 'update_sales_channel',
    description: 'Cập nhật thông tin kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
        name: { type: 'string', description: 'Tên kênh bán hàng' },
        type: { type: 'string', description: 'Loại kênh bán' },
        description: { type: 'string', description: 'Mô tả kênh bán' },
        url: { type: 'string', description: 'URL kênh bán' },
        country: { type: 'string', description: 'Quốc gia hoạt động' },
        currency: { type: 'string', description: 'Đơn vị tiền tệ' },
        language: { type: 'string', description: 'Ngôn ngữ mặc định' },
        commission_rate: { type: 'number', description: 'Tỷ lệ hoa hồng (%)' },
        is_active: { type: 'boolean', description: 'Trạng thái hoạt động' },
        settings: { type: 'object', description: 'Cài đặt kênh bán' },
        metadata: { type: 'object', description: 'Thông tin bổ sung' },
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
    description: 'Lấy thống kê hoạt động của kênh bán hàng',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'UUID kênh bán hàng' },
        from_date: { type: 'string', description: 'Ngày bắt đầu (YYYY-MM-DD)' },
        to_date: { type: 'string', description: 'Ngày kết thúc (YYYY-MM-DD)' },
        metrics: { type: 'array', items: { type: 'string' }, description: 'Các chỉ số cần thống kê' },
      },
      required: ['id'],
    },
  },
  {
    name: 'search_sales_channels',
    description: 'Tìm kiếm kênh bán hàng theo từ khóa',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Từ khóa tìm kiếm' },
        type: { type: 'string', description: 'Lọc theo loại kênh bán' },
        country: { type: 'string', description: 'Lọc theo quốc gia' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_sales_channels_by_type',
    description: 'Lấy danh sách kênh bán hàng theo loại',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', description: 'Loại kênh bán (ONLINE, OFFLINE, MARKETPLACE, MOBILE_APP)' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['type'],
    },
  },
  {
    name: 'get_sales_channels_by_country',
    description: 'Lấy danh sách kênh bán hàng theo quốc gia',
    inputSchema: {
      type: 'object',
      properties: {
        country: { type: 'string', description: 'Tên quốc gia' },
        page: { type: 'number', default: 1, description: 'Số trang' },
        limit: { type: 'number', default: 10, description: 'Số bản ghi mỗi trang' },
      },
      required: ['country'],
    },
  },

  // System Health Tools
  {
    name: 'get_system_health',
    description: 'Kiểm tra tình trạng hệ thống',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_system_info',
    description: 'Lấy thông tin hệ thống',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];