# Ví dụ quản lý sản phẩm

Tài liệu này cung cấp các ví dụ thực tế sử dụng MCP server Sun eCommerce Platform cho các tác vụ quản lý sản phẩm.

## 🎯 Thao tác sản phẩm cơ bản

### Tạo sản phẩm đơn giản

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo sản phẩm đơn giản tên 'Premium Cotton T-Shirt' với SKU 'COTTON-TEE-001', giá $29.99, thuộc danh mục 'Apparel'"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Premium Cotton T-Shirt",
    "sku": "COTTON-TEE-001",
    "productType": "simple",
    "price": 29.99,
    "description": "High-quality 100% cotton t-shirt with premium finish",
    "categoryId": "category-uuid-here",
    "status": "active",
    "tags": ["cotton", "premium", "apparel", "casual"]
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "product-uuid-123",
    "name": "Premium Cotton T-Shirt",
    "sku": "COTTON-TEE-001",
    "price": 29.99,
    "status": "active"
  },
  "nextSteps": [
    "Add product images using upload_media tool",
    "Set up inventory using check_inventory tool",
    "Configure pricing rules if needed",
    "Add product to categories"
  ]
}
```

### Tạo sản phẩm cấu hình (configurable)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo sản phẩm cấu hình 'Athletic Running Shoes' với biến thể size (8-12) và màu (đen, trắng, xanh), giá gốc $89.99"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Athletic Running Shoes",
    "sku": "RUNNING-SHOES-001",
    "productType": "configurable",
    "price": 89.99,
    "description": "Professional athletic running shoes with advanced cushioning",
    "categoryId": "shoes-category-uuid",
    "status": "active",
    "variants": [
      {
        "attributes": {"size": "8", "color": "black"},
        "sku": "RUNNING-SHOES-001-8-BLK",
        "price": 89.99
      },
      {
        "attributes": {"size": "9", "color": "white"},
        "sku": "RUNNING-SHOES-001-9-WHT",
        "price": 89.99
      }
    ],
    "configurableAttributes": ["size", "color"]
  }
}
```

## 🏖️ Sản phẩm du lịch

### Tạo vé máy bay (flight_ticket)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo vé máy bay từ Hà Nội đi TP.HCM, khởi hành 15/03/2024, hạng phổ thông, giá $150"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Vé máy bay HAN-SGN - 15/03/2024",
    "sku": "FLIGHT-HAN-SGN-20240315",
    "productType": "flight_ticket",
    "price": 150.00,
    "description": "Vé máy bay từ Hà Nội (HAN) đến TP.HCM (SGN), khởi hành 15/03/2024 lúc 08:30",
    "categoryId": "flight-tickets-uuid",
    "status": "active",
    "attributes": {
      "departure_airport": "HAN",
      "arrival_airport": "SGN",
      "departure_date": "2024-03-15",
      "departure_time": "08:30",
      "flight_class": "economy",
      "airline": "Vietnam Airlines",
      "flight_number": "VN213"
    },
    "tags": ["flight", "domestic", "vietnam-airlines"]
  }
}
```

### Tạo vé công viên (park_ticket)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo vé vào cửa Vinpearl Land Nha Trang, vé người lớn, có hiệu lực 1 ngày, giá $25"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Vé Vinpearl Land Nha Trang - Người lớn",
    "sku": "PARK-VINPEARL-NT-ADULT",
    "productType": "park_ticket",
    "price": 25.00,
    "description": "Vé vào cửa Vinpearl Land Nha Trang dành cho người lớn, có hiệu lực 1 ngày",
    "categoryId": "park-tickets-uuid",
    "status": "active",
    "attributes": {
      "park_name": "Vinpearl Land Nha Trang",
      "ticket_type": "adult",
      "validity_days": 1,
      "location": "Nha Trang",
      "includes": ["All rides", "Water park", "Aquarium"]
    },
    "tags": ["theme-park", "nha-trang", "vinpearl", "adult"]
  }
}
```

