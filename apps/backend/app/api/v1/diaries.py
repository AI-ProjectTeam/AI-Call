"""
일기 관리 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_diaries():
    """일기 목록 조회"""
    return {"message": "Get diaries endpoint - 구현 예정"}


@router.get("/{diary_id}")
async def get_diary(diary_id: str):
    """일기 상세 조회"""
    return {"message": f"Get diary {diary_id} endpoint - 구현 예정"}


@router.post("/")
async def create_diary():
    """일기 생성"""
    return {"message": "Create diary endpoint - 구현 예정"}
