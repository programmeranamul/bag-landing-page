"use client";
import { useEffect } from "react";
import gsap from "gsap";

function Content({ data }) {
  useEffect(() => {
    gsap.to(".button", {
      color: data.buttonColor.text,
      backgroundColor: data.buttonColor.background,
      ease: "power3.inOut",
      duration: 1,
    });

    gsap.to(".text", {
      color: data.headingColor,
      ease: "power3.inOut",
      duration: 0.8,
    });

    gsap.from(".text", {
      y: 200,
      ease: "power4.out",
      duration: 1,
      stagger: { amount: 0.3 },
    });
  }, []);
  return (
    <div className="order-2 lg:order-1">
      <div>
        <h1 className="text text-5xl md:text-7xl p-1 mb-1 md:mb-2">
          {data.heading}
        </h1>
        <h6 className="text text-2xl md:text-4xl p-1 mb-6 font-regular ">
          {data.subHeading}
        </h6>
        <p className="text text-xs font-medium text-left mb-8 p-1 overflow-hidden  md:text-base md:mb-12">
          {data.text}
        </p>
        <div className="relative overflow-hidden p-4 ">
          <button className=" text cursor-pointer button rounded-2xl outline-none px-8 py-2  font-medium  bg-[#4A6E6A]  md:px-10 md:py-4  ">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content;
