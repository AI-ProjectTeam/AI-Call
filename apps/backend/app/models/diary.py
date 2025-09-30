"""
일기 모델
"""
from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from .user import Base

class Diary(Base):
    """일기 모델"""
    __tablename__ = "diaries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # 일기 내용
    title = Column(String(200), nullable=True)
    content = Column(Text, nullable=False)
    
    # 생성 정보
    generated_from_call_id = Column(UUID(as_uuid=True), ForeignKey("calls.id"), nullable=True)
    is_ai_generated = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=False)  # 어르신 승인 여부
    
    # 감정 정보
    mood = Column(String(50), nullable=True)  # happy, sad, neutral 등
    
    # 시간 정보
    diary_date = Column(DateTime(timezone=True), nullable=False)  # 일기 날짜
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 관계
    user = relationship("User", back_populates="diaries")
    source_call = relationship("Call", back_populates="generated_diaries")

    def __repr__(self):
        return f"<Diary(id={self.id}, user_id={self.user_id}, date={self.diary_date})>"
