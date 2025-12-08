-- STEP 4: Insert sample subcategories
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
