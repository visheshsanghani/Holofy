import React, { useState, useEffect, useRef } from "react";
import "./Draggable.css";
import video from "../../Assests/videos/video.mp4";

const Draggable = () => {
  const [dragging, setDragging] = useState(false);
  const [startQuadrant, setStartQuadrant] = useState(3);
  const [quadrant, setQuadrant] = useState(3);
  // Toogler state needed for play/pause as when change in quadrant
  const [playToogler, setPlayToogler] = useState(false);
  const [draggingPointer, setDraggingPointer] = useState({ left: 0, top: 0 });
  const [videoPosition, setVideoPosition] = useState({ left: 0, bottom: 0 });

  // Video Ref to control play/pause in video
  let videoRef = useRef(null);

  // useEffect to be called everytime a change in Quadrant
  // Pause the video
  useEffect(() => {
    videoRef.current.pause();
    setPlayToogler(false);
  }, [quadrant]);

  const TooglePlay = () => {
    if (startQuadrant === quadrant)
      if (!playToogler) {
        videoRef.current.play();
        setPlayToogler((playToogler) => !playToogler);
      } else {
        videoRef.current.pause();
        setPlayToogler((playToogler) => !playToogler);
      }
  };

  // Dweb Functionality - triggered as soon the video is dragged
  const handleDragStart = (e) => {
    setStartQuadrant(quadrant);
    setDragging(true);
    setDraggingPointer({
      left: e.clientX - e.currentTarget.getBoundingClientRect().left,
      top: e.clientY - e.currentTarget.getBoundingClientRect().top,
    });
  };

  // Dweb Functionality - triggered continously when the video is in motion
  const handleDragging = (e) => {
    if (dragging) {
      setVideoPosition({
        left: e.clientX - draggingPointer.left,
        top: e.clientY - draggingPointer.top,
      });
    }
  };

  // Dweb Functionality - triggered when the video motion comes to rest
  const handleDragEnd = (e) => {
    const xAxisPointer = e.clientX;
    const yAxisPointer = e.clientY;
    const leftWidth = window.innerWidth / 2;
    const topHalf = window.innerHeight / 2;
    // If the video is dragged to 1st Quadrant
    if (xAxisPointer < leftWidth && yAxisPointer < topHalf) {
      setVideoPosition({
        left: 0,
        top: 0,
      });
      setQuadrant(1);
    }
    // If the video is dragged to 2nd Quadrant
    else if (xAxisPointer > leftWidth && yAxisPointer < topHalf) {
      setVideoPosition({
        right: 0,
        top: 0,
      });
      setQuadrant(2);
    }
    // If the video is dragged to 3rd Quadrant
    else if (xAxisPointer < leftWidth && yAxisPointer > topHalf) {
      setVideoPosition({
        left: 0,
        bottom: 0,
      });
      setQuadrant(3);
    }
    // If the video is dragged to 4th Quadrant
    else if (xAxisPointer > leftWidth && yAxisPointer > topHalf) {
      setVideoPosition({
        right: 0,
        bottom: 0,
      });
      setQuadrant(4);
    }
    setDragging(false);
  };

  // Mweb Functionality - triggered as soon the video is dragged
  const handleTouchStart = (e) => {
    setStartQuadrant(quadrant);
    setDragging(true);
    setDraggingPointer({
      left: e.touches[0].clientX - e.target.getBoundingClientRect().left,
      top: e.touches[0].clientY - e.target.getBoundingClientRect().top,
    });
  };

  // Mweb Functionality - triggered continously when the video is in motion
  const handleTouchDrag = (e) => {
    if (dragging) {
      setVideoPosition({
        left: e.touches[0].clientX - draggingPointer.left,
        top: e.touches[0].clientY - draggingPointer.top,
      });
    }
  };

  // Mweb Functionality - triggered when the video motion comes to rest
  const handleTouchEnd = (e) => {
    const xAxisPointer = e.changedTouches[0].clientX;
    const yAxisPointer = e.changedTouches[0].clientY;
    const leftWidth = window.innerWidth / 2;
    const topHalf = window.innerHeight / 2;
    // If the video is dragged to 1st Quadrant
    if (xAxisPointer < leftWidth && yAxisPointer < topHalf) {
      setVideoPosition({
        left: 0,
        top: 0,
      });
      setQuadrant(1);
    }
    // If the video is dragged to 2nd Quadrant
    else if (xAxisPointer > leftWidth && yAxisPointer < topHalf) {
      setVideoPosition({
        right: 0,
        top: 0,
      });
      setQuadrant(2);
    }
    // If the video is dragged to 3rd Quadrant
    else if (xAxisPointer < leftWidth && yAxisPointer > topHalf) {
      setVideoPosition({
        left: 0,
        bottom: 0,
      });
      setQuadrant(3);
    }
    // If the video is dragged to 4th Quadrant
    else if (xAxisPointer > leftWidth && yAxisPointer > topHalf) {
      setVideoPosition({
        right: 0,
        bottom: 0,
      });
      setQuadrant(4);
    }
    setDragging(false);
  };

  return (
    <div>
      <div className="parentDiv">
        <video
          ref={videoRef}
          src={video}
          style={videoPosition}
          onClick={TooglePlay}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragging}
          onMouseUp={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchDrag}
          onTouchEnd={handleTouchEnd}
        />
        <div className="childDiv">
          <p>Quadrant 1</p>
        </div>
        <div className="childDiv">
          <p>Quadrant 2</p>
        </div>
        <div className="childDiv">
          <p>Quadrant 3</p>
        </div>
        <div className="childDiv">
          <p>Quadrant 4</p>
        </div>
      </div>
    </div>
  );
};

export default Draggable;
