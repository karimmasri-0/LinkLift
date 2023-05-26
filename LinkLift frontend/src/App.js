import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import Home from "./containers/Home";
import About from "./containers/About";
import Contact from "./containers/Contact";
import Header from "./components/Header";
// import Search from "./containers/Search";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Register from "./containers/Register";
import PublishRide from "./containers/PublishRide";
import Footer from "./components/Footer";
import Profile from "./containers/Profile";
import { Toaster } from "react-hot-toast";
import Logout from "./containers/Logout";
import Ride from "./containers/Ride";
import Rides from "./containers/Rides";
import MyRides from "./containers/MyRides";
import { AuthContext } from "./providers/AuthProvider";
import { useEffect } from "react";

function App() {
  const searchRef = useRef(null);
  const scrollToSearch = () => {
    searchRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  const { position } = useContext(AuthContext);
  if (position === "Driver") {
    var r = (
      <Routes>
        <Route path="/" element={<Home ref={searchRef} />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="about-us" element={<About />} />
        <Route path="how-it-works" element={<About />} />
        <Route path="help-center" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="search" element={<Search />} /> */}
        <Route path="publish-ride" element={<PublishRide />} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<Logout />} />
        <Route path="rides/:rideId" element={<Ride />} />
        <Route path="rides" element={<Rides />} />
        <Route path="my-rides" element={<MyRides />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else if (position === "Passenger") {
    var r = (
      <Routes>
        <Route path="/" element={<Home ref={searchRef} />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="about-us" element={<About />} />
        <Route path="how-it-works" element={<About />} />
        <Route path="help-center" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="search" element={<Search />} /> */}
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<Logout />} />
        <Route path="rides" element={<Rides />} />
        <Route path="rides/:rideId" element={<Ride />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    var r = (
      <Routes>
        <Route path="/" element={<Home ref={searchRef} />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="about-us" element={<About />} />
        <Route path="how-it-works" element={<About />} />
        <Route path="help-center" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="search" element={<Search />} /> */}
        <Route path="logout" element={<Logout />} />
        <Route path="rides" element={<Rides />} />
        <Route path="rides/:rideId" element={<Ride />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <div>
      <header>
        <Header scrollToSearch={scrollToSearch} />
      </header>
      <main className="min-h-[100vh] pt-20 font-lato">{r}</main>
      <footer>
        <Footer />
      </footer>
      <Toaster limit={1} />
    </div>
  );
}

export default App;
