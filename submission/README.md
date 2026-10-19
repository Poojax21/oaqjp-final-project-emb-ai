# Final Project

## Emotion Detector

This is the final project for the IBM AI Developer professional certificate.
The application is an **Emotion Detector** built with the Watson NLP library
and deployed as a web application using Flask.

## Project Name

**oaqjp-final-project-emb-ai**

## Description

The Emotion Detector takes a piece of text as input and returns the emotion
scores (anger, disgust, fear, joy, and sadness) together with the dominant
emotion detected by the Watson NLP emotion model.

## Project Structure

```
final_project/
├── EmotionDetection/
│   ├── __init__.py
│   └── emotion_detection.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
├── server.py
├── test_emotion_detection.py
├── emotion_detection.py
└── README.md
```

## How to Run

1. Install the required dependencies:

   ```bash
   pip install flask requests pylint
   ```

2. Run the web application:

   ```bash
   python3 server.py
   ```

3. Open a browser and go to `http://localhost:5000`.

## Testing

Run the unit tests with:

```bash
python3 test_emotion_detection.py
```

## Static Code Analysis

Run pylint on the server:

```bash
pylint server.py
```
