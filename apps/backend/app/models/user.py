"""
사용자 모델
"""
from sqlalchemy import Column, String, DateTime, Boolean, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

Base = declarative_base()

class UserType(str, enum.Enum):
    ELDERLY = "elderly"
    GUARDIAN = "guardian"

class User(Base):
    """사용자 모델"""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=True)
    password_hash = Column(String(128), nullable=False)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, nullable=True)
    user_type = Column(SQLEnum(UserType), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # 관계
    calls = relationship("Call", back_populates="user")
    diaries = relationship("Diary", back_populates="user")
    todos = relationship("Todo", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, type={self.user_type})>"
