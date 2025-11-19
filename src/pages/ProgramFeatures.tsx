import { ArrowRight, Shield } from 'lucide-react';
import { PROGRAM_SECTIONS } from '../lib/constants';
import { motion } from 'framer-motion';
import CloudinaryImage from '../components/CloudinaryImage';

const healthIssues = [
  {
    title: "PCOS/PCOD Management",
    description: "Specialized program for managing PCOS/PCOD symptoms through diet and lifestyle changes.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
  },
  {
    title: "Thyroid Support",
    description: "Targeted approach to support thyroid health and manage related weight issues.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
  },
  {
    title: "Diabetes Management",
    description: "Comprehensive program for managing blood sugar levels through diet and exercise.",
    image: "https://images.unsplash.com/photo-1586015555751-63c4bd0766c6"
  },
  {
    title: "Weight Management",
    description: "Personalized weight loss or gain programs tailored to your body type and goals.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
  },
  {
    title: "Post Pregnancy",
    description: "Safe and effective post-pregnancy weight loss and fitness programs.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc"
  },
  {
    title: "General Wellness",
    description: "Holistic approach to improving overall health and maintaining a balanced lifestyle.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
  }
];

export default function ProgramFeatures() {
  return (
    <div className="pt-24">
      {/* Health Issues Section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Specialized programs for various health conditions and wellness goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {healthIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
                  <p className="text-gray-600 mb-4">{issue.description}</p>
                  <a
                    href="https://topmate.io/fitbyrishab/1033630"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                  >
                    Learn More <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Original Program Features Content */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Your Life with Our Premium Fitness Program
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {PROGRAM_SECTIONS.introduction.description}
              </p>
              <a
                href="https://topmate.io/fitbyrishab/1033630"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <CloudinaryImage
                  publicId="program/personalized_pq2nxs"
                  alt="Program Overview"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <p className="text-2xl font-bold text-teal-600">1000+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <p className="text-2xl font-bold text-teal-600">95%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAM_SECTIONS.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description || 'Experience the best in class fitness training with our expert guidance.'}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Your Journey to Success</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2" />
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              {PROGRAM_SECTIONS.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative bg-white p-6 rounded-xl shadow-lg"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 mt-4">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Program Benefits</h2>
              <div className="space-y-6">
                {PROGRAM_SECTIONS.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 text-teal-600">✓</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <CloudinaryImage
                  publicId="program/habit-change_kl4mxr"
                  alt="Program Benefits"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <Shield className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{PROGRAM_SECTIONS.guarantee.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{PROGRAM_SECTIONS.guarantee.description}</p>
            <a
              href="https://topmate.io/fitbyrishab/1033630"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition inline-block"
            >
              Start Your Journey Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
