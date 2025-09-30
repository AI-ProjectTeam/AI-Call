# AI-Call Backend

FastAPI 기반의 AI-Call 백엔드 서비스입니다.

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
poetry install
```

### 2. 환경 변수 설정
```bash
cp env.example .env
# .env 파일을 수정하여 실제 값 입력
```

### 3. 데이터베이스 마이그레이션
```bash
poetry run alembic upgrade head
```

### 4. 서버 실행
```bash
poetry run uvicorn app.main:app --reload
```

## 📋 API 문서

서버 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🧪 테스트

```bash
# 전체 테스트 실행
poetry run pytest

# 커버리지와 함께 테스트
poetry run pytest --cov=app

# 특정 테스트 파일 실행
poetry run pytest tests/test_api/test_diaries.py
```

## 🔧 개발 도구

### 코드 품질 검사
```bash
# 린트 검사
poetry run flake8 .

# 코드 포맷팅
poetry run black .

# 타입 검사
poetry run mypy .
```

### 데이터베이스 마이그레이션
```bash
# 새 마이그레이션 생성
poetry run alembic revision --autogenerate -m "마이그레이션 설명"

# 마이그레이션 적용
poetry run alembic upgrade head

# 마이그레이션 롤백
poetry run alembic downgrade -1
```
