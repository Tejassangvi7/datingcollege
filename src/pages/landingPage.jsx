import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Hero from '../components/Hero';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
    // Cleanup on unmount
    return () => AOS.refresh(); 
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-[#0f0f0f] text-white min-h-screen sm:min-h-full sm:overflow-auto scroll-smooth">
      {/* Background Gradient */}
      <img
        className="absolute top-0 right-0 opacity-20 w-[50rem] md:w-[70rem] -z-10"
        src="/gradient.png"
        alt="Background Gradient"
      />

      {/* Glow Blur Effect */}
      <div className="h-0 w-[40rem] absolute top-[30%] right-[-5%] shadow-[0_0_1000px_80px_#e99b63] -rotate-[30deg] -z-20"></div>

      {/* Header and Hero components */}
      <Header />
      <Hero />
    </main>
  );
};

export default LandingPage;
