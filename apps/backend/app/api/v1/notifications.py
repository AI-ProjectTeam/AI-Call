"""
알림 관리 API 엔드포인트
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_notifications():
    """알림 목록 조회"""
    return {"message": "Get notifications endpoint - 구현 예정"}


@router.post("/")
async def send_notification():
    """알림 전송"""
    return {"message": "Send notification endpoint - 구현 예정"}


@router.put("/{notification_id}/read")
async def mark_notification_read(notification_id: str):
    """알림 읽음 처리"""
    return {"message": f"Mark notification {notification_id} read - 구현 예정"}