### Tạo phòng khách sạn (hotel_room)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo phòng Superior Double tại Sheraton Hanoi, 2 người, bao gồm ăn sáng, giá $120/đêm"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Sheraton Hanoi - Superior Double Room",
    "sku": "HOTEL-SHERATON-HN-SUP-DBL",
    "productType": "hotel_room",
    "price": 120.00,
    "description": "Phòng Superior Double tại Sheraton Hanoi với view thành phố, bao gồm ăn sáng buffet",
    "categoryId": "hotel-rooms-uuid",
    "status": "active",
    "attributes": {
      "hotel_name": "Sheraton Hanoi",
      "room_type": "Superior Double",
      "max_occupancy": 2,
      "bed_type": "1 King bed or 2 Twin beds",
      "room_size": "32 sqm",
      "amenities": ["Free WiFi", "Air conditioning", "Minibar", "City view"],
      "includes_breakfast": true,
      "location": "Hanoi",
      "star_rating": 5
    },
    "tags": ["hotel", "hanoi", "sheraton", "5-star", "breakfast-included"]
  }
}
```

### Tạo sản phẩm lưu niệm (souvenir)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo sản phẩm lưu niệm áo thun in hình Vịnh Hạ Long, size S-XL, giá $15"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Áo thun lưu niệm Vịnh Hạ Long",
    "sku": "SOUVENIR-HALONG-TSHIRT",
    "productType": "souvenir",
    "price": 15.00,
    "description": "Áo thun cotton in hình Vịnh Hạ Long, thiết kế độc đáo, chất liệu thoáng mát",
    "categoryId": "souvenirs-uuid",
    "status": "active",
    "variants": [
      {
        "attributes": {"size": "S"},
        "sku": "SOUVENIR-HALONG-TSHIRT-S",
        "price": 15.00
      },
      {
        "attributes": {"size": "M"},
        "sku": "SOUVENIR-HALONG-TSHIRT-M",
        "price": 15.00
      },
      {
        "attributes": {"size": "L"},
        "sku": "SOUVENIR-HALONG-TSHIRT-L",
        "price": 15.00
      },
      {
        "attributes": {"size": "XL"},
        "sku": "SOUVENIR-HALONG-TSHIRT-XL",
        "price": 15.00
      }
    ],
    "attributes": {
      "destination": "Ha Long Bay",
      "material": "100% Cotton",
      "design": "Ha Long Bay landscape print",
      "origin": "Vietnam"
    },
    "tags": ["souvenir", "halong-bay", "t-shirt", "vietnam", "cotton"]
  }
}
```

### Tạo quà tặng (gift_item)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo set quà tặng đặc sản Việt Nam gồm cà phê, trà sen, bánh kẹo, giá $35"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Set quà tặng đặc sản Việt Nam",
    "sku": "GIFT-VIETNAM-SPECIALTY-SET",
    "productType": "gift_item",
    "price": 35.00,
    "description": "Bộ quà tặng đặc sản Việt Nam cao cấp gồm cà phê Arabica, trà sen Hồ Tây, bánh kẹo truyền thống",
    "categoryId": "gift-items-uuid",
    "status": "active",
    "attributes": {
      "gift_type": "Specialty food set",
      "contents": [
        "Cà phê Arabica Đà Lạt 200g",
        "Trà sen Hồ Tây 100g",
        "Bánh đậu xanh 300g",
        "Kẹo dừa Bến Tre 200g"
      ],
      "packaging": "Premium gift box with Vietnamese traditional design",
      "weight": "800g",
      "origin": "Vietnam",
      "shelf_life": "12 months"
    },
    "tags": ["gift", "vietnam", "specialty", "food", "premium", "traditional"]
  }
}
```

### Tạo gói combo du lịch (combo)

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo gói combo tour Hạ Long 2N1Đ gồm vé máy bay, khách sạn, tour thuyền, giá $280"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Combo Tour Hạ Long 2N1Đ",
    "sku": "COMBO-HALONG-2D1N",
    "productType": "combo",
    "price": 280.00,
    "description": "Gói combo tour Hạ Long 2 ngày 1 đêm bao gồm vé máy bay khứ hồi, khách sạn 4 sao, tour thuyền ngắm cảnh",
    "categoryId": "tour-packages-uuid",
    "status": "active",
    "attributes": {
      "duration": "2 days 1 night",
      "destination": "Ha Long Bay",
      "includes": [
        "Round-trip flight tickets",
        "4-star hotel accommodation",
        "Cruise tour with meals",
        "Professional tour guide",
        "Transportation"
      ],
      "departure_cities": ["Hanoi", "Ho Chi Minh City"],
      "group_size": "2-20 people",
      "difficulty_level": "Easy"
    },
    "bundledProducts": [
      {
        "productId": "flight-ticket-uuid",
        "quantity": 1,
        "description": "Round-trip flight"
      },
      {
        "productId": "hotel-room-uuid",
        "quantity": 1,
        "description": "1 night hotel stay"
      },
      {
        "productId": "cruise-tour-uuid",
        "quantity": 1,
        "description": "Ha Long Bay cruise"
      }
    ],
    "tags": ["combo", "tour", "halong-bay", "2d1n", "cruise", "vietnam"]
  }
}
```

