import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../containers/Home";
import About from "../containers/About";
import Contact from "../containers/Contact";
import Search from "../containers/Search";
import NotFound from "../containers/NotFound";
import Login from "../containers/Login";
import Register from "../containers/Register";
import PublishRide from "../containers/PublishRide";
import Profile from "../containers/Profile";

function MyRoutes() {
  const searchRef = useRef(null);
  const scrollToSearch = () => {
    searchRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  const router = createBrowserRouter([
    { path: "/", element: <Home ref={searchRef} /> },
    { path: "auth/login", element: <Login /> },
    { path: "auth/register", element: <Register /> },
    { path: "about-us", element: <About /> },
    { path: "how-it-works", element: <About /> },
    { path: "help-center", element: <About /> },
    { path: "contact", element: <Contact /> },
    { path: "search", element: <Search /> },
    { path: "publish-ride", element: <PublishRide /> },
    { path: "profile", element: <Profile /> },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default MyRoutes;
