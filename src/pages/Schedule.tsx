import React from 'react';
import { Calendar, Clock, Video, Users } from 'lucide-react';

export default function Schedule() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule a Follow-up Call
          </h1>
          <p className="text-xl text-gray-600">
            Book your next consultation to discuss your progress
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Video className="w-5 h-5 text-teal-600" />
                <span>Video consultation via Zoom</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-teal-600" />
                <span>30 minutes duration</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-5 h-5 text-teal-600" />
                <span>One-on-one session with your coach</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>Available slots shown in your timezone</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">What to expect:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Progress review and measurements</li>
                <li>• Adjustments to your program if needed</li>
                <li>• Address any questions or concerns</li>
                <li>• Set new goals and action plans</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://calendly.com/thebalancediet-in/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Your Session
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}