## 🔍 Tìm kiếm & khám phá sản phẩm

### Tìm kiếm nâng cao

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tìm tất cả sản phẩm active trong danh mục electronics, giá từ $100-$500, sắp xếp tăng dần theo giá"
```

**Gọi tool MCP:**
```json
{
  "tool": "search_products",
  "arguments": {
    "categoryId": "electronics-category-uuid",
    "status": "active",
    "priceMin": 100,
    "priceMax": 500,
    "page": 1,
    "pageSize": 20
  }
}
```

### Tìm kiếm sản phẩm du lịch

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tìm tất cả vé máy bay từ Hà Nội đi Đà Nẵng trong tháng 3, giá dưới $200"
```

**Gọi tool MCP:**
```json
{
  "tool": "search_products",
  "arguments": {
    "productType": "flight_ticket",
    "search": "HAN DAN",
    "priceMax": 200,
    "attributes": {
      "departure_airport": "HAN",
      "arrival_airport": "DAN",
      "departure_month": "2024-03"
    },
    "page": 1,
    "pageSize": 10
  }
}
```

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tìm phòng khách sạn 4-5 sao ở Hội An, giá từ $80-150/đêm, có bao gồm ăn sáng"
```

**Gọi tool MCP:**
```json
{
  "tool": "search_products",
  "arguments": {
    "productType": "hotel_room",
    "search": "Hoi An",
    "priceMin": 80,
    "priceMax": 150,
    "attributes": {
      "location": "Hoi An",
      "star_rating": [4, 5],
      "includes_breakfast": true
    },
    "page": 1,
    "pageSize": 15
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Found 15 products",
  "data": {
    "products": [
      {
        "id": "product-1",
        "name": "Wireless Headphones",
        "price": 149.99,
        "category": "Electronics"
      }
    ],
    "total": 15,
    "page": 1,
    "pageSize": 20
  },
  "searchTips": [
    "Use specific keywords for better results",
    "Filter by category or product type",
    "Use price range filters for targeted searches"
  ]
}
```

### Tìm kiếm sản phẩm theo từ khoá

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tìm sản phẩm có từ 'wireless' trong tên hoặc mô tả"
```

**Gọi tool MCP:**
```json
{
  "tool": "search_products",
  "arguments": {
    "search": "wireless",
    "page": 1,
    "pageSize": 10
  }
}
```

## 📊 Lấy thông tin sản phẩm

### Lấy chi tiết sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Lấy đầy đủ thông tin sản phẩm ID 'prod-123' gồm biến thể, tồn kho, giá"
```

**Gọi tool MCP:**
```json
{
  "tool": "get_product",
  "arguments": {
    "id": "prod-123",
    "includeVariants": true,
    "includeInventory": true,
    "includePricing": true
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "prod-123",
    "name": "Premium Cotton T-Shirt",
    "sku": "COTTON-TEE-001",
    "price": 29.99,
    "variants": [
      {
        "id": "variant-1",
        "attributes": {"size": "M", "color": "blue"},
        "sku": "COTTON-TEE-001-M-BLU",
        "inventory": {
          "quantity": 50,
          "available": 45,
          "reserved": 5
        }
      }
    ],
    "pricing": {
      "basePrice": 29.99,
      "compareAtPrice": 39.99,
      "costPrice": 15.00,
      "margin": 50.0
    }
  },
  "availableActions": [
    "Update product details",
    "Manage inventory",
    "Set pricing rules",
    "Upload media",
    "Add translations"
  ]
}
```

## ✏️ Cập nhật sản phẩm

### Cập nhật thông tin sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Cập nhật sản phẩm 'prod-123' đổi giá thành $34.99 và thêm tag 'premium', 'bestseller'"
```

**Gọi tool MCP:**
```json
{
  "tool": "update_product",
  "arguments": {
    "id": "prod-123",
    "price": 34.99,
    "tags": ["premium", "bestseller", "cotton", "apparel"]
  }
}
```

### Cập nhật hàng loạt sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Cập nhật tất cả sản phẩm trong danh mục 'summer-collection' giảm 20% và thêm tag 'summer-sale'"
```

**Workflow:**
1. Tìm sản phẩm trong danh mục
2. Cập nhật từng sản phẩm với giá và tag mới

```json
{
  "tool": "search_products",
  "arguments": {
    "categoryId": "summer-collection-uuid",
    "status": "active"
  }
}
```

Sau đó với từng sản phẩm:
```json
{
  "tool": "update_product",
  "arguments": {
    "id": "product-id",
    "compareAtPrice": "original-price",
    "price": "discounted-price",
    "tags": ["existing-tags", "summer-sale"]
  }
}
```

## 🏷️ Danh mục sản phẩm

### Tạo danh mục sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo danh mục 'Athletic Wear' dưới 'Apparel', mô tả 'High-performance athletic clothing and accessories'"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_category",
  "arguments": {
    "name": "Athletic Wear",
    "description": "High-performance athletic clothing and accessories",
    "parentId": "apparel-category-uuid",
    "slug": "athletic-wear",
    "isActive": true,
    "sortOrder": 10
  }
}
```

### Lấy cây danh mục

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Hiển thị toàn bộ cây danh mục của cửa hàng"
```

**Gọi tool MCP:**
```json
{
  "tool": "list_categories",
  "arguments": {
    "tree": true
  }
}
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Category tree retrieved successfully",
  "data": {
    "categories": [
      {
        "id": "apparel-uuid",
        "name": "Apparel",
        "children": [
          {
            "id": "athletic-wear-uuid",
            "name": "Athletic Wear",
            "children": []
          },
          {
            "id": "casual-wear-uuid",
            "name": "Casual Wear",
            "children": []
          }
        ]
      }
    ]
  },
  "structure": "hierarchical"
}
```

## 🎨 Thuộc tính sản phẩm

### Tạo thuộc tính sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Tạo thuộc tính sản phẩm 'Material' với giá trị 'Cotton', 'Polyester', 'Blend' cho sản phẩm quần áo"
```

