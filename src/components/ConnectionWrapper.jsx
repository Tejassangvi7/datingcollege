// ConnectionWrapper.jsx
import React, { useEffect, useState } from "react";
import Disconnected from "./disconnect";
import { connectSocket, disconnectSocket } from "../sockets/sockets";

const ConnectionWrapper = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
      console.log("📦 ConnectionWrapper mounted");
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // ✅ Try connecting socket if online and user is authenticated
    if (navigator.onLine) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("UserID");

      if (token && userId) {
        console.log("🟢 Online and authenticated. Connecting socket...");
        connectSocket();
      } else {
        console.log("⚠️ No token or userId found. Skipping socket connection.");
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      disconnectSocket(); // 🧹 Clean up
    };
  }, []);

  if (!isOnline) {
    return <Disconnected />;
  }

  return children;
};

export default ConnectionWrapper;
