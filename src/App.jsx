import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connectSocket, disconnectSocket } from './sockets/sockets';
import LandingPage from './pages/landingPage';

const App = () => {

  useEffect(() => {
        console.log("📦 App mounted");
    const token = localStorage.getItem("JWT_TOKEN");
    const userId = localStorage.getItem("UserID");

    if (token && userId) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div>
      <LandingPage />
      <ToastContainer />
    </div>
  );
};

export default App;
