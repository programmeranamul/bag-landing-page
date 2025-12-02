import React from "react";
import SwatchWrapper from "./SwatchWrapper";

function MyCanvas({ data, swatchData, handleSwatchClick }) {
  return (
    <div className="order-1 lg:order-2 relative h-3/5 lg:h-full w-full lg:w-1/2">
      Canvas
      <SwatchWrapper
        activeData={data}
        swatchData={swatchData}
        handleSwatchClick={handleSwatchClick}
      />
    </div>
  );
}

export default MyCanvas;
