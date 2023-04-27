import React, { forwardRef } from "react";
import Cards from "./Cards";
import SectionTwo from "./SectionTwo";
import SectionOne from "./SectionOne";
import Search from "./Search";
import Reviews from "./Reviews";
import SectionThree from "./SectionThree";
import Layout from "../../components/Layout";

const Home = forwardRef((props, ref) => {
  return (
    <Layout>
      <SectionOne />
      <Search ref={ref} />
      <SectionTwo />
      <Cards />
      <Reviews />
      <SectionThree />
    </Layout>
  );
});
export default Home;