**Gọi tool MCP:**
```json
{
  "tool": "create_attribute",
  "arguments": {
    "name": "Material",
    "type": "select",
    "isRequired": true,
    "isFilterable": true,
    "description": "Product material composition"
  }
}
```

Sau đó thêm giá trị thuộc tính:
```json
{
  "tool": "create_attribute_value",
  "arguments": {
    "attributeId": "material-attribute-uuid",
    "value": "Cotton",
    "sortOrder": 1
  }
}
```

## 📸 Quản lý media sản phẩm

### Upload ảnh sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Upload ảnh sản phẩm cho 'prod-123' với alt text 'Premium Cotton T-Shirt - Front View'"
```

**Gọi tool MCP:**
```json
{
  "tool": "upload_media",
  "arguments": {
    "entityType": "product",
    "entityId": "prod-123",
    "fileName": "cotton-tshirt-front.jpg",
    "mediaType": "image",
    "altText": "Premium Cotton T-Shirt - Front View",
    "title": "Product Front View"
  }
}
```

### Liệt kê media sản phẩm

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Hiển thị tất cả ảnh của sản phẩm 'prod-123'"
```

**Gọi tool MCP:**
```json
{
  "tool": "list_media",
  "arguments": {
    "entityType": "product",
    "entityId": "prod-123",
    "mediaType": "image"
  }
}
```

## 🔄 Workflow sản phẩm hoàn chỉnh

### Thiết lập sản phẩm hoàn chỉnh

**Yêu cầu ngôn ngữ tự nhiên:**
```
"Hãy giúp tôi setup sản phẩm hoàn chỉnh: tạo 'Wireless Bluetooth Speaker', thêm vào danh mục 'Electronics', upload ảnh, setup tồn kho, tạo khuyến mãi ra mắt"
```

**Các bước workflow:**

1. **Tạo sản phẩm:**
```json
{
  "tool": "create_product",
  "arguments": {
    "name": "Wireless Bluetooth Speaker",
    "sku": "BT-SPEAKER-001",
    "productType": "simple",
    "price": 79.99,
    "categoryId": "electronics-uuid"
  }
}
```

2. **Upload ảnh sản phẩm:**
```json
{
  "tool": "upload_media",
  "arguments": {
    "entityType": "product",
    "entityId": "new-product-uuid",
    "fileName": "speaker-main.jpg",
    "mediaType": "image"
  }
}
```

3. **Thiết lập tồn kho:**
```json
{
  "tool": "check_inventory",
  "arguments": {
    "productId": "new-product-uuid",
    "quantity": 100
  }
}
```

