import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const flyingFrames = [
  '/FlyingBird.png',
  '/midFlyingBird.png',
  '/idleBird.png',
];

const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

function App() {
  const [showFlyingEagle, setShowFlyingEagle] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [flightScore, setFlightScore] = useState(0); // Added for gamification
  const animationRef = useRef(null);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    preloadImages(flyingFrames);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowFlyingEagle(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showFlyingEagle) {
      const animate = (currentTime) => {
        if (!lastFrameTime.current) lastFrameTime.current = currentTime;
        const deltaTime = currentTime - lastFrameTime.current;

        if (deltaTime >= 300) {
          setCurrentFrame((prevFrame) => (prevFrame + 1) % flyingFrames.length);
          lastFrameTime.current = currentTime;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [showFlyingEagle]);

  const handleEagleClick = () => {
    setFlightScore(flightScore + 1);
  };

  return (
    <div className="App">
      <h1 className="title">Eagle Zone 🦅</h1>
      {!showFlyingEagle ? (
        <img src="/idleBird.png" alt="Idle Eagle" className="eagle-idle" />
      ) : (
        <img
          src={flyingFrames[currentFrame]}
          alt="Flying Eagle"
          className="eagle-flying"
          onClick={handleEagleClick}
          style={{ cursor: 'pointer' }}
        />
      )}
      {showFlyingEagle && (
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#2c3e50' }}>
          Flight Score: {flightScore}
        </p>
      )}
    </div>
  );
}

export default App;