import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 mt-[3rem] lg:mt-12 min-h-[calc(100vh-4rem)] relative z-10">
      {/* Left Text Content */}
      <div data-aos="fade-right" className="w-full lg:w-1/2 mb-16 lg:mb-0">
        <div className="relative w-56 sm:w-60 h-10 bg-gradient-to-r from-[#888888] to-[#e99b63] shadow-lg rounded-full mb-6">
          <div className="absolute inset-[3px] bg-[#0f0f0f] text-white rounded-full flex items-center justify-center gap-2 text-sm sm:text-base">
            <i className='bx bxs-diamond'></i>
            INTRODUCING
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-6 leading-tight">
          FIND YOUR <br className="hidden sm:block" /> MATCH
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-md lg:max-w-xl tracking-wide">
          💛 Welcome to JIIT Connects — a dark-themed modern platform designed to foster meaningful connections within your campus community. Build genuine relationships, engage in thoughtful conversations, and discover like-minded individuals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link to="/" className="w-full sm:w-auto text-center border border-gray-500 py-2 px-6 rounded-full text-sm sm:text-base font-medium text-white hover:bg-white hover:text-black transition">
            For source code , go to aboutUs section <i className="bx bx-link-external"></i>
          </Link>
          <Link to="/home-page" className="w-full sm:w-auto text-center py-2 px-8 rounded-full text-sm sm:text-base font-medium bg-white text-black hover:bg-gray-300 transition">
            Get Started
          </Link>
        </div>
      </div>

      {/* Right 3D Animation (Moderately Enlarged + Moved Up) */}
      <div
        data-aos="fade-left"
        className="w-full lg:w-1/2 h-[25rem] sm:h-[32rem] md:h-[38rem] lg:h-[42rem] flex items-start justify-center mt-[-2rem] sm:mt-[-3rem] md:mt-[-4rem]"
      >
        <div className="w-full h-full transform scale-[1.2] sm:scale-[1.3] md:scale-[1.35] lg:scale-[1.4]">
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/6Q9D0WglHry37UCC/scene.splinecode"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
