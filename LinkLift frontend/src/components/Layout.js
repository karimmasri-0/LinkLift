import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[100vh] pt-20 font-lato">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
