🎥 Real-Time Emotion Recognition

A dynamic web app that detects and displays a user's emotions live using a webcam, built with React.js and face-api.js.

🚀 Demo

Neutral Detection
![alt text](image.png)

Happy Detection

![alt text](Introduction-1.png)



✨ Features

🎯 Real-time webcam-based emotion recognition

😀 Detects emotions: Neutral, Happy, Sad, Angry, Surprised, Disgusted, Fearful

🎨 Visual overlays for face and emotion data

📊 Live emotion percentage bars and emojis

🛠 Tech Stack

⚛️ React.js

🧠 face-api.js

🖥️ HTML5 Video & Canvas APIs

✨ Modern JavaScript (ES6+)

🔍 How It Works

Model Loading:

Loads pre-trained face detection and expression models from /models.

Camera Access:

Requests webcam permission and streams video input.

Face Detection & Emotion Recognition:

Continuously detects faces and emotions every 300ms.

UI Visualization:

Draws bounding boxes and expression data; updates emotion bars and emojis in real-time.

🛠️ Setup Instructions

Clone the Repository

git clone https://github.com/yourusername/real-time-emotion-recognition.git

Navigate to the Project Directory

cd real-time-emotion-recognition

Install Dependencies

npm install

Add Pre-trained Models

Place the face-api.js models inside /public/models.

Run the Application

npm start

Open in Browser

Visit http://localhost:3000

📁 Folder Structure

/public
  /models
/src
  /components
    EmotionRecognition.jsx
  EmotionRecognition.css
App.js

🙌 Acknowledgements

Big thanks to face-api.js for the amazing face and emotion detection library.

📜 License

This project is licensed under the MIT License.

Crafted with ❤️ using React and Face API — because emotions matter.
