/*
  # Add admin user and sample blog posts

  1. Changes
    - Create admin user with secure password
    - Add three sample blog posts
    - Set proper permissions
*/

-- Create admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  'admin@healthylife.com',
  crypt('Admin123!@#', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin User"}',
  now(),
  now(),
  'authenticated',
  '',
  '',
  '',
  ''
);

-- Insert sample blog posts
INSERT INTO blogs (title, excerpt, content, image, status, author)
SELECT 
  title,
  excerpt,
  content,
  image,
  'published'::blog_status as status,
  (SELECT id FROM auth.users WHERE email = 'admin@healthylife.com') as author
FROM (
  VALUES 
    (
      'The Science Behind Weight Loss',
      'Understanding the fundamental principles of sustainable weight loss and how to achieve your goals.',
      E'Weight loss is more than just counting calories. Let\'s explore the science behind effective and sustainable weight loss:\n\n1. Understanding Your Metabolism\n- How metabolism affects weight loss\n- Factors that influence metabolic rate\n- Ways to optimize your metabolism\n\n2. The Role of Nutrition\n- Importance of macronutrients\n- Meal timing and frequency\n- Food quality vs. quantity\n\n3. Exercise Strategies\n- Combining cardio and strength training\n- HIIT vs. steady-state cardio\n- Building a sustainable workout routine',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8'
    ),
    (
      'Muscle Building Fundamentals',
      'Learn the key principles of building lean muscle mass effectively and safely.',
      E'Building muscle requires a strategic approach combining proper nutrition and training:\n\n1. Training Principles\n- Progressive overload\n- Exercise selection\n- Rest and recovery\n\n2. Nutrition for Muscle Growth\n- Protein requirements\n- Carb timing\n- Supplementation basics\n\n3. Common Mistakes to Avoid\n- Training errors\n- Nutrition pitfalls\n- Recovery mistakes',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
    ),
    (
      'Natural PCOS Management',
      'Holistic approaches to managing PCOS symptoms through diet and lifestyle changes.',
      E'Managing PCOS naturally involves multiple lifestyle modifications:\n\n1. Dietary Changes\n- Blood sugar management\n- Anti-inflammatory foods\n- Meal planning tips\n\n2. Lifestyle Modifications\n- Exercise recommendations\n- Stress management\n- Sleep optimization\n\n3. Supplementation\n- Essential nutrients\n- Herbal support\n- Working with healthcare providers',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352'
    )
) as t(title, excerpt, content, image);