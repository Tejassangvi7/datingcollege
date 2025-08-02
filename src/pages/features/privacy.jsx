import React from 'react';

const sections = [
  {
    icon: '🔒',
    title: 'Your Privacy Matters',
    description:
      'We protect your personal data with modern encryption and security protocols. Your messages and personal info stay private.',
  },
  {
    icon: '✅',
    title: 'Verified Users Only',
    description:
      'Every user goes through verification to ensure a genuine and safe experience. Look for the verified badge on profiles.',
  },
  {
    icon: '🛡️',
    title: 'End-to-End Encryption',
    description:
      'Private conversations are encrypted from end to end — only you and your match can read them.',
  },
  {
    icon: '🚫',
    title: 'Report & Block Instantly',
    description:
      'Block or report suspicious users anytime. Our moderation team takes reports seriously to maintain a safe community.',
  },
  {
    icon: '🔍',
    title: 'Full Control of Your Data',
    description:
      'You can update or delete your data anytime. We comply with GDPR and respect your right to privacy.',
  },
];

const PrivacySecurity = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4 min-h-screen overflow-y-auto scroll-smooth max-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy & Security</h1>
        <p className="text-lg text-gray-400 mb-12">
          Your safety is our priority. Here's how we protect your privacy and security on our platform.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((sec, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">{sec.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{sec.title}</h2>
              <p className="text-gray-400 text-sm">{sec.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Last updated: July 31, 2025 — Read our{' '}
          <a href="/terms" className="text-blue-400 underline hover:text-blue-300">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacySecurity;
