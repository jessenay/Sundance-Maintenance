import React, { useEffect, useState } from "react";

const images = [
  "../public/assets/Images/flatheadPicture.png",
  "../public/assets/Images/jakesPicture.png",
  "../public/assets/Images/outlawPicture.png",
  "../public/assets/Images/sundancePicture.png",
  "../public/assets/Images/redsPicture.png",
  "../public/assets/Images/stairwayPicture.png",
  "../public/assets/Images/wildwoodPicture.png",
  // Add paths to your images here
];

const Slideshow = ({ onImagesLoaded = () => {} }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      });
    };

    const loadImages = async () => {
      for (const src of images) {
        await loadImage(src);
        setLoadedImagesCount((prevCount) => prevCount + 1);
      }
    };

    loadImages().then(() => {
      onImagesLoaded();
    });
  }, [onImagesLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      <img src={images[currentImageIndex]} alt="Slideshow" style={{ width: 'auto', height: '600px' }} />
    </div>
  );
};

export default Slideshow;