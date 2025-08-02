import React from 'react';

const features = [
  {
    title: 'Verified Users',
    description: 'All users go through a verification process to ensure authenticity and build trust.',
    icon: '✅',
  },
  {
    title: 'Animated Background',
    description: 'Enjoy a visually engaging experience with smooth, dynamic background animations.',
    icon: '🎨',
  },
  {
    title: 'Personal Chat',
    description: 'Chat privately and securely with people you connect with. Share photos, audio, and more.',
    icon: '💬',
  },
  {
    title: 'Talk to Stranger',
    description: 'Start spontaneous conversations with new people — no profile needed!',
    icon: '🎲',
  },
  {
    title: 'Upcoming Features',
    description: 'We’re constantly evolving! Look out for voice calls, video chats, and AI-based match suggestions.',
    icon: '🚀',
  },
];

const Features = () => {
  return (
    <div className="features-section bg-gradient-to-r from-white to-gray-100 py-8 px-4 min-h-screen overflow-y-auto">
      <h1 className="text-3xl text-center font-bold mb-8">App Features</h1>

      <div
        className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto"
        style={{
          maxHeight: 'calc(100vh - 160px)', // Optional: ensures that the scrollable section does not overflow out of screen.
          overflowY: 'auto', // Ensures vertical scrolling if content exceeds the height
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
