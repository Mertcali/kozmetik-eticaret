-- =====================================================
-- SUPABASE DATABASE SCHEMA
-- E-Commerce Platform
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- SUBCATEGORIES TABLE
-- =====================================================
CREATE TABLE subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(category_id, slug)
);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price DECIMAL(10, 2) CHECK (compare_at_price >= 0),
  cost_price DECIMAL(10, 2) CHECK (cost_price >= 0),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  images TEXT[], -- Array of additional image URLs
  sku VARCHAR(100) UNIQUE,
  barcode VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold INTEGER DEFAULT 10,
  weight DECIMAL(10, 2), -- in kg
  dimensions JSONB, -- {"length": 10, "width": 5, "height": 3}
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(255),
  meta_description TEXT,
  tags TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- ORDERS TABLE (Optional - for future)
-- =====================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  payment_status VARCHAR(50) DEFAULT 'unpaid', -- unpaid, paid, refunded
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- ORDER ITEMS TABLE (Optional - for future)
-- =====================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_subcategory ON products(subcategory_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_is_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_subcategories_category ON subcategories(category_id);
CREATE INDEX idx_subcategories_slug ON subcategories(slug);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and products
CREATE POLICY "Allow public read access on categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on subcategories" ON subcategories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on products" ON products
    FOR SELECT USING (is_active = true);

-- Orders are private (will need authentication later)
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (true); -- Temporarily allow all, will restrict with auth later

CREATE POLICY "Users can view their own order items" ON order_items
    FOR SELECT USING (true); -- Temporarily allow all, will restrict with auth later

-- =====================================================
-- SAMPLE DATA (Optional)
-- =====================================================
-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url, display_order) VALUES
('Elektronik', 'elektronik', 'Teknoloji ve elektronik ürünleri', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800', 1),
('Moda', 'moda', 'Giyim ve aksesuar ürünleri', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', 2),
('Ev & Yaşam', 'ev-yasam', 'Ev dekorasyonu ve yaşam ürünleri', 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800', 3),
('Spor & Outdoor', 'spor-outdoor', 'Spor malzemeleri ve outdoor ürünler', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', 4);

-- Insert sample subcategories
INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Akıllı Saat', 'akilli-saat', id, 1 FROM categories WHERE slug = 'elektronik'
UNION ALL
SELECT 'Kablosuz Kulaklık', 'kablosuz-kulaklik', id, 2 FROM categories WHERE slug = 'elektronik'
UNION ALL
SELECT 'Tablet', 'tablet', id, 3 FROM categories WHERE slug = 'elektronik'
UNION ALL
SELECT 'Laptop', 'laptop', id, 4 FROM categories WHERE slug = 'elektronik'
UNION ALL
SELECT 'Ceket', 'ceket', id, 1 FROM categories WHERE slug = 'moda'
UNION ALL
SELECT 'Ayakkabı', 'ayakkabi', id, 2 FROM categories WHERE slug = 'moda'
UNION ALL
SELECT 'Çanta', 'canta', id, 3 FROM categories WHERE slug = 'moda'
UNION ALL
SELECT 'Aydınlatma', 'aydinlatma', id, 1 FROM categories WHERE slug = 'ev-yasam'
UNION ALL
SELECT 'Dekorasyon', 'dekorasyon', id, 2 FROM categories WHERE slug = 'ev-yasam'
UNION ALL
SELECT 'Fitness', 'fitness', id, 1 FROM categories WHERE slug = 'spor-outdoor'
UNION ALL
SELECT 'Koşu', 'kosu', id, 2 FROM categories WHERE slug = 'spor-outdoor';

-- Insert sample products
INSERT INTO products (
    name, slug, description, short_description, price, compare_at_price, 
    category_id, subcategory_id, image_url, sku, stock_quantity, is_featured, rating, review_count
)
SELECT 
    'Kablosuz Kulaklık Premium', 'kablosuz-kulaklik-premium', 
    'Yüksek kaliteli ses deneyimi sunan kablosuz kulaklık. Gürültü engelleme özelliği ile müziğin tadını çıkarın.',
    'Premium kablosuz kulaklık',
    1299.99, 1499.99,
    c.id, s.id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'WH-1000', 50, true, 4.5, 128
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'elektronik' AND s.slug = 'kablosuz-kulaklik'
UNION ALL
SELECT 
    'Akıllı Saat Pro', 'akilli-saat-pro',
    'Fitness takibi ve bildirimler için mükemmel akıllı saat. Su geçirmez tasarım.',
    'Fitness ve sağlık takibi',
    2499.99, 2999.99,
    c.id, s.id, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    'SW-2000', 30, true, 4.7, 256
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'elektronik' AND s.slug = 'akilli-saat'
UNION ALL
SELECT 
    'Deri Ceket Klasik', 'deri-ceket-klasik',
    'Şık ve rahat deri ceket. Her mevsim kullanabileceğiniz klasik tasarım.',
    'Premium deri ceket',
    899.99, 1199.99,
    c.id, s.id, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    'LC-3000', 25, true, 4.3, 89
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'moda' AND s.slug = 'ceket'
UNION ALL
SELECT 
    'Spor Ayakkabı Runner', 'spor-ayakkabi-runner',
    'Koşu ve antrenman için ideal spor ayakkabı. Hafif ve dayanıklı yapı.',
    'Profesyonel koşu ayakkabısı',
    649.99, 799.99,
    c.id, s.id, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    'SA-4000', 100, true, 4.8, 342
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'moda' AND s.slug = 'ayakkabi'
UNION ALL
SELECT 
    'Minimalist Masa Lambası', 'minimalist-masa-lambasi',
    'Modern tasarımlı LED masa lambası. Ayarlanabilir parlaklık ve renk sıcaklığı.',
    'LED masa lambası',
    299.99, 399.99,
    c.id, s.id, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    'ML-5000', 75, false, 4.4, 167
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'ev-yasam' AND s.slug = 'aydinlatma'
UNION ALL
SELECT 
    'Yoga Matı Pro', 'yoga-mati-pro',
    'Kalın ve konforlu yoga matı. Kaymaz yüzey ile güvenli egzersiz.',
    'Profesyonel yoga matı',
    199.99, 249.99,
    c.id, s.id, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    'YM-6000', 150, false, 4.6, 203
FROM categories c
JOIN subcategories s ON s.category_id = c.id
WHERE c.slug = 'spor-outdoor' AND s.slug = 'fitness';
