import React, { useEffect, useRef, useState } from 'react';
import { formatMessageTime } from "../../../lib/utils";
import api from '../../api/api';
import { getSocket } from '../../sockets/sockets';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollEnd = useRef();
  const currentUserId = localStorage.getItem("UserID");
  const [myprofilepic, setmyprofilepic]=useState('')

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/v1/profile/getMyProfile");

      if (res.status === 200) {
        console.log(res.data);
        setmyprofilepic(res.data.profile)
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, []);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/v1/message/${selectedUser._id}`);
        console.log("message:" ,res);
        
        const msgs = res?.data?.messages;
        setMessages(Array.isArray(msgs) ? msgs : []);
        console.log(messages);
        
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages([]);
      }
    };

    if (selectedUser?._id) fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleIncomingMessage = (newMessage) => {
      if (
        
        newMessage.senderId === currentUserId ||
        newMessage.receiverId === currentUserId
      ) {
        //  console.log(newMessage);
        setMessages((prev) => [...prev, newMessage]);
      
        
      }
    };

    socket.on("private-message", handleIncomingMessage);
    return () => socket.off("private-message", handleIncomingMessage);
  }, [selectedUser]);

const handleSendMessage = async () => {
  const socket = getSocket();

  if (text.trim() && selectedUser._id.trim()) {
    const newMessage = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      text,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post("/api/v1/message/create", newMessage);

      if (res.status !== 201) {
        console.error("Failed to save message to server:", res.data);
        return;
      }

      // Emit to socket
      socket.emit("private-message", newMessage);

      // Update UI immediately
      setMessages((prev) => [...prev, newMessage]);
      setText('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};


  const handleImageChange = async (e) => {
    const socket = getSocket();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/api/v1/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;

      const newMessage = {
        senderId: currentUserId,
        receiverId: selectedUser._id,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      socket.emit("private-message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return selectedUser ? (
    <div className='h-full overflow-hidden relative bg-gray-900 text-white'>
      {/* Header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-gray-700'>
        <img
          src={selectedUser.profile || "/default-avatar.png"}
          alt=""
          className='w-8 h-8 rounded-full object-cover'
        />
        <p className='flex-1 text-lg text-white font-semibold flex items-center gap-2'>
          {selectedUser.name}
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden text-white text-sm underline"
        >
          Back
        </button>
      </div>

      {/* Chat Messages */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-4 pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
        {Array.isArray(messages) && messages.map((msg, index) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div key={index} className={`flex items-end mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
              {!isMine && (
                <div className='flex flex-col items-center mr-2'>
                  <img
                    src={selectedUser.profile || "/default-avatar.png"}
                    alt=""
                    className='w-6 h-6 rounded-full object-cover'
                  />
                  
                  <span className='text-xs text-gray-500'>{formatMessageTime(msg.createdAt)}</span>
                </div>
              )}

              <div className={`max-w-[70%] ${isMine ? 'text-right' : 'text-left'}`}>
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="sent-img"
                    className='w-full max-w-xs rounded-lg border border-gray-700'
                  />
                ) : (
                  <p className={`p-3 text-sm rounded-lg break-words ${isMine
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-black rounded-bl-none'}`}>
                    {msg.text}
                  </p>
                )}
              </div>

              {isMine && (
                <div className='flex flex-col items-center ml-2'>
                  <img
                    src={myprofilepic}
                    alt=""
                    className='w-6 h-6 rounded-full object-cover'
                  />
                  
                  <span className='text-xs text-gray-500'>{formatMessageTime(msg.createdAt)}</span>
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Message Input */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-gray-800 border-t border-gray-700'>
        <div className='flex-1 flex items-center bg-gray-700 px-3 py-2 rounded-full'>
          <input
            type="text"
            placeholder='Send a message'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='flex-1 text-sm bg-transparent text-white placeholder-gray-400 border-none outline-none'
          />
          <input
            type="file"
            id="image"
            accept='image/png, image/jpeg'
            hidden
            onChange={handleImageChange}
          />
        
        </div>
        <button
          onClick={handleSendMessage}
          className='text-white px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm'
        >
          Send
        </button>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-800 h-full max-md:hidden'>
      <img src='/logo.svg' className='w-16' alt="" />
      <p className='text-lg font-medium text-white'>
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
