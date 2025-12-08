-- STEP 5: Update existing products with subcategories
UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'elektronik' AND s.slug = 'kablosuz-kulaklik'
)
WHERE slug LIKE '%kulaklik%';

UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'elektronik' AND s.slug = 'akilli-saat'
)
WHERE slug LIKE '%saat%';

UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'moda' AND s.slug = 'ceket'
)
WHERE slug LIKE '%ceket%';

UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'moda' AND s.slug = 'ayakkabi'
)
WHERE slug LIKE '%ayakkabi%';

UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'ev-yasam' AND s.slug = 'aydinlatma'
)
WHERE slug LIKE '%lamba%';

UPDATE products 
SET subcategory_id = (
  SELECT s.id FROM subcategories s 
  JOIN categories c ON s.category_id = c.id 
  WHERE c.slug = 'spor-outdoor' AND s.slug = 'fitness'
)
WHERE slug LIKE '%yoga%';
