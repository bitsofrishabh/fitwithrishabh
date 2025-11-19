import { ChangeEvent, FormEvent, useState } from 'react';
import { Gift } from 'lucide-react';

interface ReferralFormData {
  name: string;
  age: string;
  profession: string;
  gender: string;
  city: string;
  referrerName: string;
}

export default function Referral() {
  const [formData, setFormData] = useState<ReferralFormData>({
    name: '',
    age: '',
    profession: '',
    gender: '',
    city: '',
    referrerName: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      title: "₹500 Off for Your Friend OR ₹500 to you",
      description: "Your friend gets ₹500 off on their 3 months program purchase or you can get ₹500 to your account."
    },
    {
      title: "Earn 1 week Extra ",
      description: "For every successful referral of 3 months, you will get 1 week extension on your weight loss program."
    },
    {
      title: "Unlimited Referrals",
      description: "No limit on how many friends you can refer"
    }
  ];

  const steps = [
    {
      title: "Fill Above Details",
      description: "Fill the above details of your friend."
    },
    {
      title: "Friend Signs Up",
      description: "Your friend enrolled for 3 months,"
    },
    {
      title: "Get Rewarded",
      description: "Either you will or he will get reward after successful signup"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refer & Earn Program
          </h1>
          <p className="text-xl text-gray-600">
            Share the gift of health and earn rewards
          </p>
        </div>

        {/* Referral Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6">Referral Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession *
                </label>
                <input
                  type="text"
                  name="profession"
                  required
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referrer's Full Name *
                </label>
                <input
                  type="text"
                  name="referrerName"
                  required
                  value={formData.referrerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Submit Referral
            </button>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Gift className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-teal-600">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
