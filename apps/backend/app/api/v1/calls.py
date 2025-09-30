"""
통화 관리 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_calls():
    """통화 기록 목록 조회"""
    return {"message": "Get calls endpoint - 구현 예정"}


@router.post("/initiate")
async def initiate_call():
    """통화 시작"""
    return {"message": "Initiate call endpoint - 구현 예정"}


@router.post("/{call_id}/end")
async def end_call(call_id: str):
    """통화 종료"""
    return {"message": f"End call {call_id} endpoint - 구현 예정"}
