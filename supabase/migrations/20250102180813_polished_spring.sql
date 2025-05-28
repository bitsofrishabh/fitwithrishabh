/*
  # Add sample blog posts

  1. Changes
    - Add three sample blog posts with published status
    - Set author to admin user
    - Include varied content and images
*/

-- Create sample blog posts with a specific author ID
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Get the admin user's ID (adjust the email to match your admin user)
  SELECT id INTO admin_id 
  FROM auth.users 
  WHERE email = 'your-admin-email@example.com'
  LIMIT 1;

  -- Only insert if we have an admin user
  IF admin_id IS NOT NULL THEN
    INSERT INTO blogs (title, excerpt, content, image, status, author)
    VALUES
      (
        'Getting Started with Healthy Eating',
        'Learn the fundamentals of nutrition and how to build a balanced diet that works for you.',
        'A healthy diet is the foundation of wellness. In this guide, we''ll explore the basics of nutrition, including:\n\n1. Understanding macronutrients\n2. The importance of portion control\n3. Meal planning basics\n4. Healthy snacking options',
        'healthy-eating/intro',
        'published',
        admin_id
      ),
      (
        'The Ultimate Guide to Weight Training',
        'Discover how to build strength and muscle safely with our comprehensive weight training guide.',
        'Weight training is essential for building strength, increasing metabolism, and improving overall health. This guide covers:\n\n- Proper form for basic exercises\n- Building your first workout routine\n- Progressive overload principles\n- Recovery and nutrition tips',
        'fitness/weight-training',
        'published',
        admin_id
      ),
      (
        'Natural Ways to Manage PCOS',
        'Explore effective lifestyle changes and dietary adjustments to help manage PCOS symptoms.',
        'PCOS management requires a holistic approach. We''ll discuss:\n\n- Understanding PCOS and its effects\n- Dietary changes that help\n- Exercise recommendations\n- Stress management techniques\n- Supplements and natural remedies',
        'health/pcos-management',
        'published',
        admin_id
      );
  END IF;
END $$;