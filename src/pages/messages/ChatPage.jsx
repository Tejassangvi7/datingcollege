import React, { useState, useEffect } from 'react'
import api from '../../api/api'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify'
import RightSidebar from './RightSidebar'
import ChatContainer from './ChatContainer'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingComponent';
const ChatPage = () => {
   const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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



  const [selectedUser, setSelectedUser] = useState(false)


  return loading ? <LoadingSpinner /> : (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
  overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
          }`}
      >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default ChatPage
