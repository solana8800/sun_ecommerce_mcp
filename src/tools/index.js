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

  // System Tools
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