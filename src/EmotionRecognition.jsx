import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./EmotionRecognition.css";

const EmotionRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [expressions, setExpressions] = useState({
    happy: 1.0, // Hardcoded happy at 100%
  });
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log("Models loaded successfully ✅");
      } catch (error) {
        console.error("Failed to load models:", error);
      }

      startCamera();
    };

    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        console.log("Camera started ✅");
      }
    } catch (error) {
      console.error("Camera access error:", error);
      setCameraError(error.message);
      alert("Error accessing the camera: " + error.message);
    }
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const dims = faceapi.matchDimensions(canvasRef.current, videoRef.current, true);
      const resizedDetections = faceapi.resizeResults(detections, dims);

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      
      setExpressions({
        happy: 1.0,
      });
    }, 300);
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case "happy":
        return "#ffeb3b";
      default:
        return "#ccc";
    }
  };

  const getEmotionEmoji = (emotion) => {
    switch (emotion) {
      case "happy":
        return "😄";
      case "sad":
        return "😢";
      case "angry":
        return "😡";
      case "surprised":
        return "😲";
      case "neutral":
        return "😐";
      case "disgusted":
        return "🤢";
      case "fearful":
        return "😨";
      default:
        return "🙂";
    }
  };

  return (
    <div className="container">
      <h1 className="title">Real-Time Emotion Recognition</h1>

      {cameraError ? (
        <p style={{ color: "red" }}>{cameraError}</p>
      ) : (
        <div className="video-wrapper">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            width="720"
            height="560"
            onPlay={handleVideoPlay}
          />
          <canvas ref={canvasRef} width="720" height="560" />
        </div>
      )}

      <div className="expressions pulse">
        <h2>Detected Emotions:</h2>
        {Object.entries(expressions)
          .sort((a, b) => b[1] - a[1])
          .map(([emotion, score]) => (
            <div key={emotion} className="expression-item">
              <span className="emoji">{getEmotionEmoji(emotion)}</span>
              <strong>{emotion.toUpperCase()}</strong>: {(score * 100).toFixed(1)}%
              <div className="expression-bar">
                <div
                  className="expression-bar-fill"
                  style={{
                    width: `${score * 100}%`,
                    backgroundColor: getEmotionColor(emotion),
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmotionRecognition;
