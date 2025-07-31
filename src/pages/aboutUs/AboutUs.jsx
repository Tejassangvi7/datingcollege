import React from "react";
import { motion } from "framer-motion";
import { Instagram, AlertTriangle, HelpCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab] text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-pink-400">About JIIT Dating</h1>

        <p className="text-lg text-gray-200">
          Welcome to <span className="text-pink-300 font-semibold">JIIT Dating</span> – a private and secure space
          for students to find meaningful connections. Whether you're looking for friendship,
          romance, or just someone to talk to, our platform is designed to bring JIITians closer in a
          respectful and fun way.
        </p>

        <p className="text-md text-gray-300">
          This platform is not officially affiliated with JIIT and uses a creative name inspired by the
          spirit of the university. We are committed to keeping the experience safe, anonymous, and
          student-friendly.
        </p>

        {/* ⚠️ Privacy Warning */}
        <div className="bg-yellow-400/10 border border-yellow-500 rounded-xl p-4 text-yellow-300 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6" />
          <p className="text-sm text-left">
            ⚠️ You are using this website by your own choice. We are not responsible for any data privacy or misuse of information. Please act responsibly and stay safe.
          </p>
        </div>

        {/* 🆘 Help Message */}
        <div className="bg-red-500/10 border border-red-400 rounded-xl p-4 text-red-300 flex items-center gap-3">
          <HelpCircle className="w-6 h-6" />
          <p className="text-sm text-left">
            🚨 If you feel any unethical, vulgar, or criminal behavior is happening to you on this platform,
            please don't hesitate to contact us immediately. We take such matters seriously and will respond promptly.
          </p>
        </div>

        {/* 📱 Contact Info */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <Instagram className="text-pink-400" />
          <a
            href="https://instagram.com/your_instagram_id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:underline"
          >
         https://www.instagram.com/jiit_connects?igsh=eGJuZXVsenB0cmw3
          </a>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Built with ❤️ by students, for students.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutUs;
