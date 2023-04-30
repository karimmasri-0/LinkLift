import React, { forwardRef } from "react";
import Cards from "./Cards";
import SectionTwo from "./SectionTwo";
import SectionOne from "./SectionOne";
import Search from "./Search";
import Reviews from "./Reviews";
import SectionThree from "./SectionThree";

const Home = forwardRef((props, ref) => {
  return (
    <>
      <SectionOne />
      <Search ref={ref} />
      <SectionTwo />
      <Cards />
      <Reviews />
      <SectionThree />
    </>
  );
});
export default Home;
