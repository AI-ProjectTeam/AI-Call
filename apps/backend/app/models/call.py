"""
통화 모델
"""
from sqlalchemy import Column, String, DateTime, Integer, Float, Text, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from .user import Base

class CallStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class Call(Base):
    """통화 모델"""
    __tablename__ = "calls"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # 통화 정보
    status = Column(String(20), default=CallStatus.SCHEDULED)
    duration_seconds = Column(Integer, nullable=True)  # 통화 시간(초)
    
    # 음성 파일 정보
    audio_file_path = Column(String(500), nullable=True)  # MinIO 파일 경로
    audio_file_size = Column(Integer, nullable=True)  # 파일 크기(bytes)
    
    # AI 분석 결과
    transcript = Column(Text, nullable=True)  # STT 결과
    emotion_score = Column(Float, nullable=True)  # 감정 점수 (-1~1)
    summary = Column(Text, nullable=True)  # 통화 요약
    
    # 시간 정보
    scheduled_at = Column(DateTime(timezone=True), nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=True)
    ended_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 관계
    user = relationship("User", back_populates="calls")
    generated_diaries = relationship("Diary", back_populates="source_call")
    extracted_todos = relationship("Todo", back_populates="source_call")

    def __repr__(self):
        return f"<Call(id={self.id}, user_id={self.user_id}, status={self.status})>"
