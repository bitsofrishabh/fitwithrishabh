import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';

interface ContactFormData {
  name: string;
  age: string;
  city: string;
  height: string;
  weight: string;
  goalWeight: string;
  profession: string;
  healthIssues: string;
  email: string;
  phone: string;
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Format the message for WhatsApp
      const message = `
New Contact Form Submission:
📝 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🎂 Age: ${data.age}
🏠 City: ${data.city}
⬆ Height: ${data.height}
⚖ Weight: ${data.weight}
🔥 Goal Weight: ${data.goalWeight}
💼 Work/Profession: ${data.profession}
🏥 Health issues/Fitness Goals: ${data.healthIssues}
      `.trim();

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      
      // Your WhatsApp number
      const whatsappNumber = '919876543210'; // Replace with your actual number
      
      // Create WhatsApp URL
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      toast.success('Form submitted successfully! Redirecting to WhatsApp...');
      
      // Reset form
      reset();
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg md:text-xl text-gray-600">
              Have questions? We're here to help you on your wellness journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
              <Phone className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 text-center">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
              <Mail className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-center break-all">contact@healthybusiness.com</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
              <MapPin className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600 text-center">123 Wellness Street, Health City</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  {...register('age', { required: 'Age is required' })}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register('city', { required: 'City is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm) *
                </label>
                <input
                  {...register('height', { required: 'Height is required' })}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Weight (kg) *
                </label>
                <input
                  {...register('weight', { required: 'Weight is required' })}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Weight (kg) *
                </label>
                <input
                  {...register('goalWeight', { required: 'Goal weight is required' })}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.goalWeight && <p className="text-red-500 text-sm mt-1">{errors.goalWeight.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work/Profession *
                </label>
                <input
                  {...register('profession', { required: 'Profession is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  {...register('phone', { 
                    required: 'Phone is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number"
                    }
                  })}
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Issues/Fitness Goals *
              </label>
              <textarea
                {...register('healthIssues', { required: 'This field is required' })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              {errors.healthIssues && <p className="text-red-500 text-sm mt-1">{errors.healthIssues.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}