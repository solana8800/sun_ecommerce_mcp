export const promptDefinitions = [
  {
    name: 'create-product-wizard',
    description: 'Trình hướng dẫn tương tác để hướng dẫn người dùng tạo sản phẩm',
    arguments: [
      {
        name: 'productType',
        description: 'Loại sản phẩm cần tạo (đơn giản, có thể cấu hình, gói, v.v.)',
        required: false,
      },
      {
        name: 'category',
        description: 'Danh mục đích cho sản phẩm',
        required: false,
      },
    ],
  },
  {
    name: 'setup-pricing-rule',
    description: 'Hướng dẫn người dùng thiết lập quy tắc định giá và khuyến mãi',
    arguments: [
      {
        name: 'ruleType',
        description: 'Loại quy tắc định giá (giảm giá theo phần trăm, giảm giá cố định, v.v.)',
        required: false,
      },
      {
        name: 'targetProducts',
        description: 'Sản phẩm hoặc danh mục để áp dụng quy tắc',
        required: false,
      },
    ],
  },
  {
    name: 'troubleshoot-api',
    description: 'Giúp người dùng chẩn đoán và giải quyết các vấn đề tích hợp API',
    arguments: [
      {
        name: 'issue',
        description: 'Loại vấn đề (xác thực, giới hạn tốc độ, xác thực, v.v.)',
        required: false,
      },
      {
        name: 'endpoint',
        description: 'Endpoint API gặp vấn đề',
        required: false,
      },
      {
        name: 'errorCode',
        description: 'Mã trạng thái HTTP hoặc mã lỗi nhận được',
        required: false,
      },
    ],
  },
  {
    name: 'ecommerce-consultant',
    description: 'Hoạt động như một chuyên gia tư vấn chiến lược thương mại điện tử cung cấp lời khuyên kinh doanh',
    arguments: [
      {
        name: 'topic',
        description: 'Lĩnh vực tập trung (chiến lược sản phẩm, định giá, tồn kho, trải nghiệm khách hàng, v.v.)',
        required: false,
      },
      {
        name: 'businessType',
        description: 'Loại hình kinh doanh (B2B, B2C, marketplace, v.v.)',
        required: false,
      },
      {
        name: 'industry',
        description: 'Ngành dọc (thời trang, điện tử, thực phẩm, v.v.)',
        required: false,
      },
    ],
  },
  {
    name: 'optimize-catalog',
    description: 'Cung cấp khuyến nghị để tối ưu hóa cấu trúc danh mục sản phẩm',
    arguments: [
      {
        name: 'catalogSize',
        description: 'Số lượng sản phẩm gần đúng trong danh mục',
        required: false,
      },
      {
        name: 'categories',
        description: 'Số lượng danh mục hiện đang sử dụng',
        required: false,
      },
      {
        name: 'challenges',
        description: 'Những thách thức cụ thể gặp phải với danh mục hiện tại',
        required: false,
      },
    ],
  },
  {
    name: 'pricing-strategy-advisor',
    description: 'Cung cấp lời khuyên chiến lược về mô hình định giá và vị thế cạnh tranh',
    arguments: [
      {
        name: 'pricingModel',
        description: 'Mô hình định giá hiện tại (cố định, động, theo cấp, v.v.)',
        required: false,
      },
      {
        name: 'competitivePosition',
        description: 'Vị thế so với đối thủ cạnh tranh (cao cấp, giá trị, ngân sách)',
        required: false,
      },
      {
        name: 'margins',
        description: 'Biên lợi nhuận mục tiêu',
        required: false,
      },
    ],
  },
  {
    name: 'inventory-optimization',
    description: 'Giúp tối ưu hóa quản lý tồn kho và giảm thiểu tình trạng hết hàng/tồn kho dư thừa',
    arguments: [
      {
        name: 'inventoryTurnover',
        description: 'Tỷ lệ luân chuyển tồn kho hiện tại',
        required: false,
      },
      {
        name: 'stockoutFrequency',
        description: 'Tần suất hết hàng xảy ra',
        required: false,
      },
      {
        name: 'seasonality',
        description: 'Liệu sản phẩm có mô hình nhu cầu theo mùa hay không',
        required: false,
      },
    ],
  },
  {
    name: 'api-integration-planner',
    description: 'Lập kế hoạch và thiết kế kiến trúc tích hợp API',
    arguments: [
      {
        name: 'integrationType',
        description: 'Loại tích hợp (frontend, mobile, bên thứ ba, v.v.)',
        required: false,
      },
      {
        name: 'expectedVolume',
        description: 'Khối lượng cuộc gọi API dự kiến',
        required: false,
      },
      {
        name: 'realTimeRequirements',
        description: 'Liệu có cần đồng bộ dữ liệu thời gian thực hay không',
        required: false,
      },
    ],
  },
  {
    name: 'cart-optimization',
    description: 'Tối ưu hóa trải nghiệm giỏ hàng và giảm tỷ lệ bỏ giỏ',
    arguments: [
      {
        name: 'abandonmentRate',
        description: 'Tỷ lệ bỏ giỏ hàng hiện tại',
        required: false,
      },
      {
        name: 'checkoutSteps',
        description: 'Số bước trong quy trình thanh toán hiện tại',
        required: false,
      },
      {
        name: 'paymentMethods',
        description: 'Các phương thức thanh toán có sẵn',
        required: false,
      },
    ],
  },
  {
    name: 'multi-channel-strategy',
    description: 'Phát triển chiến lược quản lý nhiều kênh bán hàng',
    arguments: [
      {
        name: 'currentChannels',
        description: 'Các kênh bán hàng hiện đang hoạt động',
        required: false,
      },
      {
        name: 'targetChannels',
        description: 'Các kênh dự định mở rộng',
        required: false,
      },
      {
        name: 'inventorySync',
        description: 'Liệu tồn kho có cần đồng bộ giữa các kênh hay không',
        required: false,
      },
    ],
  },
  {
    name: 'performance-audit',
    description: 'Kiểm toán hiệu suất nền tảng hiện tại và cung cấp khuyến nghị tối ưu hóa',
    arguments: [
      {
        name: 'responseTime',
        description: 'Thời gian phản hồi API trung bình hiện tại',
        required: false,
      },
      {
        name: 'throughput',
        description: 'Khả năng xử lý yêu cầu mỗi giây hiện tại',
        required: false,
      },
      {
        name: 'bottlenecks',
        description: 'Các điểm nghẽn hiệu suất đã biết',
        required: false,
      },
    ],
  },
  {
    name: 'security-assessment',
    description: 'Đánh giá tình hình bảo mật và cung cấp khuyến nghị',
    arguments: [
      {
        name: 'authMethod',
        description: 'Phương thức xác thực hiện tại',
        required: false,
      },
      {
        name: 'dataTypes',
        description: 'Các loại dữ liệu nhạy cảm được xử lý',
        required: false,
      },
      {
        name: 'complianceRequirements',
        description: 'Yêu cầu tuân thủ quy định (PCI DSS, GDPR, v.v.)',
        required: false,
      },
    ],
  },
  {
    name: 'migration-planner',
    description: 'Lập kế hoạch di chuyển từ nền tảng thương mại điện tử hiện có',
    arguments: [
      {
        name: 'currentPlatform',
        description: 'Nền tảng thương mại điện tử hiện tại',
        required: false,
      },
      {
        name: 'dataVolume',
        description: 'Lượng dữ liệu cần di chuyển',
        required: false,
      },
      {
        name: 'downtime',
        description: 'Thời gian ngừng hoạt động có thể chấp nhận cho việc di chuyển',
        required: false,
      },
    ],
  },
  {
    name: 'testing-strategy',
    description: 'Phát triển chiến lược kiểm thử toàn diện cho triển khai thương mại điện tử',
    arguments: [
      {
        name: 'testingTypes',
        description: 'Các loại kiểm thử cần thiết (đơn vị, tích hợp, hiệu suất, v.v.)',
        required: false,
      },
      {
        name: 'automationLevel',
        description: 'Mức độ tự động hóa kiểm thử mong muốn',
        required: false,
      },
      {
        name: 'criticalFlows',
        description: 'Các luồng người dùng quan trọng nhất cần kiểm thử',
        required: false,
      },
    ],
  },
];