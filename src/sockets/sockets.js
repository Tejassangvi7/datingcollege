// socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  const UserID = localStorage.getItem("UserID");
  console.log("Attempting to connect. UserID:", UserID);

  if (!UserID) return;

  if (!socket) {
    socket = io("https://collegedating-1.onrender.com", {
      query: { UserID },
      transports: ["websocket"],
      autoConnect: true, // or remove this line entirely (default is true)
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:");
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  } else {
    console.log("⚠️ Socket already exists. Checking connection...");

    if (!socket.connected) {
      socket.connect(); // Ensure it connects if not already
    }
  }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket disconnected and cleaned up");
  }
};
