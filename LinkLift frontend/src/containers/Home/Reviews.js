import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useMediaQuery } from "react-responsive";
import { Grid } from "@splidejs/splide-extension-grid";
import review from "../../assets/review-1.png";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState("");
  const getReviews = async () => {
    try {
      const reviews = await axios.get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/top-reviews`
      );
      if (!reviews.data.error) setReviews(reviews.data.data);
    } catch (error) {
      console.log("reviews catch error", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);
  const md = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="py-8 px-4 flex flex-col items-center bg-cblue-200 md:flex-row justify-around">
      <img
        src={review}
        className="w-2/3 min-w-[250px] max-w-3xl mb-8 order-first md:order-last md:w-1/2 lg:w-2/5 md:mb-0"
        alt="Review"
      />
      <div className="w-fit">
        {reviews ? (
          <Splide
            options={{
              width: 400,
              rewind: true,
              arrows: false,
              pagination: false,
              type: "slide",
              autoplay: true,
              perPage: 1,
              // perPage: lg ? 3 : md ? 2 : sm ? 1 : "true",
              perMove: 1,
              speed: 200,
              pauseOnHover: true,
              reducedMotion: {
                autoplay: true,
                speed: 600,
              },
              grid: {
                rows: md ? 2 : 1,
                cols: 1,
                gap: { row: 12 },
              },
            }}
            extensions={{ Grid }}
          >
            {reviews.map((review) => (
              <SplideSlide key={review.name} className=" flex justify-center">
                <div className="h-32 pl-6 py-4 border-red-200 w-72 bg-gray-100 shadows rounded-md border-2">
                  <div className="flex flex-row w-full">
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
          <div className="border border-red-200 shadow bg-white rounded-md p-4 mx-auto w-72 ">
            <div className="animate-pulse flex space-x-4">
              <div className="w-10 h-10 bg-gray-700/50 rounded-full"></div>
              <div className="flex-1 space-y-3 py-1">
                <div className="h-2 bg-gray-700/50 rounded"></div>
                <div className=" flex justify-center gap-1 text-gray-700/50">
                  <AiFillStar size={20} />
                  <AiFillStar size={20} />
                  <AiFillStar size={20} />
                  <AiFillStar size={20} />
                  <AiFillStar size={20} />
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-700/50 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-700/50 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
