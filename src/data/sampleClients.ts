export type ClientStatus = 'yet-to-start' | 'active' | 'inactive' | 'completed';

export interface SampleClient {
  id: string;
  name: string;
  startDate: string;
  startWeight: number;
  currentWeight: number;
  notes: string;
  status: ClientStatus;
  goals: string[];
  achievements: string[];
  location: string;
  email: string;
  phone: string;
}

export const sampleClients: SampleClient[] = [
  {
    id: 'cl-001',
    name: 'Aarav Sharma',
    startDate: '2024-02-05',
    startWeight: 86,
    currentWeight: 78.5,
    notes: 'Responding well to higher protein breakfasts and daily walk habit.',
    status: 'active',
    goals: ['Reach 75kg by July', 'Reduce visceral fat', 'Complete 3 strength workouts per week'],
    achievements: ['Down 7.5kg in 10 weeks', 'Waist reduced by 6cm', 'Sleeps 1 hour earlier consistently'],
    location: 'Bengaluru, India',
    email: 'aarav@example.com',
    phone: '+91 90000 11111'
  },
  {
    id: 'cl-002',
    name: 'Neha Kapoor',
    startDate: '2024-03-12',
    startWeight: 72,
    currentWeight: 69.2,
    notes: 'Focusing on mindful eating and hydration habits. Loves bodyweight workouts.',
    status: 'yet-to-start',
    goals: ['Feel energetic throughout workday', 'Improve posture', 'Lose 5kg in 12 weeks'],
    achievements: ['Created a consistent morning routine', 'Logs meals daily'],
    location: 'Mumbai, India',
    email: 'neha@example.com',
    phone: '+91 98888 22222'
  },
  {
    id: 'cl-003',
    name: 'Rahul Verma',
    startDate: '2024-01-08',
    startWeight: 94,
    currentWeight: 82.3,
    notes: 'Completed 12-week program. Maintains progress with weekend accountability check-ins.',
    status: 'completed',
    goals: ['Maintain 82kg range', 'Train for 10k run', 'Prioritise mobility work'],
    achievements: ['Lost 12kg sustainably', 'Improved fasting blood sugar markers', 'Cooking 5 meals/week'],
    location: 'Delhi, India',
    email: 'rahul@example.com',
    phone: '+91 97777 33333'
  }
];
