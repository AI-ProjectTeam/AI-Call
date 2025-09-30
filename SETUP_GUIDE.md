# 🤖 AI-Call 개발 환경 설정 가이드

## 📋 시작하기 전 준비사항

### 1. 필수 프로그램 설치
다음 프로그램들이 설치되어 있어야 합니다:

- **Node.js 18+** ([다운로드](https://nodejs.org/))
- **Python 3.11+** ([다운로드](https://www.python.org/))
- **Poetry** ([설치 가이드](https://python-poetry.org/docs/#installation))
- **Docker Desktop** ([다운로드](https://www.docker.com/products/docker-desktop/))

### 2. 설치 확인 명령어
```bash
node --version    # v18.0.0 이상
python --version  # Python 3.11.0 이상
poetry --version  # Poetry 1.0.0 이상
docker --version  # Docker 20.0.0 이상
```

## 🔧 자동 설정 (권장)

### 1단계: 자동 설정 스크립트 실행
```bash
# 프로젝트 루트에서 실행
node infrastructure/scripts/setup-dev.js
```

이 스크립트가 자동으로 수행하는 작업:
- ✅ 모든 의존성 설치 (npm, poetry)
- ✅ 환경 변수 파일 생성 (.env)
- ✅ Docker 서비스 시작 (PostgreSQL, Redis, MinIO)
- ✅ 공통 패키지 빌드

### 2단계: 개발 서버 시작
```bash
# 백엔드 + 모바일 동시 실행
npm run dev

# 또는 개별 실행
npm run dev:backend  # 백엔드만
npm run dev:mobile   # 모바일만
```

## 🛠️ 수동 설정 (고급 사용자)

### 1. 의존성 설치
```bash
# 루트 의존성
npm install

# 백엔드 의존성
cd apps/backend
poetry install

# 모바일 의존성
cd ../mobile
npm install

# 공통 패키지 빌드
cd ../../packages/shared-types
npm run build
cd ../constants
npm run build
```

### 2. 환경 변수 설정

#### Backend (.env)
```bash
# apps/backend/.env 파일 생성
ENVIRONMENT=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_call_db
SECRET_KEY=dev-secret-key-12345678901234567890123456789012
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
```

#### Mobile (.env)
```bash
# apps/mobile/.env 파일 생성
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
EXPO_PUBLIC_ENVIRONMENT=development
```

### 3. Docker 서비스 시작
```bash
# 데이터베이스 서비스 시작
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# 서비스 상태 확인
docker-compose -f infrastructure/docker/docker-compose.yml ps
```

## 🔍 개발 서버 접속 정보

| 서비스 | URL | 로그인 정보 |
|--------|-----|-------------|
| 백엔드 API | http://localhost:8000 | - |
| API 문서 (Swagger) | http://localhost:8000/docs | - |
| 모바일 앱 | http://localhost:8081 | elderly1/password 또는 guardian1/password |
| PostgreSQL | localhost:5432 | postgres/postgres |
| pgAdmin | http://localhost:5050 | admin@ai-call.com/admin |
| MinIO Console | http://localhost:9001 | minioadmin/minioadmin123 |
| Redis | localhost:6379 | - |

## 📱 모바일 앱 접속 방법

### 1. 웹 브라우저에서 접속
- URL: http://localhost:8081
- 테스트 계정: elderly1/password (어르신용), guardian1/password (보호자용)

### 2. 스마트폰에서 접속 (Expo Go)
1. 앱스토어에서 "Expo Go" 설치
2. QR 코드 스캔 (터미널에 표시됨)
3. 앱이 자동으로 로드됨

### 3. iOS 시뮬레이터 (Mac만 가능)
```bash
cd apps/mobile
npm run ios
```

### 4. Android 에뮬레이터
```bash
cd apps/mobile
npm run android
```

## 🗄️ 데이터베이스 관리

### pgAdmin 접속하여 데이터베이스 확인
1. http://localhost:5050 접속
2. 로그인: admin@ai-call.com / admin
3. 서버 추가:
   - Host: postgres (Docker 내부에서는 서비스명 사용)
   - Port: 5432
   - Username: postgres
   - Password: postgres

### 데이터베이스 테이블 확인
```sql
-- 생성된 테이블 확인
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- 사용자 테이블 확인
SELECT * FROM users;
```

## 📂 프로젝트 구조 이해

```
ai-call/
├── apps/
│   ├── backend/           # FastAPI 백엔드
│   │   ├── app/
│   │   │   ├── api/v1/    # API 엔드포인트
│   │   │   ├── models/    # 데이터베이스 모델
│   │   │   ├── services/  # 비즈니스 로직
│   │   │   └── core/      # 설정, 보안
│   │   └── tests/         # 백엔드 테스트
│   ├── mobile/            # React Native 앱
│   │   ├── src/
│   │   │   ├── screens/   # 화면 컴포넌트
│   │   │   ├── components/ # UI 컴포넌트
│   │   │   ├── services/  # API 클라이언트
│   │   │   └── store/     # 상태 관리
│   │   └── assets/        # 이미지, 폰트
├── packages/              # 공통 패키지
│   ├── shared-types/      # TypeScript 타입
│   └── constants/         # 공통 상수
└── infrastructure/        # 인프라 설정
    ├── docker/           # Docker Compose
    └── scripts/          # 개발 스크립트
```

## 🐛 문제 해결

### 자주 발생하는 문제들

#### 1. Docker 서비스 시작 안 됨
```bash
# Docker Desktop 실행 확인
docker --version

# 서비스 재시작
docker-compose -f infrastructure/docker/docker-compose.yml down
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

#### 2. 백엔드 포트 충돌 (8000번 포트)
```bash
# 포트 사용 중인 프로세스 확인 (Windows)
netstat -ano | findstr :8000

# 포트 사용 중인 프로세스 확인 (Mac/Linux)
lsof -i :8000

# 프로세스 종료 후 재시작
```

#### 3. 모바일 앱 QR 코드 스캔 안 됨
```bash
# Expo 서버 재시작
cd apps/mobile
npm start --clear

# 또는 웹에서 직접 접속
# http://localhost:8081
```

#### 4. 패키지 의존성 오류
```bash
# 캐시 삭제 후 재설치
npm run clean
npm install

# 백엔드 의존성 재설치
cd apps/backend
poetry install --no-cache
```

#### 5. 데이터베이스 연결 오류
```bash
# PostgreSQL 상태 확인
docker-compose -f infrastructure/docker/docker-compose.yml ps postgres

# 로그 확인
docker-compose -f infrastructure/docker/docker-compose.yml logs postgres
```

## 🧪 테스트 실행

### 백엔드 테스트
```bash
cd apps/backend
poetry run pytest
```

### 프론트엔드 테스트
```bash
cd apps/mobile
npm test
```

### 전체 테스트
```bash
npm test
```

## 📚 추가 학습 자료

### 기술별 공식 문서
- [FastAPI 문서](https://fastapi.tiangolo.com/)
- [React Native 문서](https://reactnative.dev/)
- [Expo 문서](https://docs.expo.dev/)
- [SQLAlchemy 문서](https://docs.sqlalchemy.org/)

### 프로젝트별 가이드
- Backend API 개발: `apps/backend/README.md`
- Mobile 개발: `apps/mobile/README.md`
- 공통 패키지 사용법: `packages/README.md`

## 🤝 팀 협업 가이드

### Git 워크플로우
```bash
# 새 기능 개발 시작
git checkout -b feature/your-feature-name

# 개발 완료 후
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/your-feature-name

# Pull Request 생성 후 코드 리뷰
```

### 코드 스타일 검사
```bash
# 전체 프로젝트 린트 검사
npm run lint

# 자동 포맷팅
npm run format
```

이 가이드를 따라하시면 개발 환경이 완벽하게 설정됩니다! 🚀
