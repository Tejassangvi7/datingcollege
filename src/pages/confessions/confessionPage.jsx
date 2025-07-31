import React, { useState , useEffect} from 'react';
import ConfessionForm from '../../components/confessionForm';
import { toast } from 'react-toastify';
import ConfessionsFeedall from '../../components/confessionFeedall';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // Add this at the top

import LoadingSpinner from '../../components/LoadingComponent';
import { motion } from 'framer-motion';

export default function ConfessionPage() {
      const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("You are not logged in. Please login first.", { theme: "dark" });
          setTimeout(() => navigate('/login'), 3000);
          console.log("bhhhjk");
          
          return;
        }
        try {
          const response = await api.post("/api/v1/auth/check");
          if (response.status !== 200) {
            throw new Error("Invalid session");
          }
          setLoading(false);
        } catch {
          toast.error("Session expired. Please login again.", { theme: "dark" });
          setTimeout(() => navigate('/login'), 3000);
        }
      };
      checkAuth();
    }, [navigate]);
  





  const [postAnonymous, setPostAnonymous] = useState(false);

  return loading?<LoadingSpinner/> :(
    <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
      {/* Background Gradient and Animated Blobs */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col justify-start items-center relative p-4">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-fuchsia-400/20 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
        </div>

        {/* ❤️ Header */}
        <header className="w-full py-10 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold text-pink-400 tracking-tight drop-shadow-lg"
          >
            💖 Confessions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-gray-300 font-light"
          >
            Speak your heart — anonymously or with your name
          </motion.p>
        </header>

        {/* 🌟 Main Content */}
        <main className="flex flex-col items-center justify-center px-4 py-8 space-y-12 relative z-10 w-full max-w-4xl">
          {/* ✨ Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full space-y-6 border border-white/20"
          >
            {/* 🕹️ Toggle Switch */}
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-medium text-gray-200">
                {postAnonymous ? 'Posting as Anonymous' : 'Posting with Your Name'}
              </span>
              <div
                className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${
                  postAnonymous ? 'bg-pink-500/70' : 'bg-purple-500/70'
                } shadow-inner`}
                onClick={() => setPostAnonymous(!postAnonymous)}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="bg-white w-6 h-6 rounded-full shadow-md"
                />
              </div>
            </div>

            {/* 📝 Confession Form */}
            <ConfessionForm postAnonymous={postAnonymous} />
          </motion.div>

          {/* 📜 Confessions Feed */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full space-y-6"
          >
            <ConfessionsFeedall />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
