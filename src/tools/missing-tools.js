// Missing tools that need to be added to complete API coverage
// This file contains all the missing tools identified in the audit

export const missingTools = [
  // Partner Management Tools (8 missing - ENTIRE CONTROLLER)
  {
    name: "create_partner",
    description: "Tạo đối tác kinh doanh mới",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Tên đối tác" },
        email: { type: "string", description: "Email đối tác" },
        phone: { type: "string", description: "Số điện thoại" },
        address: { type: "string", description: "Địa chỉ" },
        tier: {
          type: "string",
          enum: ["bronze", "silver", "gold", "platinum"],
          description: "Cấp độ đối tác",
        },
        status: {
          type: "string",
          enum: ["active", "inactive", "pending", "suspended"],
          description: "Trạng thái đối tác",
        },
        commissionRate: { type: "number", description: "Tỷ lệ hoa hồng (%)" },
      },
      required: ["name", "email"],
    },
  },
  {
    name: "get_partner",
    description: "Lấy thông tin chi tiết về một đối tác cụ thể",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID đối tác" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_partners",
    description: "Liệt kê tất cả đối tác với các bộ lọc tùy chọn",
    inputSchema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["active", "inactive", "pending", "suspended"],
          description: "Lọc theo trạng thái",
        },
        tier: {
          type: "string",
          enum: ["bronze", "silver", "gold", "platinum"],
          description: "Lọc theo cấp độ",
        },
        page: { type: "number", default: 1 },
        pageSize: { type: "number", default: 20 },
      },
    },
  },
  {
    name: "update_partner",
    description: "Cập nhật thông tin đối tác hiện có",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID đối tác" },
        name: { type: "string", description: "Tên đối tác" },
        email: { type: "string", description: "Email đối tác" },
        phone: { type: "string", description: "Số điện thoại" },
        address: { type: "string", description: "Địa chỉ" },
        tier: {
          type: "string",
          enum: ["bronze", "silver", "gold", "platinum"],
        },
        commissionRate: { type: "number", description: "Tỷ lệ hoa hồng (%)" },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_partner",
    description: "Xóa đối tác khỏi hệ thống",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID đối tác cần xóa" },
      },
      required: ["id"],
    },
  },

  // Sales Channel Management Tools (6 missing - ENTIRE CONTROLLER)
  {
    name: "create_sales_channel",
    description: "Tạo kênh bán hàng mới",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Tên kênh bán hàng" },
        code: { type: "string", description: "Mã kênh bán hàng" },
        type: {
          type: "string",
          enum: ["online", "retail", "wholesale", "marketplace"],
          description: "Loại kênh bán hàng",
        },
        description: { type: "string", description: "Mô tả kênh bán hàng" },
        isActive: { type: "boolean", default: true },
        currency: { type: "string", default: "VND", description: "Mã tiền tệ" },
        taxRate: { type: "number", description: "Tỷ lệ thuế (%)" },
      },
      required: ["name", "code", "type"],
    },
  },
  {
    name: "get_sales_channel",
    description: "Lấy thông tin chi tiết về một kênh bán hàng cụ thể",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID kênh bán hàng" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_sales_channels",
    description: "Liệt kê tất cả kênh bán hàng với các bộ lọc tùy chọn",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["online", "retail", "wholesale", "marketplace"],
          description: "Lọc theo loại kênh",
        },
        isActive: {
          type: "boolean",
          description: "Lọc theo trạng thái hoạt động",
        },
        page: { type: "number", default: 1 },
        pageSize: { type: "number", default: 20 },
      },
    },
  },
  {
    name: "update_sales_channel",
    description: "Cập nhật thông tin kênh bán hàng hiện có",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID kênh bán hàng" },
        name: { type: "string", description: "Tên kênh bán hàng" },
        description: { type: "string", description: "Mô tả kênh bán hàng" },
        isActive: { type: "boolean" },
        currency: { type: "string", description: "Mã tiền tệ" },
        taxRate: { type: "number", description: "Tỷ lệ thuế (%)" },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_sales_channel",
    description: "Xóa kênh bán hàng khỏi hệ thống",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID kênh bán hàng cần xóa" },
      },
      required: ["id"],
    },
  },

  // Translation Management Tools (6 missing - ENTIRE CONTROLLER)
  {
    name: "create_translation",
    description: "Tạo bản dịch mới cho sản phẩm hoặc danh mục",
    inputSchema: {
      type: "object",
      properties: {
        entityType: {
          type: "string",
          enum: ["product", "category", "attribute"],
          description: "Loại thực thể cần dịch",
        },
        entityId: { type: "string", description: "UUID thực thể" },
        languageCode: {
          type: "string",
          enum: ["en", "vi", "fr", "de", "ja", "ko", "zh"],
          description: "Mã ngôn ngữ",
        },
        fields: {
          type: "object",
          description: "Các trường cần dịch (name, description, v.v.)",
        },
      },
      required: ["entityType", "entityId", "languageCode", "fields"],
    },
  },
  {
    name: "get_translation",
    description: "Lấy bản dịch cho một thực thể và ngôn ngữ cụ thể",
    inputSchema: {
      type: "object",
      properties: {
        entityId: { type: "string", description: "UUID thực thể" },
        languageCode: { type: "string", description: "Mã ngôn ngữ" },
      },
      required: ["entityId", "languageCode"],
    },
  },
  {
    name: "update_translation",
    description: "Cập nhật bản dịch hiện có",
    inputSchema: {
      type: "object",
      properties: {
        entityId: { type: "string", description: "UUID thực thể" },
        languageCode: { type: "string", description: "Mã ngôn ngữ" },
        fields: {
          type: "object",
          description: "Các trường cần cập nhật",
        },
      },
      required: ["entityId", "languageCode", "fields"],
    },
  },
  {
    name: "delete_translation",
    description: "Xóa bản dịch khỏi hệ thống",
    inputSchema: {
      type: "object",
      properties: {
        entityId: { type: "string", description: "UUID thực thể" },
        languageCode: { type: "string", description: "Mã ngôn ngữ" },
      },
      required: ["entityId", "languageCode"],
    },
  },
  {
    name: "get_supported_languages",
    description: "Lấy danh sách các ngôn ngữ được hỗ trợ",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },

  // Attribute Management Tools (5 missing - ENTIRE CONTROLLER)
  {
    name: "create_attribute",
    description: "Tạo thuộc tính sản phẩm mới",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Tên thuộc tính" },
        type: {
          type: "string",
          enum: ["text", "number", "boolean", "select", "multiselect"],
          description: "Loại thuộc tính",
        },
        isRequired: { type: "boolean", default: false },
        isFilterable: { type: "boolean", default: false },
        description: { type: "string", description: "Mô tả thuộc tính" },
      },
      required: ["name", "type"],
    },
  },
  {
    name: "get_attribute",
    description: "Lấy thông tin chi tiết về một thuộc tính cụ thể",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID thuộc tính" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_attributes",
    description: "Liệt kê tất cả thuộc tính sản phẩm",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["text", "number", "boolean", "select", "multiselect"],
          description: "Lọc theo loại thuộc tính",
        },
        isRequired: {
          type: "boolean",
          description: "Lọc theo thuộc tính bắt buộc",
        },
        page: { type: "number", default: 1 },
        pageSize: { type: "number", default: 20 },
      },
    },
  },
  {
    name: "update_attribute",
    description: "Cập nhật thuộc tính sản phẩm hiện có",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID thuộc tính" },
        name: { type: "string", description: "Tên thuộc tính" },
        isRequired: { type: "boolean" },
        isFilterable: { type: "boolean" },
        description: { type: "string", description: "Mô tả thuộc tính" },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_attribute",
    description: "Xóa thuộc tính sản phẩm khỏi hệ thống",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "UUID thuộc tính cần xóa" },
      },
      required: ["id"],
    },
  },
];
