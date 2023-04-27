import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useMediaQuery } from "react-responsive";
import { Grid } from "@splidejs/splide-extension-grid";
import review from "../../assets/review.png";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState("");
  const getReviews = async () => {
    try {
      const reviews = await axios.get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/`
      );
      if (!reviews.data.error) setReviews(reviews.data.data);
      console.log("error ", reviews.data.error);
      console.log("data ", reviews.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);
  const sm = useMediaQuery({ query: "(min-width: 640px)" });
  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const lg = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="py-8 px-4 flex flex-col items-center bg-cblue-100 md:flex-row justify-around">
      <img
        src={review}
        className="w-2/3 mb-8 order-first md:order-last md:w-1/2 lg:w-2/5 md:mb-0"
        alt="Review"
      />
      {reviews ? (
        <Splide
          className="lg:mx-44"
          options={{
            arrows: false,
            pagination: false,
            type: "loop",
            type: "slide",
            autoplay: true,
            perPage: 1,
            // perPage: lg ? 3 : md ? 2 : sm ? 1 : "true",
            perMove: 1,
            speed: 200,
            reducedMotion: {
              autoplay: true,
              speed: 400,
            },
            grid: {
              rows: 3,
              cols: 1,
              gap: {
                row: -10,
              },
            },
          }}
          extensions={{ Grid }}
        >
          {reviews.map((review) => (
            <SplideSlide key={review.name}>
              <div className="h-32 pl-6 py-4 m-8 border-red-200 bg-gray-100 shadow-md rounded-3xl border-2">
                <div className="flex flex-row ">
                  <img
                    src={review.image}
                    alt="Reviewer"
                    className="rounded-full w-12 h-12"
                  />
                  <div className="px-4 w-full">
                    <div className="flex justify-between items-center">
                      <div className="w-full">{review.name}</div>
                      <div className="text-gray-400 italic text-xs">
                        {review.isDriver ? "Driver" : "Passenger"}
                      </div>
                    </div>
                    <div className="py-1 flex justify-center gap-1">
                      <AiFillStar size={20} className="text-red-200" />
                      <AiFillStar size={20} className="text-red-200" />
                      <AiFillStar size={20} className="text-red-200" />
                      <AiFillStar size={20} className="text-red-200" />
                      <AiFillStar size={20} className="text-red-200" />
                    </div>
                  </div>
                </div>
                <div className="mr-6 pl-2 text-gray-800 line-clamp-2">
                  {review.comment}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="h-32 pl-6 py-4  border-red-200 bg-gray-100 shadow-md rounded-3xl border-2 order-last md:order-first">
            <div className="flex flex-row ">
              <div className="rounded-full bg-gray-300 w-12 h-12" />
              <div className="px-4 w-full">
                <div className="flex justify-between items-center">
                  <div className="w-24 rounded-full bg-gray-300"> &nbsp;</div>
                  <div className=" bg-gray-300 rounded-full w-10">&nbsp;</div>
                </div>
                <div className="py-1 flex justify-center gap-1">
                  <AiFillStar size={20} className="text-gray-300" />
                  <AiFillStar size={20} className="text-gray-300" />
                  <AiFillStar size={20} className="text-gray-300" />
                  <AiFillStar size={20} className="text-gray-300" />
                  <AiFillStar size={20} className="text-gray-300" />
                </div>
              </div>
            </div>
            <div className="mr-6 pl-2 mt-3 w-48 bg-gray-300 rounded-full">
              &nbsp;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
