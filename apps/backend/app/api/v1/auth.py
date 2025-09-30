"""
인증 관련 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
async def login():
    """로그인"""
    return {"message": "Login endpoint - 구현 예정"}


@router.post("/logout")
async def logout():
    """로그아웃"""
    return {"message": "Logout endpoint - 구현 예정"}


@router.post("/register")
async def register():
    """회원가입"""
    return {"message": "Register endpoint - 구현 예정"}
