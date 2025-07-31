import React from "react";
import Spline from "@splinetool/react-spline";
import { Globe2 } from "lucide-react"; // Modern globe icon
import ConfessionsFeedall from "../../components/confessionFeedall";

const AllConfessionsPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 🌌 Full-Page Spline Background */}
      <Spline
        scene="https://prod.spline.design/E1rGEngl0sdPxp9c/scene.splinecode"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* 📖 Heading */}
      <header className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-center mt-8">
        <div className="flex items-center gap-3">
          {/* 🌍 Spinning Icon */}
          <Globe2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-purple-500 animate-spin-slow" />
          {/* ✨ Neon Gradient Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)] animate-pulse">
            All Confessions
          </h1>
        </div>

        {/* 📝 Optional Subtitle */}
        <p className="mt-3 text-sm sm:text-lg md:text-xl text-gray-200">
          Share your thoughts anonymously with the world
        </p>
      </header>

     <main className="relative z-10 mt-40">
        <ConfessionsFeedall />
      </main>
    </div>
  );
};

export default AllConfessionsPage;
