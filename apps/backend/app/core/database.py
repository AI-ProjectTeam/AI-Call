"""
데이터베이스 연결 설정
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# 데이터베이스 엔진 생성
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # 연결 상태 확인
    pool_recycle=300,    # 5분마다 연결 재생성
)

# 세션 팩토리 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base 클래스 (모델에서 import 할 때 사용)
Base = declarative_base()

def get_db():
    """
    데이터베이스 세션 의존성
    FastAPI 엔드포인트에서 Depends(get_db)로 사용
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """
    모든 테이블 생성
    앱 시작 시 한 번 실행
    """
    # 모든 모델 import (테이블 생성을 위해)
    from ..models import user, call, diary, todo
    
    Base.metadata.create_all(bind=engine)
