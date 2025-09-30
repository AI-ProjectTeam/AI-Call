"""
API v1 라우터
"""

from fastapi import APIRouter

from . import auth, users, diaries, calls, todos, notifications, ai

# API v1 라우터 생성
api_router = APIRouter()

# 각 모듈의 라우터 등록
api_router.include_router(auth.router, prefix="/auth", tags=["인증"])
api_router.include_router(users.router, prefix="/users", tags=["사용자"])
api_router.include_router(diaries.router, prefix="/diaries", tags=["일기"])
api_router.include_router(calls.router, prefix="/calls", tags=["통화"])
api_router.include_router(todos.router, prefix="/todos", tags=["할일"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["알림"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI 서비스"])