4. **Tạo khuyến mãi ra mắt:**
```json
{
  "tool": "create_pricing_rule",
  "arguments": {
    "name": "Speaker Launch 15% Off",
    "ruleType": "percentage_discount",
    "discountValue": 15,
    "conditions": {
      "product_ids": ["new-product-uuid"]
    },
    "validFrom": "2024-01-01T00:00:00Z",
    "validTo": "2024-01-31T23:59:59Z"
  }
}
```

## 🎯 Best practice quản lý sản phẩm

### Đặt tên sản phẩm
- Sử dụng tên mô tả, dễ tìm kiếm
- Đưa thuộc tính chính vào tên
- Giữ nhất quán giữa các sản phẩm cùng loại
- Lưu ý yếu tố SEO
- **Sản phẩm du lịch**: Bao gồm điểm đến, ngày tháng, loại dịch vụ

### Quản lý SKU
- Đặt SKU có hệ thống
- Bao gồm mã danh mục/thương hiệu
- Dễ đọc, dễ nhớ
- Đảm bảo duy nhất trên toàn hệ thống
- **Sản phẩm du lịch**: Sử dụng mã sân bay, mã khách sạn, ngày tháng

### Tổ chức danh mục
- Tạo cây phân cấp hợp lý
- Không quá 3-4 cấp
- Tên rõ ràng, mô tả
- Xem xét hành vi điều hướng của khách
- **Danh mục du lịch**: Phân theo loại dịch vụ (Flights, Hotels, Tours, Attractions)

### Chiến lược thuộc tính
- Định nghĩa thuộc tính trước khi tạo sản phẩm
- Dùng tên thuộc tính nhất quán
- Thuộc tính quan trọng nên filterable
- Hỗ trợ đa ngôn ngữ nếu cần
- **Thuộc tính du lịch**: Ngày giờ, địa điểm, loại phòng, hạng vé, tiện ích

### Quản lý sản phẩm du lịch đặc biệt
- **Vé máy bay**: Quản lý theo chuyến bay, hạng vé, ngày khởi hành
- **Phòng khách sạn**: Theo loại phòng, ngày checkin/checkout, số người
- **Tour/Combo**: Quản lý inventory theo ngày khởi hành, số chỗ
- **Vé tham quan**: Theo ngày sử dụng, loại vé (người lớn/trẻ em)
- **Lưu niệm**: Quản lý như sản phẩm thông thường với thuộc tính địa điểm

## 🚨 Lỗi thường gặp

### Tránh các lỗi sau
1. **Trùng SKU** - Luôn kiểm tra SKU duy nhất
2. **Thiếu trường bắt buộc** - Validate dữ liệu sản phẩm
3. **Phân loại không nhất quán** - Theo đúng quy tắc danh mục
4. **Ảnh kém chất lượng** - Dùng ảnh rõ nét, chuyên nghiệp
5. **Mô tả thiếu** - Cung cấp mô tả chi tiết, chính xác

### Xử lý lỗi
```json
{
  "success": false,
  "error": "SKU already exists",
  "details": "Product with SKU 'COTTON-TEE-001' already exists",
  "suggestions": [
    "Use a different SKU",
    "Check existing products",
    "Update existing product instead"
  ]
}
```

### Lỗi đặc biệt với sản phẩm du lịch
```json
{
  "success": false,
  "error": "Invalid flight date",
  "details": "Departure date cannot be in the past",
  "suggestions": [
    "Use future date for departure",
    "Check date format (YYYY-MM-DD)",
    "Verify timezone settings"
  ]
}
```

```json
{
  "success": false,
  "error": "Hotel room capacity exceeded",
  "details": "Room type 'Single' cannot accommodate 3 guests",
  "suggestions": [
    "Use appropriate room type for guest count",
    "Create separate bookings",
    "Check room specifications"
  ]
}
```

## 📈 Tối ưu hiệu năng

### Quản lý sản phẩm hiệu quả
- Dùng batch cho cập nhật hàng loạt
- Phân trang cho catalog lớn
- Cache dữ liệu truy cập nhiều
- Tối ưu kích thước, định dạng ảnh
- Đánh index hợp lý cho search

### Theo dõi & phân tích
- Theo dõi chỉ số hiệu quả sản phẩm
- Theo dõi truy vấn tìm kiếm
- Phân tích điều hướng danh mục
- Xem tần suất cập nhật sản phẩm
- Đo conversion rate theo loại sản phẩm

Xem thêm ví dụ nâng cao tại:
- [Pricing Rules Examples](./pricing-rules.md)
- [Cart Management Examples](./cart-management.md)
- [API Workflow Examples](./api-workflows.md)
