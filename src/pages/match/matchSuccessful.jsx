import React from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const MatchPopup = ({ profile, onClose }) => {
  const navigate = useNavigate();
const UserID = localStorage.getItem("UserID")
  if (!profile) return null;
const handleMessage = async () => {
  const newMessage = {
    senderId: UserID,
    receiverId: profile._id,
    text: "It's a match",
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await api.post("/api/v1/message/create", newMessage);
    
    if (res.status === 201) {
      navigate("/messages"); // Adjust route if needed
      onClose(); // Close the popup
    } else {
      console.error("Failed to save message to server:", res.data);
    }

  } catch (error) {
    console.error("Error while sending message:", error);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-pink-600">🎉 It's a Match!</h2>
        <img
          src={profile.profile}
          alt={profile.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <p className="text-lg font-semibold">{profile.name}</p>
        <p className="text-sm text-gray-500">{profile.year} • {profile.age} yrs</p>
        <p className="mt-3 text-gray-600">You both liked each other</p>

        <button
          onClick={handleMessage}
          className="mt-5 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center gap-2 mx-auto"
        >
          <MessageCircle size={18} />
          Send Message
        </button>
      </div>
    </motion.div>
  );
};

export default MatchPopup;
