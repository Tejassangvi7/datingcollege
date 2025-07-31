// Features.jsx
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
    <div className="features-section" style={{ padding: '2rem', background: 'linear-gradient(to right, #fdfbfb, #ebedee)', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>App Features</h1>

      <div className="features-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {features.map((feature, index) => (
          <div key={index} style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
            <p style={{ fontSize: '0.95rem', color: '#555' }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
