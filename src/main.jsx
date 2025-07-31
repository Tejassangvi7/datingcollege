import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Spline from '@splinetool/react-spline';

import "./index.css"
import App from "./App.jsx"
import ConnectionWrapper from "./components/ConnectionWrapper.jsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LandingPage from "./pages/landingPage.jsx"
import HomePage from "./pages/homepage/homePage.jsx"
import LoginPage from "./pages/authorized/LoginPage.jsx"
import Features from "./pages/features/features.jsx"
import PrivacySecurity from "./pages/features/privacy.jsx"
import RegistrationForm from "./pages/authorized/signupPage.jsx"
import ForgotPasswordPage from "./pages/authorized/passwordReset.jsx"
import ResetPassword from "./pages/authorized/passwordReset.jsx"
import ProfilePage from "./pages/profile/profilePageown.jsx"
import TalkToStrangerPage from "./pages/talktostranger/talktostranger.jsx"
import ConfessionForm from "./pages/confessions/confessionPage.jsx"
import UpcomingUpdates from "./pages/features/upcomingUpdates.jsx"
import Confession from "./components/confession.jsx"
import ConfessionsFeed from "./components/confessionFeed.jsx"
import Disconnected from "./components/disconnect.jsx"
import AllConfessionsPage from "./pages/confessions/allconfession.jsx"    
import ConfessionsFeedall from "./components/confessionFeedall.jsx"
import ConfessionPage from "./pages/confessions/confessionPage.jsx"
import MatchSwipe from "./pages/match/match.jsx";
import EmailVerification from "./pages/authorized/verify-email.jsx"
import ChatPage from "./pages/messages/ChatPage.jsx";
import SearchPeoplePage from "./pages/searchbar/searchbar.jsx"
import AboutUs from './pages/aboutUs/AboutUs.jsx'
import ComingSoonPage from './pages/settings/settings.jsx'
import RandomMatchPage from './pages/talktostranger/talktostranger.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>
  },
  {
    path:'/home-page',
    element:<HomePage/>
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/Signup',
    element:<EmailVerification/>
  },
  {
    path:'/password-forget',
    element:<ForgotPasswordPage/>
  },
  {
    path:'/password-reset',
    element:<ResetPassword/>
  },
  {
    path:'/profile-page',
    element:<ProfilePage/>
  },
  {
    path:'/confession-form',
    element:(
    <>
 < ConfessionPage/>
    </>
    )
  },
  {
path:'/all-confessions',
    element:<AllConfessionsPage/>
  },
  {
    path:'/random-match',
    element:<RandomMatchPage/>
  },
  {
    path:'*',
    element:<Disconnected/>

  },
  {
    path:'/match',
    element:<MatchSwipe/>

  },
 {
   path:"/messages/:userId",
    element:<ChatPage />
  },
 {
   path:"/messages",
    element:<ChatPage />
  },
  {
    path:"/Search",
    element:<SearchPeoplePage/>

  },
  {
    path:'/About-us',
    element:<AboutUs/>
  },
  {
    path:'/settings',
    element:<ComingSoonPage/>
  },
  {
    path:'/features',
    element:<Features/>
  },
  {
    path:'/privacy',
    element:<PrivacySecurity/>
  },
  {
    path:"/UpcomingUpdates",
    element:<UpcomingUpdates/>
  }
])

createRoot(document.getElementById('root')).render(
  
    <ConnectionWrapper>
   <RouterProvider router={router}/>
   </ConnectionWrapper>

)
