import React, { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const searchRef = useRef(null);
  const scrollToSearch = () => {
    searchRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  return (
    <>
      <Header />
      <main className="min-h-[100vh] pt-20 font-lato">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
