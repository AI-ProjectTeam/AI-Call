"""
설정 관리 모듈
"""

import os
from typing import List, Optional
from pydantic import validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """애플리케이션 설정"""

    # 기본 설정
    PROJECT_NAME: str = "AI-Call API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"

    # 보안 설정
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # 데이터베이스 설정
    DATABASE_URL: str

    # Redis 설정
    REDIS_URL: str = "redis://localhost:6379"

    # CORS 설정
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:19006",  # Expo 개발 서버
    ]
    ALLOWED_HOSTS: List[str] = ["*"]

    # AI 서비스 API 키
    OPENAI_API_KEY: Optional[str] = None
    GOOGLE_CLOUD_API_KEY: Optional[str] = None

    # Twilio 설정 (통화 기능)
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_PHONE_NUMBER: Optional[str] = None

    # MinIO 설정 (음성 파일 저장소)
    MINIO_ENDPOINT: str = "localhost:9000"
    MINIO_ACCESS_KEY: str = "minioadmin"
    MINIO_SECRET_KEY: str = "minioadmin123"
    MINIO_BUCKET_NAME: str = "audio-files"
    MINIO_SECURE: bool = False  # 개발환경에서는 HTTP 사용

    # 파일 업로드 설정
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "uploads/"

    # 이메일 설정 (선택사항)
    SMTP_SERVER: Optional[str] = None
    SMTP_PORT: Optional[int] = 587
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None

    @validator("ALLOWED_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v):
        """CORS origins 설정 파싱"""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        return ["*"]  # 개발 환경에서는 모든 origin 허용

    @validator("DATABASE_URL", pre=True)
    def validate_database_url(cls, v):
        """데이터베이스 URL 검증"""
        if not v:
            return "sqlite:///./ai_call.db"  # 개발용 SQLite
        return v

    @validator("SECRET_KEY", pre=True)
    def validate_secret_key(cls, v):
        """시크릿 키 검증"""
        if not v:
            return "dev-secret-key-12345678901234567890"  # 개발용 기본값
        return v

    class Config:
        env_file = ".env"
        case_sensitive = True
        # .env 파일이 없어도 작동하도록 설정
        env_file_encoding = 'utf-8'
        env_ignore_empty = True


# 설정 인스턴스 생성
settings = Settings()
