"""
할일 관리 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_todos():
    """할일 목록 조회"""
    return {"message": "Get todos endpoint - 구현 예정"}


@router.post("/")
async def create_todo():
    """할일 생성"""
    return {"message": "Create todo endpoint - 구현 예정"}


@router.put("/{todo_id}/complete")
async def complete_todo(todo_id: str):
    """할일 완료"""
    return {"message": f"Complete todo {todo_id} endpoint - 구현 예정"}
