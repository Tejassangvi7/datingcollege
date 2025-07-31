import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/Signup");
  };

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 sm:px-8 lg:px-20 z-50 relative">
      <h1
        data-aos="fade-down"
        className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide"
      >
        JIIT CONNECTS
      </h1>

      <nav className="hidden md:flex items-center gap-8 lg:gap-10">
        <Link to="/upcomping-events" className="text-sm lg:text-base tracking-wider hover:text-gray-400 transition">
          UPCOMING UPDATES
        </Link>
        <Link to="/features" className="text-sm lg:text-base tracking-wider hover:text-gray-400 transition">
          FEATURES
        </Link>
        <Link to="/privacy-security" className="text-sm lg:text-base tracking-wider hover:text-gray-400 transition">
          PRIVACY & SECURITY
        </Link>
        <Link to="/about-us" className="text-sm lg:text-base tracking-wider hover:text-gray-400 transition">
          ABOUT US
        </Link>
      </nav>

      <button
        onClick={handleSignup}
        className="hidden md:block bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-300 transition"
      >
        SIGNUP
      </button>

      <button onClick={toggleMobileMenu} className="md:hidden text-3xl z-50 text-white">
        <i className='bx bx-menu'></i>
      </button>

      <div
        id="mobileMenu"
        className="hidden fixed top-16 bottom-0 right-0 left-0 bg-[#0f0f0f] bg-opacity-95 backdrop-blur-md p-6 z-40 flex flex-col gap-6 items-center md:hidden"
      >
        <Link to="/upcomping-events" className="text-lg tracking-wider hover:text-gray-300 transition" onClick={toggleMobileMenu}>
          UPCOMING UPDATES
        </Link>
        <Link to="/features" className="text-lg tracking-wider hover:text-gray-300 transition" onClick={toggleMobileMenu}>
          FEATURES
        </Link>
        <Link to="/privacy-security" className="text-lg tracking-wider hover:text-gray-300 transition" onClick={toggleMobileMenu}>
          PRIVACY & SECURITY
        </Link>
        <Link to="/about-us" className="text-lg tracking-wider hover:text-gray-300 transition" onClick={toggleMobileMenu}>
          ABOUT US
        </Link>
        <button
          onClick={() => {
            handleSignup();
            toggleMobileMenu();
          }}
          className="mt-4 bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-300 transition"
        >
          SIGNUP
        </button>
      </div>
    </header>
  );
};

export default Header;
