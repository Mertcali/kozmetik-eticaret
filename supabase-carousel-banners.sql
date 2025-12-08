-- CAROUSEL/BANNERS MANAGEMENT TABLE
-- This allows dynamic carousel management from Supabase without code deployment

CREATE TABLE IF NOT EXISTS carousel_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  image_url TEXT NOT NULL,
  button_text VARCHAR(100) DEFAULT 'Keşfet',
  button_link VARCHAR(500) NOT NULL,
  badge VARCHAR(50),
  gradient_class VARCHAR(100) DEFAULT 'from-pink-600/90 to-orange-600/90',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_carousel_banners_active ON carousel_banners(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_carousel_banners_order ON carousel_banners(display_order);
CREATE INDEX IF NOT EXISTS idx_carousel_banners_dates ON carousel_banners(start_date, end_date);

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_carousel_banners_updated_at ON carousel_banners;
CREATE TRIGGER update_carousel_banners_updated_at BEFORE UPDATE ON carousel_banners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE carousel_banners ENABLE ROW LEVEL SECURITY;

-- Add policy for public read access
DROP POLICY IF EXISTS "Allow public read access on active carousel banners" ON carousel_banners;
CREATE POLICY "Allow public read access on active carousel banners" ON carousel_banners
    FOR SELECT USING (
      is_active = true 
      AND (start_date IS NULL OR start_date <= NOW())
      AND (end_date IS NULL OR end_date >= NOW())
    );

-- Insert sample banners
INSERT INTO carousel_banners (title, subtitle, description, image_url, button_text, button_link, badge, gradient_class, display_order)
VALUES
  (
    'Öne Çıkan Ürünler',
    'Sezonun En İyileri',
    'En popüler ve en çok tercih edilen ürünlerimizi keşfedin',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=2000&h=1200&auto=format&fit=crop&q=90',
    'Hemen İncele',
    '/urunler',
    'Özel',
    'from-pink-600/90 to-orange-600/90',
    1
  ),
  (
    'En Çok Satanlar',
    'Müşteri Favorileri',
    'Binlerce müşterimizin tercihi olan ürünler',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=2000&h=1200&auto=format&fit=crop&q=90',
    'Tüm Ürünler',
    '/urunler?sortBy=popular',
    'Popüler',
    'from-orange-600/90 to-pink-600/90',
    2
  ),
  (
    'Yeni Koleksiyon',
    'Taze Seçimler',
    'Yeni eklenen ürünlerimize göz atın',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=2000&h=1200&auto=format&fit=crop&q=90',
    'Keşfet',
    '/urunler?sortBy=newest',
    'Yeni',
    'from-pink-500/90 to-orange-500/90',
    3
  )
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Carousel banners table created successfully! You can now manage carousel banners from Supabase.' as message;
