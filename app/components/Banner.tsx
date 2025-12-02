"use client";
import React, { useEffect, useState, useRef } from "react";
import { data } from "./../data/index";
import MyCanvas from "./Canvas";
import Content from "./Content";
import gsap from "gsap";

function Banner() {
  const [activeData, setActiveData] = useState(data[0]);

  const banner = useRef(null);

  const handleSwatchClick = (item) => {
    if (activeData.id !== item.id) setActiveData(item);
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: "power3.inOut",
      duration: 0.8,
    });
  }, [activeData]);

  return (
    <div className="w-screen h-screen relative " ref={banner}>
      <div className="absolute my-2 ml-6 font-bold text-2xl md:ml-28 lg:ml-[12vw] lg:my-8">
        BAG.
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row items-center ">
        <Content data={activeData} />
        <MyCanvas
          data={activeData}
          swatchData={data}
          handleSwatchClick={handleSwatchClick}
        />
      </div>
    </div>
  );
}

export default Banner;
