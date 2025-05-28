import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: 'Dt. Savita Choudhary',
    role: 'Lead Nutritionist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'With over 10 years of experience in nutrition and wellness coaching.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Michael Chen',
    role: 'Fitness Specialist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'Certified personal trainer specializing in functional fitness and rehabilitation.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  }
];

export default function About() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        {/* About Me Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/djdej77pl/image/upload/v1735963253/IMG_5876_hhqjs4.jpg"
                alt="Founder"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-teal-600 text-white p-4 rounded-lg">
                <p className="font-semibold">4+ Years Experience</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
               Hi, I’m Rishabh Singh, your dedicated fitness coach. With over six years of experience in the IT industry and a passion for fitness, I have transformed my own life and now aim to help others achieve their health and fitness goals.


              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
              I embarked on my fitness journey to improve my health, energy levels, and overall well-being. Throughout this process, I gained invaluable insights into effective exercise routines and nutritional strategies. This journey not only transformed my body but also enhanced my confidence and energy, fueling my desire to help others.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-teal-600 hover:text-teal-700">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-700">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-700">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-teal-600 mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  <div className="flex gap-4">
                    <a href={member.social.twitter} className="text-gray-600 hover:text-teal-600">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-600 hover:text-teal-600">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.social.github} className="text-gray-600 hover:text-teal-600">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}