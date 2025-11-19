import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long does the program typically last?",
    answer: "Our programs are typically 12 weeks long, but we customize the duration based on your individual goals and progress."
  },
  {
    question: "Do I need to have a gym membership?",
    answer: "No, our workouts can be done either at home or in a gym. We provide modifications for all exercises based on your available equipment."
  },
  {
    question: "How personalized is the nutrition plan?",
    answer: "Very personalized! We consider your dietary preferences, allergies, lifestyle, and specific health goals when creating your nutrition plan."
  },
  {
    question: "Can I follow the program if I have dietary restrictions?",
    answer: "Absolutely! We accommodate all dietary restrictions and preferences, including vegetarian, vegan, gluten-free, and more."
  },
  {
    question: "How often will I receive support?",
    answer: "You'll receive daily support through our app, with weekly check-ins and monthly progress reviews with your dedicated coach."
  },
   {
    question: "How are you different from other fitness coaches?",
    answer: "I focus on developing sustainable, healthy habits tailored to your needs and lifestyle. Instead of fad diets or quick fixes, I help you understand the importance of nutrition, movement, and overall well-being for long-term success."
  },
  {
    question: "How much weight can I target in a month?",
    answer: "Weight loss is important, but we'll also focus on improved fitness, body composition changes, and overall health. These factors are often better indicators of lasting success. On Average you will lose around 3-5kg in a month."
  },
  {
    question: "What kind of diets do you guys give?",
    answer: "We Focus on philosophy, not labels, I dont believe in one-size-fits-all diets. I'll work with you to create a balanced eating plan based on whole, nutritious foods that suits your preferences and supports your fitness goals."
  },
  {
    question: "So, how do you monitor progress?",
    answer: "We'll use a combination of methods, including regular weigh-ins, body measurements, progress photos, and feedback on how you're feeling. We track all these parameters on 1:1 chat."
  },
  {
    question: "Do you suggest Supplements or pills from the market.?",
    answer: "I will never push unnecessary products or supplements on you.."
  },
  {
    question: "Can I eat food from outside?",
    answer: "Occasionally eating out is fine! I'll teach you how to make healthier choices while dining out and how to balance those meals with the rest of your eating plan."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
