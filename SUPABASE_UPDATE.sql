-- ============================================
-- UPDATE PORTFOLIO SECTIONS TABLE
-- Add missing columns for the admin dashboard
-- ============================================
-- Run this in Supabase SQL Editor to update your tables

-- Add missing columns to portfolio_sections table
ALTER TABLE portfolio_sections 
ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS date DATE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Remove NOT NULL constraints from optional fields
ALTER TABLE portfolio_sections 
ALTER COLUMN location DROP NOT NULL,
ALTER COLUMN date DROP NOT NULL,
ALTER COLUMN category DROP NOT NULL,
ALTER COLUMN story DROP NOT NULL,
ALTER COLUMN content DROP NOT NULL;

-- Update section_images table to add caption
ALTER TABLE section_images
ADD COLUMN IF NOT EXISTS caption TEXT,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 1;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_sections_created_at 
ON portfolio_sections(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_portfolio_sections_category 
ON portfolio_sections(category);

CREATE INDEX IF NOT EXISTS idx_section_images_section_id 
ON section_images(section_id);

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'portfolio_sections'
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'section_images'
ORDER BY ordinal_position;
