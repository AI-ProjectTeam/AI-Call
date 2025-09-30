# 🤖 AI-Call: 어르신을 위한 AI 전화 서비스

> AI 전화를 통한 어르신 안부인사 & TODO 리스트 & 일기작성 서비스

## 📋 프로젝트 개요

AI-Call은 어르신과 보호자를 위한 동행 플랫폼입니다. AI가 매일 어르신께 안부 전화를 드리고, 대화 내용을 바탕으로 자동으로 일기를 작성하며, 할 일 관리와 감정 상태 모니터링을 제공합니다.

### 🎯 타겟 사용자
- **어르신**: 70~80세, 자녀들과 떨어져 살고 계시며 스마트폰 사용이 어려우신 분들
- **보호자**: 30~50대, 경제활동으로 바빠 부모님과 자주 연락하기 어려운 자녀들

### ✨ 주요 기능
- 🤖 **AI 자동 안부 전화**: 매일 정해진 시간에 AI가 안부를 묻는 전화
- 📝 **자동 일기 작성**: 통화 내용을 STT로 변환하여 LLM으로 요약한 일기 자동 생성
- ✅ **할 일 관리**: 보호자가 설정한 할 일을 어르신께 알림으로 제공
- 📊 **감정 상태 모니터링**: 음성 분석을 통한 감정 상태 파악 및 위험 시 보호자 알림
- 📸 **가족 앨범**: 보호자와 어르신이 함께 만들어가는 사진 일기
- 💬 **상황별 챗봇**: 어르신 맞춤형 정보 제공 (병원, 복지관 정보 등)

## 🏗️ 프로젝트 구조

이 프로젝트는 **모노레포** 구조로 구성되어 있습니다.

```
ai-call/
├── 📦 packages/                    # 공통 패키지
│   ├── shared-types/               # 타입스크립트 공통 타입 정의
│   └── constants/                  # 공통 상수 (API 엔드포인트, 설정값 등)
│
├── 🚀 apps/                        # 애플리케이션들
│   ├── backend/                    # FastAPI 백엔드 서버
│   └── mobile/                     # React Native 모바일 앱
│
├── 📜 scripts/                     # 개발 편의 스크립트
├── 📚 docs/                        # 프로젝트 문서
└── 🔧 설정 파일들
```

### 📦 공통 패키지 (packages/)

#### `@ai-call/shared-types`
- 백엔드와 프론트엔드가 공유하는 TypeScript 타입 정의
- API 요청/응답, 데이터베이스 스키마, WebSocket 이벤트 타입 등

#### `@ai-call/constants`
- API 엔드포인트, HTTP 상태 코드, 설정값 등 공통 상수
- 유효성 검증 규칙, 에러 메시지 등

### 🚀 애플리케이션들 (apps/)

#### Backend (FastAPI + Python)
```
apps/backend/
├── app/
│   ├── api/v1/                     # API 엔드포인트
│   │   ├── auth.py                 # 인증
│   │   ├── users.py                # 사용자 관리
│   │   ├── diaries.py              # 일기 관리
│   │   ├── calls.py                # 통화 관리
│   │   ├── todos.py                # 할일 관리
│   │   ├── notifications.py        # 알림 관리
│   │   └── ai.py                   # AI 서비스
│   ├── core/                       # 핵심 설정
│   ├── db/                         # 데이터베이스
│   ├── repositories/               # 데이터 접근 계층
│   ├── schemas/                    # Pydantic 스키마
│   ├── services/                   # 비즈니스 로직
│   └── main.py                     # FastAPI 앱
├── tests/                          # 테스트
├── alembic/                        # DB 마이그레이션
└── pyproject.toml                  # Python 의존성 관리
```

#### Mobile (React Native + TypeScript)
```
apps/mobile/
├── src/
│   ├── api/                        # API 통신
│   ├── components/                 # 재사용 컴포넌트
│   ├── screens/                    # 화면 컴포넌트
│   │   ├── elderly/                # 어르신용 화면
│   │   └── guardian/               # 보호자용 화면
│   ├── navigation/                 # 네비게이션
│   ├── state/                      # 상태 관리 (Zustand)
│   ├── services/                   # 서비스 레이어
│   ├── hooks/                      # 커스텀 훅
│   ├── constants/                  # 앱별 상수
│   └── utils/                      # 유틸리티
├── assets/                         # 정적 자원
└── package.json
```

