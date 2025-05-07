import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import { useThemeStore } from "./store/useThemeStore";
import FriendPage from "./pages/FriendPage";

// Pages
const HomePage = React.lazy(() => import("./pages/HomePage"))
const LoginPage = React.lazy(() => import("./pages/LoginPage"))
const SignupPage = React.lazy(() => import("./pages/SignupPage"))
const ChatPage = React.lazy(() => import("./pages/ChatPage"))
const CallPage = React.lazy(() => import("./pages/CallPage"))
const NotificationPage = React.lazy(() => import("./pages/NotificationPage"))
const OnboardingPage = React.lazy(() => import("./pages/OnboardingPage"))

const PageArr = [
  {
    path: "/",
    element: <Layout showSidebar><HomePage /></Layout>
  },
  {
    path: "/login",
    element: <Layout><LoginPage /></Layout>
  },
  {
    path: "/signup",
    element: <Layout><SignupPage /></Layout>
  },
  {
    path: "/notifications",
    element: <Layout showSidebar><NotificationPage /></Layout>
  },
  {
    path: "/chat/:id",
    element: <Layout showSidebar><ChatPage /></Layout>
  },
  {
    path: "/call/:id",
    element: <Layout showNavbar={false}><CallPage /></Layout>
  },
  {
    path: "/friends",
    element: <Layout showSidebar><FriendPage /></Layout>
  },
  {
    path: "/onboarding",
    element: <Layout><OnboardingPage /></Layout>
  }
]

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen" data-theme={theme || "coffee"}>
      <Routes>
        {
          PageArr.map((page, index) => (
            <Route key={index} path={page.path} element={page.element} />
          ))
        }
        {/* <Route path={"*"} element={<Layout showSidebar><HomePage /></Layout>} /> */}
      </Routes>
      <Toaster />
    </div>
  )
}

export default App