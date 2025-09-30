"""
사용자 관리 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_users():
    """사용자 목록 조회"""
    return {"message": "Get users endpoint - 구현 예정"}


@router.get("/{user_id}")
async def get_user(user_id: str):
    """사용자 상세 조회"""
    return {"message": f"Get user {user_id} endpoint - 구현 예정"}


@router.post("/")
async def create_user():
    """사용자 생성"""
    return {"message": "Create user endpoint - 구현 예정"}
