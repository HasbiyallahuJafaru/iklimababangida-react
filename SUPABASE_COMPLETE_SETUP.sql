-- ============================================
-- COMPLETE SUPABASE SETUP FOR PORTFOLIO APP
-- This script will clean up and recreate all tables and policies
-- ============================================

-- Drop existing tables (CASCADE will drop related foreign keys and policies)
DROP TABLE IF EXISTS section_images CASCADE;
DROP TABLE IF EXISTS portfolio_sections CASCADE;

-- ============================================
-- CREATE TABLES
-- ============================================

-- Main portfolio sections table
CREATE TABLE portfolio_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  story TEXT,
  category TEXT,
  location TEXT,
  date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Images related to portfolio sections
CREATE TABLE section_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID NOT NULL REFERENCES portfolio_sections(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX idx_portfolio_sections_created_at ON portfolio_sections(created_at DESC);
CREATE INDEX idx_portfolio_sections_category ON portfolio_sections(category);
CREATE INDEX idx_section_images_section_id ON section_images(section_id);
CREATE INDEX idx_section_images_display_order ON section_images(section_id, display_order);

-- ============================================
-- CREATE UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_sections_updated_at
    BEFORE UPDATE ON portfolio_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE portfolio_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_images ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Portfolio Sections Policies
-- Allow ANYONE (public + authenticated) to read
CREATE POLICY "Anyone can read portfolio_sections"
ON portfolio_sections FOR SELECT
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert portfolio_sections"
ON portfolio_sections FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update portfolio_sections"
ON portfolio_sections FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete portfolio_sections"
ON portfolio_sections FOR DELETE
TO authenticated
USING (true);

-- Section Images Policies
-- Allow ANYONE to read
CREATE POLICY "Anyone can read section_images"
ON section_images FOR SELECT
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert section_images"
ON section_images FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update section_images"
ON section_images FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete section_images"
ON section_images FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- VERIFY SETUP
-- ============================================

-- Check tables exist
SELECT 
    tablename, 
    schemaname
FROM pg_tables 
WHERE tablename IN ('portfolio_sections', 'section_images')
ORDER BY tablename;

-- Check RLS is enabled
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('portfolio_sections', 'section_images')
ORDER BY tablename;

-- Check policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation
FROM pg_policies
WHERE tablename IN ('portfolio_sections', 'section_images')
ORDER BY tablename, policyname;

-- Check columns
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name IN ('portfolio_sections', 'section_images')
ORDER BY table_name, ordinal_position;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Portfolio database setup complete!';
    RAISE NOTICE 'Tables: portfolio_sections, section_images';
    RAISE NOTICE 'RLS: Enabled with public read, authenticated write';
    RAISE NOTICE 'Ready to use!';
END $$;
