/*
  # Add blog status and update schema

  1. Changes
    - Add status column to blogs table with enum type
    - Add indexes for common queries
    - Update RLS policies for admin access

  2. Security
    - Add policy for admin users to manage all blogs
    - Maintain existing policies for public read access
*/

-- Create enum for blog status
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');

-- Add status column with default value
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS status blog_status DEFAULT 'draft';

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs(status);
CREATE INDEX IF NOT EXISTS blogs_created_at_idx ON blogs(created_at);

-- Update RLS policies for admin access
CREATE POLICY "Admins can manage all blogs" ON blogs
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'your-admin-email@example.com'
  );