import React from 'react';

const updates = [
  {
    title: 'Video Chat (Coming Soon)',
    description: 'Have face-to-face conversations directly within the app, securely and seamlessly.',
    icon: '🎥',
    eta: 'August 2025',
  },
  {
    title: 'Voice Messages',
    description: 'Send short voice notes to express more personality and emotion in your chats.',
    icon: '🎙️',
    eta: 'September 2025',
  },
  {
    title: 'AI Match Suggestions',
    description: 'Smart recommendations based on behavior and shared interests — not just swipes.',
    icon: '🤖',
    eta: 'Fall 2025',
  },
  {
    title: 'Profile Boost',
    description: 'Temporarily boost your visibility to get more matches in your area.',
    icon: '🚀',
    eta: 'October 2025',
  },
  {
    title: 'Dark Mode Scheduler',
    description: 'Automatically switch between light and dark themes based on time or preference.',
    icon: '🌙',
    eta: 'Late 2025',
  },
];

const UpcomingUpdates = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Upcoming Updates</h1>
        <p className="text-lg text-gray-400 mb-12">
          We’re constantly improving. Here’s a sneak peek at what’s launching soon on our platform.
        </p>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)] scroll-smooth">
          {/* Added overflow for smooth scrolling and max height for content overflow */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {updates.map((update, i) => (
              <div
                key={i}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{update.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{update.title}</h2>
                <p className="text-gray-400 text-sm mb-3">{update.description}</p>
                <span className="text-xs text-blue-400">ETA: {update.eta}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 text-sm text-gray-500">
          Have a feature request?{' '}
          <a href="/contact" className="text-blue-400 underline hover:text-blue-300">
            Let us know
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default UpcomingUpdates;
