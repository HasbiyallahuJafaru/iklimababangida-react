-- ============================================
-- RLS POLICIES FOR PUBLIC READ ACCESS
-- Allow anyone to read portfolio data
-- ============================================

-- Enable RLS on tables if not already enabled
ALTER TABLE portfolio_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to portfolio_sections" ON portfolio_sections;
DROP POLICY IF EXISTS "Allow authenticated insert to portfolio_sections" ON portfolio_sections;
DROP POLICY IF EXISTS "Allow authenticated update to portfolio_sections" ON portfolio_sections;
DROP POLICY IF EXISTS "Allow authenticated delete to portfolio_sections" ON portfolio_sections;

DROP POLICY IF EXISTS "Allow public read access to section_images" ON section_images;
DROP POLICY IF EXISTS "Allow authenticated insert to section_images" ON section_images;
DROP POLICY IF EXISTS "Allow authenticated update to section_images" ON section_images;
DROP POLICY IF EXISTS "Allow authenticated delete to section_images" ON section_images;

-- Create policies for portfolio_sections
CREATE POLICY "Allow public read access to portfolio_sections"
ON portfolio_sections FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated insert to portfolio_sections"
ON portfolio_sections FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update to portfolio_sections"
ON portfolio_sections FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete to portfolio_sections"
ON portfolio_sections FOR DELETE
TO authenticated
USING (true);

-- Create policies for section_images
CREATE POLICY "Allow public read access to section_images"
ON section_images FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated insert to section_images"
ON section_images FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update to section_images"
ON section_images FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete to section_images"
ON section_images FOR DELETE
TO authenticated
USING (true);

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('portfolio_sections', 'section_images')
ORDER BY tablename, policyname;
