import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Spline from '@splinetool/react-spline';
import api from '../../api/api';
import LoadingSpinner from '../../components/LoadingComponent';
import ConfessionsFeedall from "./confessionfeedhomepage";
import { useNavigate } from 'react-router-dom';
import {
  User, MessageSquare, Heart, Shuffle, Lock, FileText,
  Settings, Plus, Menu, X, Users, BookOpen
} from 'lucide-react';
import MatchPopup from '../match/matchSuccessful';

const navigationItems = [
  { icon: User, label: 'My Profile', id: 'profile', route: "/profile-page" },
  { icon: MessageSquare, label: 'Messages', id: 'messages', route: "/messages" },
  { icon: Heart, label: 'Match', id: 'match', route: "/match" },
  { icon: Shuffle, label: 'Random Match', id: 'random-match', route: "/random-match" },
  { icon: FileText, label: 'Find', id: 'my-confession', route: "/Search" },
  { icon: Settings, label: 'comingsoon', id: 'settings', route: "/settings" },
  { icon: Lock, label: 'AboutUs', id: 'AboutUs', route: "/About-us" },
];

const PeopleCard = ({ name, course, year, interests, onRightSwipe, disableRightSwipe }) => (
  <motion.div
    className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-5 hover:bg-black/30 transition-all duration-300 shadow-lg"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center gap-4 mb-3">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {name?.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-gray-400 text-sm">{course} • {year}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {interests?.map((interest, index) => (
        <span key={index} className="px-3 py-1 bg-gray-600/30 rounded-full text-gray-200 text-xs">
          {interest}
        </span>
      ))}
    </div>
    <div className="flex gap-2">
      <button
        onClick={onRightSwipe}
        disabled={disableRightSwipe}
        className={`flex-1 py-2 px-4 rounded-lg transition-colors 
          ${disableRightSwipe ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        Right Swipe
      </button>
    </div>
  </motion.div>
);

function Homepage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('confession');
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [peoplePage, setPeoplePage] = useState(1);
  const [hasMorePeople, setHasMorePeople] = useState(true);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [fetchedPages, setFetchedPages] = useState(new Set());
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [disabledMatches, setDisabledMatches] = useState(new Set());

  const scrollContainerRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchPeople = async () => {
    if (!hasMorePeople || peopleLoading || fetchedPages.has(peoplePage)) return;

    setPeopleLoading(true);
    try {
      const res = await api.get(`/api/v1/search/profile?page=${peoplePage}&limit=10`);
      if (res.status === 200) {
        const newProfiles = res.data || [];

        if (newProfiles.length === 0) {
          toast.info("🎉 You've seen all profiles!", { theme: "dark" });
          setHasMorePeople(false);
          return;
        }

        setFetchedPages(prev => new Set(prev).add(peoplePage));
        setPeople(prev => {
          const seenIds = new Set(prev.map(p => p._id));
          const filtered = newProfiles.filter(p => !seenIds.has(p._id));
          return [...prev, ...filtered];
        });
        setPeoplePage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
      setHasMorePeople(false);
    } finally {
      setPeopleLoading(false);
    }
  };

  const handleRightSwipe = async (profile) => {
    try {
      const res = await api.post(`/api/v1/matches/${profile._id}`);
      if (res?.data?.match === true) setMatchedProfile(profile);
      else setDisabledMatches(prev => new Set(prev).add(profile._id));
    } catch (err) {
      console.error("Match request failed", err);
    }
  };

  const handleClosePopup = () => {
    setMatchedProfile(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      
      if (!token) {
        toast.error("You are not logged in. Please login first.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
        return;
      }
      try {
        const response = await api.post("api/v1/auth/check");
        if (response.status !== 200) throw new Error();
        setLoading(false);
      } catch {
        toast.error("Session expired. Please login again.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'people' && people.length === 0) {
      fetchPeople();
    }
  }, [activeTab]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || activeTab !== 'people') return;

    let throttleTimeout = null;

    const handleScroll = () => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;

        if (isNearBottom && !peopleLoading && hasMorePeople) {
          fetchPeople();
        }

        throttleTimeout = null;
      }, 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [peopleLoading, hasMorePeople, activeTab]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 z-0 opacity-80">
        <Spline scene="https://prod.spline.design/z7S8k-D34ovWqaq6/scene.splinecode" />
      </div>
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-20 h-full flex">
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={toggleSidebar} />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed lg:relative left-0 top-0 h-full w-72 bg-black/20 backdrop-blur-sm border-r border-white/10 z-40 flex flex-col"
              >
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-white font-bold text-lg">Menu</h2>
                  <button onClick={toggleSidebar} className="text-white/70 hover:text-white lg:hidden">
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(item.route)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col h-full">
          <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="text-white/70 hover:text-white">
                  <Menu size={24} />
                </button>
                <h1 className="text-white text-2xl font-bold tracking-wide">JIIT CONNECTS</h1>
              </div>
              <motion.button
                onClick={() => navigate('/confession-form')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Post Confession</span>
              </motion.button>
            </div>
          </header>

          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
            <div className="flex gap-4">
              <button onClick={() => setActiveTab('confession')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'confession' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                <BookOpen size={18} />
                <span>Confessions</span>
              </button>
              <button onClick={() => setActiveTab('people')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'people' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                <Users size={18} />
                <span>People</span>
              </button>
            </div>
          </div>

          <main ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'people' && (
                  <motion.div key="people" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-white text-xl font-semibold mb-5">Connect with People</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {people.map((person) => (
                        <PeopleCard
                          key={person._id}
                          {...person}
                          onRightSwipe={() => handleRightSwipe(person)}
                          disableRightSwipe={disabledMatches.has(person._id)}
                        />
                      ))}
                    </div>
                    {peopleLoading && <p className="text-white text-center mt-4">Loading more...</p>}
                    {!hasMorePeople && !peopleLoading && <p className="text-gray-400 text-center mt-4">🎉 You've seen all profiles!</p>}
                  </motion.div>
                )}

                {activeTab === 'confession' && (
                  <motion.div key="confession" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <ConfessionsFeedall />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
      {matchedProfile && <MatchPopup profile={matchedProfile} onClose={handleClosePopup} />}
    </div>
  );
}

export default Homepage;
