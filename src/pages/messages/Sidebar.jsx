import React, { useState, useEffect } from 'react';
import api from "../../api/api";

import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const Online = async ({ user }) => {
  try {
    const res = await api.get(`/api/v1/profile/getProfileUser/${user._id}`);
    if (res) {
      const updatedOnlineStatus = res.data.userP.isOnline;

      setChats(prevChats =>
        prevChats.map(u =>
          u._id === user._id ? { ...u, isOnline: updatedOnlineStatus } : u
        )
      );
    }
  } catch (error) {
    console.log("error in fetching is online:", error);
  }
};


  const fetchChats = async () => {
    try {
      const res = await api.get(`/api/v1/message/leftsidebar?page=${page}&limit=10`);
      console.log("data is ", res);

      if (res.data.chatList.length < 10) setHasMore(false);
      setChats(prev => [...prev, ...res.data.chatList]);
    } catch (err) {
      console.error("Error fetching chat list:", err);
    }
  };

  useEffect(() => {
    fetchChats();
    
  }, [page]);

  const handleScroll = (e) => {
    const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (isBottom && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}
    >
      {/* Top Section */}
      {/* Top Section */}
      {/* Top Section */}
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            alt='robot'
            className='max-w-12'
          />
          <div className='relative py-2 group'>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
              alt='Menu'
              className='max-h-5 cursor-pointer'
            />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img
            src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
            alt="Search"
            className='w-3'
          />
          <input
            type="text"
            className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1'
            placeholder='Search User...'
          />
        </div>
      </div>


      {/* Chat List */}
      <div className='flex flex-col'>
        {chats.map((user, index) => (
          <div
            key={user._id || index}
            onClick={() => {
              setSelectedUser(user);
              
              
              Online({ user });
            }}

            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}
          >
            <img
              src={user?.profile || "/default-profile.png"}
              alt=""
              className='w-[35px] aspect-[1/1] rounded-full'
            />
            <div className='flex flex-col leading-5'>
              <p>{user.name}</p>
              {user.isOnline
                ? <span className='text-green-400 text-xs'>Online</span>
                : <span className='text-neutral-400 text-xs'>Offline</span>
              }
            </div>
            {index > 2 &&
              <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                {index}
              </p>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
