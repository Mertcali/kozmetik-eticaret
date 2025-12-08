-- STEP 3: Add trigger and RLS policies
DROP TRIGGER IF EXISTS update_subcategories_updated_at ON subcategories;
CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON subcategories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on subcategories" ON subcategories;
CREATE POLICY "Allow public read access on subcategories" ON subcategories
    FOR SELECT USING (is_active = true);
