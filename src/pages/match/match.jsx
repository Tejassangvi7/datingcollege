import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, X } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingComponent';
import api from '../../api/api';
import MatchPopup from "./matchSuccessful"

const LS_PROFILES = 'match_profiles';
const LS_INDEX = 'match_index';

function MatchSwipe() {
  const [matchSuccessful , setMatchSuccessful]= useState(false)
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate =useNavigate()


 useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You are not logged in. Please login first.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
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



  // used to know if we loaded from localStorage (so we don't instantly refetch & overwrite)
  const restoredRef = useRef(false);

  // used to avoid writing an empty [] + 0 to localStorage on the first render
  const hydratedRef = useRef(false);

  const pageRef = useRef(1);

  const currentProfile = profiles[currentIndex];

  const fetchProfiles = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await api.get(`/api/v1/profile/getProfiles`);
      const newProfiles = response.data;
      setProfiles(prev => [...prev, ...newProfiles]);
      pageRef.current += 1;
    } catch (error) {
      console.error('Failed to load profiles', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  /**
   * 1) Try to restore from localStorage first.
   *    If restored AND currentIndex < 8, do NOT fetch again now.
   * 2) Otherwise, fetch fresh.
   */
  useEffect(() => {
    const savedProfiles = localStorage.getItem(LS_PROFILES);
    const savedIndex = localStorage.getItem(LS_INDEX);

    if (savedProfiles && savedIndex !== null) {
      const parsedProfiles = JSON.parse(savedProfiles);
      const parsedIndex = parseInt(savedIndex, 10);

      if (parsedProfiles.length > 0 && parsedIndex < 8) {
        setProfiles(parsedProfiles);
        setCurrentIndex(parsedIndex);
        restoredRef.current = true;   // ✅ mark that we restored
        hydratedRef.current = true;   // ✅ we already have data, safe to save later
        return;
      }
    }

    // No usable restore -> fetch fresh
    fetchProfiles();
  }, []);

  /**
   * Persist to localStorage whenever profiles/index change.
   * BUT: skip the very first render if we still have empty data.
   */
  useEffect(() => {
    // If we don't have any profiles yet, don't write empty [] to LS and wipe the previous cache
    if (!hydratedRef.current) {
      if (profiles.length === 0) return;
      hydratedRef.current = true;
    }

    localStorage.setItem(LS_PROFILES, JSON.stringify(profiles));
    localStorage.setItem(LS_INDEX, currentIndex.toString());
  }, [profiles, currentIndex]);

  /**
   * Optional: wipe cache after 8 swipes.
   * Remove this if you want to always persist.
   */
  useEffect(() => {
    if (currentIndex >= 8) {
      localStorage.removeItem(LS_PROFILES);
      localStorage.removeItem(LS_INDEX);
    }
  }, [currentIndex]);

  /**
   * Fetch more when only 2 left.
   * BUT if we just restored and haven't swiped anything yet (currentIndex === 0),
   * do NOT fetch — keep showing the exact same list on refresh.
   */
  useEffect(() => {
    // if we restored and user hasn't swiped yet, DON'T fetch
    if (restoredRef.current && currentIndex === 0) return;

    const remaining = profiles.length - currentIndex;
    if (remaining <= 2 && profiles.length > 0) {
      fetchProfiles();
    }
  }, [currentIndex, profiles.length]); // include profiles.length so it recalculates remaining correctly

  
  
  
   const handlelike = async () => {
    try {
      if (!currentProfile || isAnimating) return;

      setIsAnimating(true);
      const matchId = currentProfile._id;
      if (!matchId) {
        setIsAnimating(false);
        return;
      }

      const response = await api.post(`/api/v1/matches/${matchId}`);

      if (response?.data?.match === true) {
        setMatchSuccessful(true);
        setIsAnimating(false);
        return; // wait for popup to advance card
      }

      setCurrentIndex((prev) => prev + 1);
      restoredRef.current = false;
      setTimeout(() => setIsAnimating(false), 500);
    } catch (error) {
      console.error(error);
      setIsAnimating(false);
    }
  };







const handledislike = async(action)=>{
    try {
      if (!currentProfile || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
    // once the user actually swipes, allow future "remaining <= 2" fetches
    restoredRef.current = false;
    setTimeout(() => setIsAnimating(false), 500);
    } catch (error) {
      console.log(error);
      
    }
}
  const handleDragEnd = (info) => {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    if (Math.abs(offsetX) > 100) {
      if(offsetX>0)
      {
        handlelike('like')
      }else{
        handledislike('dislike')
      }
    } else if (offsetY < -100) {
      handlelike('superlike');
    }
  };

  return loading?(<LoadingSpinner/>):(matchSuccessful?(<MatchPopup profile={currentProfile} onClose={() => {setMatchSuccessful(false);  setCurrentIndex(prev => prev + 1)}} />
):(<>
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/OBMPrTprh8Nx59VU/scene.splinecode" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Discover</h1>
          <p className="text-white/80 drop-shadow">Find your perfect match</p>
        </div>

        {/* Cards */}
        <div className="relative w-full max-w-sm mx-auto">
          <AnimatePresence mode="wait">
          {currentProfile && (
            <motion.div
              key={currentProfile._id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => handleDragEnd(info)}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
              whileDrag={{ scale: 1.05 }}
              className="backdrop-blur-xl bg-white/20 rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={currentProfile.profile}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover opacity-90"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl font-bold mb-1 drop-shadow">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <p className="text-sm opacity-90 mb-2 drop-shadow">{currentProfile.location}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/90 leading-relaxed">{currentProfile.year}</p>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <motion.button
            onClick={() => handledislike('dislike')}
            disabled={isAnimating}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 backdrop-blur-lg bg-white/30 text-red-500 rounded-full shadow-lg flex items-center justify-center hover:bg-red-50/30 transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </motion.button>

          <motion.button
            onClick={() => handlelike('superlike')}
            disabled={isAnimating}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 backdrop-blur-lg bg-white/30 text-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50/30 transition-colors disabled:opacity-50"
          >
            <Star size={24} />
          </motion.button>

          <motion.button
            onClick={() => handlelike('like')}
            disabled={isAnimating}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 backdrop-blur-lg bg-white/30 text-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-50/30 transition-colors disabled:opacity-50"
          >
            <Heart size={24} />
          </motion.button>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex gap-2">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentIndex
                  ? 'bg-white/50'
                  : index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4 text-center text-white/70 text-sm drop-shadow"
        >
          <p>Swipe left to pass • Swipe right to like • Swipe up to super like</p>
        </motion.div>
      </div>
    </div>
   </>
  ))
  
}

export default MatchSwipe;
