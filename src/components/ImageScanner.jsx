import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const ImageScanner = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [image_captured, setImage_captured] = useState(null); // New variable to store captured image
  const [mirrored, setMirrored] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // Track camera facing mode

  // Video constraints with dynamic facing mode
  const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: facingMode // Dynamic camera selection
  };

  // Function to switch camera
  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === "environment" ? "user" : "environment");
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setImage_captured(imageSrc); // Save to image_captured variable
    console.log('Image captured and saved to image_captured variable:', imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
    setImage_captured(null); // Clear the captured image variable
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-4">
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt="captured" 
            className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
          />
        ) : (
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            mirrored={mirrored}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.8}
            videoConstraints={videoConstraints}
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
          />
        )}
      </div>

      <div className="btn-container flex justify-center gap-4">
        {imgSrc ? (
          <button 
            onClick={retake}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Retake photo
          </button>
        ) : (
          <>
            <button 
              onClick={capture}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Capture photo
            </button>
            <button 
              onClick={switchCamera}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              {facingMode === "environment" ? "Switch to Front" : "Switch to Back"}
            </button>
          </>
        )}
      </div>

      {/* Debug info to show the image_captured variable status */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-sm font-medium text-gray-700">
          Image Captured Variable Status: 
          <span className={`ml-2 ${image_captured ? 'text-green-600' : 'text-red-600'}`}>
            {image_captured ? 'Image Stored' : 'No Image'}
          </span>
        </p>
      </div>
    </div>
  );
};



export default ImageScanner;