-- =====================================================
-- MIGRATION: Add Subcategories and Update Products
-- This migration adds subcategories table and updates
-- products table with subcategory support
-- =====================================================

-- Step 1: Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
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

-- Step 2: Add subcategory_id to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES subcategories(id) ON DELETE SET NULL;

-- Step 3: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_subcategories_category ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_slug ON subcategories(slug);

-- Step 4: Add trigger for subcategories updated_at
CREATE TRIGGER IF NOT EXISTS update_subcategories_updated_at BEFORE UPDATE ON subcategories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 5: Enable RLS for subcategories
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

-- Step 6: Add policy for public read access
DROP POLICY IF EXISTS "Allow public read access on subcategories" ON subcategories;
CREATE POLICY "Allow public read access on subcategories" ON subcategories
    FOR SELECT USING (is_active = true);

-- Step 7: Insert sample subcategories
INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Akıllı Saat', 'akilli-saat', id, 1 FROM categories WHERE slug = 'elektronik'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Kablosuz Kulaklık', 'kablosuz-kulaklik', id, 2 FROM categories WHERE slug = 'elektronik'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Tablet', 'tablet', id, 3 FROM categories WHERE slug = 'elektronik'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Laptop', 'laptop', id, 4 FROM categories WHERE slug = 'elektronik'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Ceket', 'ceket', id, 1 FROM categories WHERE slug = 'moda'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Ayakkabı', 'ayakkabi', id, 2 FROM categories WHERE slug = 'moda'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Çanta', 'canta', id, 3 FROM categories WHERE slug = 'moda'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Aydınlatma', 'aydinlatma', id, 1 FROM categories WHERE slug = 'ev-yasam'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Dekorasyon', 'dekorasyon', id, 2 FROM categories WHERE slug = 'ev-yasam'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Fitness', 'fitness', id, 1 FROM categories WHERE slug = 'spor-outdoor'
ON CONFLICT (category_id, slug) DO NOTHING;

INSERT INTO subcategories (name, slug, category_id, display_order)
SELECT 'Koşu', 'kosu', id, 2 FROM categories WHERE slug = 'spor-outdoor'
ON CONFLICT (category_id, slug) DO NOTHING;

-- Step 8: Update existing products with subcategories
-- Update Kablosuz Kulaklık
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'elektronik' AND s.slug = 'kablosuz-kulaklik'
)
WHERE slug LIKE '%kulaklik%';

-- Update Akıllı Saat
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'elektronik' AND s.slug = 'akilli-saat'
)
WHERE slug LIKE '%saat%';

-- Update Deri Ceket
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'moda' AND s.slug = 'ceket'
)
WHERE slug LIKE '%ceket%';

-- Update Spor Ayakkabı
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'moda' AND s.slug = 'ayakkabi'
)
WHERE slug LIKE '%ayakkabi%';

-- Update Masa Lambası
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'ev-yasam' AND s.slug = 'aydinlatma'
)
WHERE slug LIKE '%lamba%';

-- Update Yoga Matı
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'spor-outdoor' AND s.slug = 'fitness'
)
WHERE slug LIKE '%yoga%';

-- Migration complete!
-- Summary:
-- ✅ Created subcategories table
-- ✅ Added subcategory_id to products
-- ✅ Created necessary indexes
-- ✅ Set up RLS policies
-- ✅ Inserted sample subcategories (11 subcategories)
-- ✅ Updated existing products with subcategories
