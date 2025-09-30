"""
할일 모델
"""
from sqlalchemy import Column, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from .user import Base

class TodoPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class Todo(Base):
    """할일 모델"""
    __tablename__ = "todos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # 할일 내용
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(20), default=TodoPriority.MEDIUM)
    
    # 상태 정보
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # 생성 정보
    extracted_from_call_id = Column(UUID(as_uuid=True), ForeignKey("calls.id"), nullable=True)
    is_ai_extracted = Column(Boolean, default=False)
    
    # 시간 정보
    due_date = Column(DateTime(timezone=True), nullable=True)
    reminder_time = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 관계
    user = relationship("User", back_populates="todos")
    source_call = relationship("Call", back_populates="extracted_todos")

    def __repr__(self):
        return f"<Todo(id={self.id}, title={self.title}, completed={self.is_completed})>"
