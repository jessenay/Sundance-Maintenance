import React from "react";

// Choose one image to display
const image = "../assets/Images/sundancePicture.png";

const Slideshow = () => {
  return (
    <div className="slideshow">
      <img src={image} alt="Sundance Lift Maintenance" className="slideshow-image" />
    </div>
  );
};

export default Slideshow;
