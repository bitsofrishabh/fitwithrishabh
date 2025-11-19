import { ArrowRight } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-24">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to Your Fitness Journey!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for choosing us as your partner in achieving your health and fitness goals. 
          We're excited to be part of your transformation journey.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-6">
            Here's what you can expect in your journey with us:
          </p>
          <ul className="text-left space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
              <span>Personalized nutrition and workout plans tailored to your goals</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
              <span>Regular check-ins and progress tracking</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
              <span>Access to our workout library and nutrition resources</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
              <span>24/7 support through our messaging system</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/workout-section"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Browse Workouts
            </a>
            <a
              href="/schedule"
              className="bg-white text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              Schedule Follow-up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}