## 🛠️ 기술 스택

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL + SQLAlchemy ORM
- **Cache**: Redis
- **AI Services**: OpenAI GPT-4, Whisper (STT)
- **Communication**: Twilio (전화), Firebase (푸시 알림)
- **Task Queue**: Celery
- **Testing**: Pytest

### Frontend (Mobile)
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **UI Library**: React Native Paper
- **Navigation**: React Navigation 6
- **HTTP Client**: Axios
- **Testing**: Jest

### DevOps & Tools
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, Black, Flake8
- **Package Management**: npm workspaces, Poetry
- **Documentation**: 마크다운 기반

## 🚀 빠른 시작 가이드

### 📋 사전 요구사항

다음 도구들이 설치되어 있어야 합니다:

- **Node.js** 18+ ([다운로드](https://nodejs.org/))
- **Python** 3.11+ ([다운로드](https://www.python.org/))
- **Poetry** ([설치 가이드](https://python-poetry.org/docs/#installation))
- **Docker Desktop** ([다운로드](https://www.docker.com/products/docker-desktop/))

### ⚡ 자동 설정 (권장)

프로젝트 루트에서 다음 명령어를 실행하면 개발 환경이 자동으로 설정됩니다:

```bash
node infrastructure/scripts/setup-dev.js
```

이 스크립트는 다음 작업을 자동으로 수행합니다:
- ✅ 사전 요구사항 확인
- 📦 모든 의존성 패키지 설치
- 🔧 공통 패키지 빌드
- 📝 환경 변수 파일 생성
- 🐳 Docker 서비스 시작 (PostgreSQL, Redis, MinIO)
- 🎣 Git 훅 설정

### 🖥️ 개발 서버 시작

```bash
# 백엔드 + 모바일 동시 실행
npm run dev

# 또는 개별 실행
npm run dev:backend  # FastAPI 서버 (http://localhost:8000)
npm run dev:mobile   # Expo 개발 서버 (http://localhost:8081)
```

### 🔍 서비스 접속 정보

| 서비스 | URL | 로그인 정보 |
|--------|-----|-------------|
| 백엔드 API | http://localhost:8000 | - |
| API 문서 | http://localhost:8000/docs | - |
| 모바일 앱 | http://localhost:8081 | elderly1/password 또는 guardian1/password |
| pgAdmin | http://localhost:5050 | admin@ai-call.com/admin |
| MinIO Console | http://localhost:9001 | minioadmin/minioadmin123 |

### 🔧 수동 설정

자동 설정이 실패하거나 단계별로 진행하고 싶다면:

#### 1. 의존성 설치

```bash
# 루트 의존성 설치
npm install

# 공통 패키지 빌드
npm run build:shared

# 백엔드 의존성 설치
cd apps/backend
poetry install
cd ../..

# 모바일 의존성 설치
cd apps/mobile
npm install
cd ../..
```

#### 2. 환경 변수 설정

```bash
# 백엔드 환경 변수 파일 생성
cp apps/backend/env.example apps/backend/.env

# 모바일 환경 변수 파일 생성
cp apps/mobile/.env.example apps/mobile/.env
```

**중요**: 생성된 `.env` 파일들을 수정하여 실제 API 키와 데이터베이스 정보를 입력하세요.

#### 3. 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성 (예시)
createdb ai_call_db

# 데이터베이스 마이그레이션 실행
cd apps/backend
poetry run alembic upgrade head
cd ../..
```

### 🎯 개발 서버 실행

#### 전체 서비스 실행 (권장)
```bash
npm run dev
```

#### 개별 서비스 실행
```bash
# 백엔드만 실행
npm run dev:backend

# 모바일만 실행
npm run dev:mobile
```

### 📱 모바일 앱 실행

모바일 앱은 Expo를 사용합니다:

```bash
cd apps/mobile

# iOS 시뮬레이터
npm run ios

# Android 에뮬레이터
npm run android

# 웹 브라우저
npm run web
```

## 🧪 테스트 실행

### 전체 테스트
```bash
npm test
```

### 개별 테스트
```bash
# 백엔드 테스트
npm run test:backend

# 모바일 테스트
npm run test:mobile
```

### 테스트 커버리지
```bash
cd apps/backend
poetry run pytest --cov=app --cov-report=html

cd ../mobile
npm run test:coverage
```

## 🔍 코드 품질 관리

### 린트 검사
```bash
npm run lint
```

### 코드 포맷팅
```bash
npm run format
```

### 타입 체크 (TypeScript)
```bash
npm run typecheck
```

## 📝 개발 워크플로우

### 브랜치 네이밍 규칙
```
feature/backend/ai-service-integration
feature/mobile/call-screen-ui
feature/shared/diary-types-update
hotfix/backend/stt-memory-leak
```

### 커밋 메시지 컨벤션
```
<type>(<scope>): <description>

예시:
feat(backend): add STT service integration
fix(mobile): resolve call connection timeout
docs(shared): update API response types
test(backend): add diary service unit tests
```

### 코드 리뷰 체크리스트
- [ ] 기능이 요구사항에 맞게 구현되었는가?
- [ ] 테스트 코드가 작성되었는가?
- [ ] 코드 스타일 가이드를 준수했는가?
- [ ] 타입 안전성이 보장되는가?
- [ ] 성능에 문제가 없는가?
- [ ] 보안 취약점이 없는가?

## 🔧 유용한 명령어 모음

### 개발 관련
```bash
# 전체 빌드
npm run build

# 전체 클린
npm run clean

# 의존성 업데이트 확인
npm outdated
cd apps/backend && poetry show --outdated
```

### 데이터베이스 관련
```bash
cd apps/backend

# 새 마이그레이션 생성
poetry run alembic revision --autogenerate -m "마이그레이션 설명"

# 마이그레이션 실행
poetry run alembic upgrade head

# 마이그레이션 롤백
poetry run alembic downgrade -1
```

### Docker 관련
```bash
# 개발 환경 Docker 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 컨테이너 정리
docker-compose down
```

## 🤝 팀 협업 가이드

### 새 팀원 온보딩
1. 이 README를 처음부터 끝까지 읽기
2. `npm run setup` 실행하여 개발 환경 구축
3. 간단한 기능 구현해보기 (예: 새로운 API 엔드포인트 추가)
4. 코드 리뷰 프로세스 숙지

### 일일 개발 루틴
1. `git pull origin main` - 최신 코드 동기화
2. `npm run lint` - 코드 품질 검사
3. 기능 개발 및 테스트 작성
4. `npm test` - 테스트 실행
5. Pull Request 생성 및 코드 리뷰 요청

### 문제 해결
- **의존성 문제**: `npm run clean` 후 재설치
- **빌드 실패**: 공통 패키지 먼저 빌드 (`npm run build:shared`)
- **타입 에러**: `@ai-call/shared-types` 패키지 업데이트 확인
- **데이터베이스 문제**: 마이그레이션 상태 확인

## 📚 추가 문서

- [API 문서](docs/api-specification.md) - REST API 상세 명세
- [데이터베이스 스키마](docs/database-schema.md) - ERD 및 테이블 설계
- [아키텍처 가이드](docs/architecture.md) - 시스템 아키텍처 설명
- [배포 가이드](docs/deployment-guide.md) - 프로덕션 배포 방법

## 🐛 문제 신고 및 기여

### 버그 신고
GitHub Issues에 다음 정보와 함께 신고해주세요:
- 문제 상황 설명
- 재현 단계
- 예상 결과 vs 실제 결과
- 환경 정보 (OS, Node.js 버전 등)

### 기여 방법
1. Fork 후 feature 브랜치 생성
2. 코딩 스타일 가이드 준수
3. 테스트 코드 작성
4. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

## 🆘 도움이 필요하다면?

- **Slack**: #ai-call-dev 채널
- **이메일**: dev@ai-call.com
- **문서**: 이 README와 docs/ 폴더의 문서들 참고

**Happy Coding! 🚀**
