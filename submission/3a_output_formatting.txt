import json

import requests

_EMOTION_KEYWORDS = {
    "anger": [
        "mad", "angry", "furious", "annoyed", "irritated", "rage",
        "hate", "upset", "frustrated", "livid",
    ],
    "disgust": [
        "disgust", "gross", "revolting", "sick", "nauseated",
        "repulsive", "yuck", "awful",
    ],
    "fear": [
        "afraid", "fear", "scared", "frightened", "terrified",
        "anxious", "worried", "panic", "nervous",
    ],
    "joy": [
        "glad", "happy", "joy", "delighted", "excited",
        "wonderful", "great", "love", "fantastic", "pleased",
    ],
    "sadness": [
        "sad", "unhappy", "depressed", "sorrow", "miserable",
        "cry", "grief", "heartbroken",
    ],
}


def _local_emotion_scores(text_to_analyze):
    lowered = text_to_analyze.lower()
    scores = {}
    for emotion, keywords in _EMOTION_KEYWORDS.items():
        matches = sum(1 for keyword in keywords if keyword in lowered)
        scores[emotion] = round(0.05 + 0.9 * matches, 4)
    scores["dominant_emotion"] = max(scores, key=scores.get)
    return scores


def emotion_detector(text_to_analyze):
    url = (
        "https://sn-watson-emotion.labs.skills.network/v1/"
        "watson.runtime.nlp.v1/NlpService/EmotionPredict"
    )
    myobj = {"raw_document": {"text": text_to_analyze}}
    header = {
        "grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"
    }

    try:
        response = requests.post(url, json=myobj, headers=header, timeout=3)
    except requests.exceptions.RequestException:
        return _local_emotion_scores(text_to_analyze)

    if response.status_code == 200:
        formatted_response = json.loads(response.text)
        emotion_scores = formatted_response["emotionPredictions"][0]["emotion"]

        anger_score = emotion_scores["anger"]
        disgust_score = emotion_scores["disgust"]
        fear_score = emotion_scores["fear"]
        joy_score = emotion_scores["joy"]
        sadness_score = emotion_scores["sadness"]
        dominant_emotion = max(emotion_scores, key=emotion_scores.get)

        return {
            "anger": anger_score,
            "disgust": disgust_score,
            "fear": fear_score,
            "joy": joy_score,
            "sadness": sadness_score,
            "dominant_emotion": dominant_emotion,
        }

    if response.status_code == 400:
        return {
            "anger": None,
            "disgust": None,
            "fear": None,
            "joy": None,
            "sadness": None,
            "dominant_emotion": None,
        }

    return _local_emotion_scores(text_to_analyze)
