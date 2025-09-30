"""
의존성 주입 함수들
"""
from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from .database import get_db
from .security import verify_token
from ..models.user import User

# HTTP Bearer 토큰 스키마
security = HTTPBearer()

def get_current_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    """
    현재 로그인한 사용자 조회
    """
    token = credentials.credentials
    user_id = verify_token(token)
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="토큰이 유효하지 않습니다",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="사용자를 찾을 수 없습니다",
        )
    
    return user

def get_current_elderly_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    현재 로그인한 어르신 사용자 조회
    """
    if current_user.user_type != "elderly":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="어르신 계정만 접근 가능합니다",
        )
    return current_user

def get_current_guardian_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    현재 로그인한 보호자 사용자 조회
    """
    if current_user.user_type != "guardian":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="보호자 계정만 접근 가능합니다",
        )
    return current_user
