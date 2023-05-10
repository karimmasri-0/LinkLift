import React from "react";
import image from "../../assets/main.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SectionTwo = () => {
  const navigate = useNavigate();
  return (
    <section className=" bg-gradient-to-tr from-cblue-300 to-cblue-100 py-8 px-16 flex flex-col justify-around items-center md:flex-row gap-8">
      <img
        src={image}
        className="w-2/3 min-w-[250px] max-w-3xl md:w-1/2 lg:w-2/5 lg:py-6 lg:px-6"
        alt="Riding Together"
      />
      <div className="text-white max-w-lg">
        <div className="text-2x mb-2 lg:text-3xl">
          One less car, one more friend - join our carpooling trend!
        </div>
        <div className="text-gray-200 text-sm py-4 lg:text-base">
          Sharing a ride reduces the number of cars on the road and help the
          environment while also making new friends. Carpooling is a sustainable
          transportation option that can save you money, reduce traffic
          congestion, and lower your carbon footprint.
        </div>
        <button
          to="/about"
          onClick={() => {
            navigate("about");
          }}
          className="px-4 py-2 bg-white rounded text-black flex gap-1 items-center my-4 hover:text-cblue-200 shadow-md hover:shadow-lg shadow-cblue-400/20 hover:shadow-cblue-400/40 focus:opacity-[0.85] focus:shadow-none transition-all"
        >
          Explore more
          <AiOutlineArrowRight />
        </button>
      </div>
    </section>
  );
};

export default SectionTwo;
