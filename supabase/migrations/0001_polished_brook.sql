/*
  # Blog System Schema

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `image` (text, required)
      - `author` (uuid, references auth.users)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `blogs` table
    - Add policies for:
      - Anyone can read blogs
      - Only authenticated users can create blogs
      - Only blog authors can update/delete their own blogs
*/

CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image text NOT NULL,
  author uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy for reading blogs (public)
CREATE POLICY "Blogs are viewable by everyone" ON blogs
  FOR SELECT USING (true);

-- Policy for creating blogs (authenticated users)
CREATE POLICY "Authenticated users can create blogs" ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author);

-- Policy for updating blogs (blog authors only)
CREATE POLICY "Users can update their own blogs" ON blogs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author)
  WITH CHECK (auth.uid() = author);

-- Policy for deleting blogs (blog authors only)
CREATE POLICY "Users can delete their own blogs" ON blogs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author);