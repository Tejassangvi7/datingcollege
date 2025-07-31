import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, IdCard, Heart, Sparkles } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../components/LoadingComponent';
import api from "../../api/api";
import "react-toastify/dist/ReactToastify.css";

let mockProfiles = [];

export default function SearchPeoplePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

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
        if (response.status !== 200) throw new Error("Invalid session");
        setLoading(false);
      } catch {
        toast.error("Session expired. Please login again.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get("/api/v1/search/profile");
        mockProfiles = Array.isArray(response.data) ? response.data : [];
        mockProfiles.forEach((p, i) => {
          if (!p.name || !p.enrollment) {
            console.warn("Invalid profile data at index", i, p);
          }
        });
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value = query) => {
    const q = value.trim().toLowerCase();
    const filtered = mockProfiles.filter(
      (p) =>
        p?.name?.toLowerCase().includes(q) ||
        p?.enrollment?.toLowerCase().includes(q)
    );
    setFilteredProfiles(filtered);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") return setSuggestions([]);

    const lower = value.toLowerCase();
    const filtered = mockProfiles.filter(
      (p) =>
        p?.name?.toLowerCase().includes(lower) ||
        p?.enrollment?.toLowerCase().includes(lower)
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSelectSuggestion = (value) => {
    setQuery(value);
    handleSearch(value);
  };

  const handleRightSwipe = (name) => {
    toast.success(`💖 You swiped right on ${name}`);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
      <ToastContainer position="bottom-center" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-2 text-pink-400 text-3xl font-bold">
              <Sparkles className="animate-bounce" />
              Search People
            </div>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Find your match by name or enrollment.
            </p>
          </div>

          {/* Search Input */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative w-full" ref={wrapperRef}>
              <input
                type="text"
                placeholder="Search by name or enrollment..."
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-pink-400 transition"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white text-black rounded-xl shadow-md max-h-60 overflow-auto">
                  {suggestions.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => handleSelectSuggestion(user.name)}
                      className="px-4 py-2 hover:bg-pink-100 cursor-pointer border-b"
                    >
                      {user.name || "Unknown"} ({user.enrollment || "N/A"})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => handleSearch()}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              <Search className="mr-2 w-5 h-5" /> Search
            </button>
          </div>

          {/* Profile Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((user, idx) => (
                <motion.div
                  key={user.id}
                  className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex flex-col items-center border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.name || "User"}
                    className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-pink-500"
                  />
                  <h2 className="text-xl font-semibold text-center text-white">
                    {user.name || "Unknown"}, {user.age || "--"}
                  </h2>
                  <p className="text-sm text-white/70 flex items-center gap-1 mt-1">
                    <IdCard className="w-4 h-4" /> {user.enrollment || "N/A"}
                  </p>
                  <p className="text-sm text-white/70 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" /> {user.location || "Unknown"}
                  </p>
                  <div className="mt-3 text-sm flex flex-wrap justify-center">
                    {(user.interests || []).map((interest, i) => (
                      <span
                        key={i}
                        className="bg-pink-700 text-white px-3 py-1 rounded-full text-xs mr-2 mt-2"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleRightSwipe(user.name)}
                    className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center gap-2 transition"
                  >
                    <Heart className="w-4 h-4" /> Swipe Right
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-white/70">
                No matching profiles found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
