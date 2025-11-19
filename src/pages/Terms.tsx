import { Check } from 'lucide-react';

const terms = [
  "I understand that this is a 12-week program commitment.",
  "I will follow the diet plan provided and communicate any concerns promptly.",
  "I understand that results may vary based on individual commitment and adherence to the program.",
  "I will participate in regular check-ins and provide honest feedback about my progress.",
  "I acknowledge that this program requires dedication and consistent effort.",
  "I will maintain open communication with my coach throughout the program.",
  "I understand that no refunds will be provided after the program begins.",
  "I will respect the intellectual property of all program materials provided.",
  "I agree to use the workout plans responsibly and within my physical capabilities.",
  "I will consult with a healthcare provider before starting any new exercise routine."
];

export default function Terms() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before proceeding with the program
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="space-y-6">
            {terms.map((term, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{term}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Additional Terms</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                By participating in this program, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>The program content is for personal use only and cannot be shared or redistributed.</li>
                <li>All communication will be conducted through approved channels (WhatsApp, email, or scheduled calls).</li>
                <li>Progress tracking and photo submissions are required for optimal results and accountability.</li>
                <li>The program may be modified based on individual progress and needs.</li>
                <li>Payment is non-refundable once the program has commenced.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-gray-700">
              We take your privacy seriously. All personal information, progress photos, and communication will be kept strictly confidential and used only for program-related purposes. Your information will never be shared with third parties without your explicit consent.
            </p>
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-gray-700">
              While we strive to help you achieve your fitness goals, results may vary. Success depends on various factors including but not limited to dedication, consistency, and individual physiological differences. This program is not a substitute for medical advice, and you should consult with healthcare professionals before starting any new fitness regimen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}