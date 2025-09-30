"""
AI 서비스 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.post("/stt")
async def speech_to_text():
    """음성을 텍스트로 변환"""
    return {"message": "STT endpoint - 구현 예정"}


@router.post("/tts")
async def text_to_speech():
    """텍스트를 음성으로 변환"""
    return {"message": "TTS endpoint - 구현 예정"}


@router.post("/chat")
async def ai_chat():
    """AI 채팅"""
    return {"message": "AI chat endpoint - 구현 예정"}


@router.post("/emotion")
async def analyze_emotion():
    """감정 분석"""
    return {"message": "Emotion analysis endpoint - 구현 예정"}
