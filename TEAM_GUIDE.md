# 👥 AI-Call 팀 협업 가이드

## 🎯 팀 구성 및 역할 분담 (5명)

### **Backend 팀 (2명)**

#### **Backend 개발자 A (팀장)**
**담당 영역:**
- 🔐 **사용자 인증 시스템**
  - `apps/backend/app/api/v1/auth.py`
  - `apps/backend/app/services/auth_service.py`
  - `apps/backend/app/core/security.py`
  - `apps/backend/app/core/deps.py`

- 👤 **사용자 관리**
  - `apps/backend/app/api/v1/users.py`
  - `apps/backend/app/models/user.py`
  - `apps/backend/app/schemas/user.py`

- 🗄️ **데이터베이스 설계 및 관리**
  - `apps/backend/app/core/database.py`
  - `apps/backend/alembic/` (마이그레이션)
  - 테이블 관계 설정

**주요 작업:**
```python
# 1주차: 기본 인증 API
POST /api/v1/auth/login     # 로그인
POST /api/v1/auth/register  # 회원가입
GET  /api/v1/auth/me        # 현재 사용자 정보

# 2주차: 사용자 관리 API
GET    /api/v1/users/       # 사용자 목록
PUT    /api/v1/users/me     # 사용자 정보 수정
DELETE /api/v1/users/me     # 계정 삭제
```

#### **Backend 개발자 B**
**담당 영역:**
- 🎤 **음성 처리 시스템**
  - `apps/backend/app/api/v1/calls.py`
  - `apps/backend/app/services/audio_service.py`
  - `apps/backend/app/utils/audio_utils.py`
  - MinIO 연동

- 📝 **일기 및 할일 관리**
  - `apps/backend/app/api/v1/diaries.py`
  - `apps/backend/app/api/v1/todos.py`
  - `apps/backend/app/services/diary_service.py`
  - `apps/backend/app/services/todo_service.py`

- 🤖 **AI 서비스 연동**
  - OpenAI Whisper (STT)
  - GPT-4 (일기 생성, TODO 추출)

**주요 작업:**
```python
# 1주차: 음성 파일 업로드/다운로드
POST /api/v1/calls/upload-audio    # 음성 파일 업로드
GET  /api/v1/calls/{id}/audio      # 음성 파일 다운로드

# 2주차: AI 분석 기능
POST /api/v1/calls/{id}/transcribe # STT 변환
POST /api/v1/diaries/generate      # AI 일기 생성
POST /api/v1/todos/extract         # TODO 추출
```

---

### **Frontend 팀 (2명)**

#### **Frontend 개발자 A (어르신 UI 전담)**
**담당 영역:**
- 👴 **어르신용 화면 전체**
  - `apps/mobile/src/screens/elderly/`
  - `apps/mobile/src/components/elderly/`
  - 접근성 최적화

- 🎤 **음성 녹음 컴포넌트**
  - `apps/mobile/src/components/elderly/VoiceRecorder.tsx`
  - `apps/mobile/src/services/audio.ts`

**주요 작업:**
```typescript
// 1주차: 기본 화면 구성
ElderlyHome.tsx          // 홈 화면 (큰 버튼들)
VoiceMemo.tsx           // 음성 메모 화면
DiaryList.tsx           // 일기 목록 (큰 글씨)

// 2주차: 상호작용 기능
BigButton.tsx           // 60px+ 큰 버튼 컴포넌트
VoiceRecorder.tsx       // 음성 녹음 컴포넌트
SimpleCard.tsx          // 간단한 카드 UI
```

#### **Frontend 개발자 B (보호자 UI 전담)**
**담당 영역:**
- 👨‍👩‍👧‍👦 **보호자용 화면 전체**
  - `apps/mobile/src/screens/guardian/`
  - `apps/mobile/src/components/guardian/`

- 📊 **모니터링 및 분석 화면**
  - 실시간 상태 모니터링
  - 간단한 차트/그래프
  - 알림 센터

**주요 작업:**
```typescript
// 1주차: 대시보드 화면
GuardianHome.tsx        // 보호자 홈 대시보드
MonitoringScreen.tsx    // 실시간 모니터링
SettingsScreen.tsx      // 설정 화면

// 2주차: 분석 기능
StatusCard.tsx          // 상태 표시 카드
ActivityList.tsx        // 활동 내역 리스트
SimpleChart.tsx         // 모바일용 간단한 차트
```

---

### **DevOps 개발자 (1명)**

#### **DevOps 및 공통 개발자**
**담당 영역:**
- 🐳 **인프라 관리**
  - `infrastructure/docker/docker-compose.yml`
  - `infrastructure/scripts/setup-dev.js`
  - 배포 스크립트

- 📦 **공통 패키지 관리**
  - `packages/shared-types/`
  - `packages/constants/`
  - 타입 정의 및 빌드

- 🔧 **개발 환경 설정**
  - CI/CD 파이프라인
  - 코드 품질 도구 설정
  - 테스트 환경 구축

**주요 작업:**
```bash
# 1주차: 개발 환경 구축
Docker Compose 설정
환경 변수 템플릿 작성
자동 설정 스크립트 개선

# 2주차: 배포 환경 구축
GitHub Actions CI/CD
AWS/GCP 배포 스크립트
모니터링 설정
```

---

## 📅 주차별 개발 일정

### **1주차: 기반 구축**

#### **월요일-화요일: 환경 설정**
- **전체**: 개발 환경 설정 및 Git 설정
- **DevOps**: Docker 환경 최적화
- **Backend A**: 데이터베이스 모델 최종 확정
- **Backend B**: MinIO 연동 테스트
- **Frontend A&B**: React Native 프로젝트 설정

#### **수요일-금요일: 기본 기능 구현**
- **Backend A**: 사용자 인증 API 구현
- **Backend B**: 음성 파일 업로드/다운로드 API
- **Frontend A**: 어르신 홈 화면 + 로그인
- **Frontend B**: 보호자 홈 화면 + 로그인
- **DevOps**: 공통 타입 정의 및 빌드

### **2주차: 핵심 기능**

#### **월요일-화요일: API 개발**
- **Backend A**: 사용자 관리 API 완성
- **Backend B**: 일기/할일 CRUD API
- **Frontend A**: 음성 녹음 기능
- **Frontend B**: 모니터링 화면
- **DevOps**: API 타입 정의 업데이트

#### **수요일-금요일: 화면 연동**
- **Backend A**: API 테스트 및 문서 작성
- **Backend B**: STT 연동 (기본)
- **Frontend A**: 일기/할일 화면
- **Frontend B**: 대시보드 데이터 연동
- **DevOps**: 테스트 환경 구축

### **3주차: 고급 기능**

#### **월요일-화요일: AI 기능**
- **Backend B**: GPT 연동 (일기 생성, TODO 추출)
- **Frontend A**: AI 생성 일기 승인 기능
- **Frontend B**: 분석 차트 구현
- **DevOps**: 외부 API 연동 설정

#### **수요일-금요일: 실시간 기능**
- **Backend A**: WebSocket 연결 (기본)
- **Backend B**: 실시간 상태 업데이트
- **Frontend A**: 실시간 알림 수신
- **Frontend B**: 실시간 모니터링
- **DevOps**: 성능 최적화

### **4주차: 통합 및 테스트**

#### **월요일-화요일: 기능 통합**
- **전체**: 크로스 플랫폼 테스트
- **Backend**: API 최적화 및 버그 수정
- **Frontend**: UI/UX 개선
- **DevOps**: 배포 준비

#### **수요일-금요일: 배포 준비**
- **전체**: 최종 테스트 및 버그 수정
- **DevOps**: 프로덕션 배포 환경 구축
- **Backend**: 성능 최적화
- **Frontend**: 최종 UI 다듬기

### **5주차: 배포 및 마무리**

#### **월요일-화요일: 배포**
- **DevOps**: 프로덕션 배포
- **전체**: 배포 후 테스트
- **Backend**: 모니터링 설정
- **Frontend**: 최종 사용자 테스트

#### **수요일-금요일: 마무리**
- **전체**: 문서 작성 및 발표 준비
- **DevOps**: 운영 가이드 작성
- **팀**: 프로젝트 회고 및 개선점 도출

---

## 🤝 협업 규칙

### **Git 브랜치 전략**
```bash
main                    # 프로덕션 브랜치
├── develop            # 개발 통합 브랜치
├── feature/auth       # Backend A (인증)
├── feature/audio      # Backend B (음성)
├── feature/elderly-ui # Frontend A (어르신 UI)
├── feature/guardian-ui # Frontend B (보호자 UI)
└── feature/infra      # DevOps (인프라)
```

### **커밋 메시지 규칙**
```bash
feat(auth): 사용자 로그인 API 구현
fix(audio): 음성 파일 업로드 버그 수정
docs(readme): 설치 가이드 업데이트
style(ui): 어르신용 버튼 크기 조정
refactor(db): 사용자 모델 구조 개선
test(api): 인증 API 테스트 추가
```

### **일일 스탠드업 (매일 오전 10시)**
각자 다음 내용 공유:
1. **어제 한 일**: 완료한 작업
2. **오늘 할 일**: 계획된 작업
3. **블로커**: 도움이 필요한 문제

### **코드 리뷰 규칙**
- **최소 1명 승인** 후 머지
- **24시간 내 리뷰** 완료
- **건설적인 피드백** 제공
- **테스트 코드** 필수

### **파일 충돌 최소화**
- **기능별 파일 분리**: 같은 파일 동시 수정 방지
- **API 스펙 사전 협의**: Backend-Frontend 간 인터페이스
- **공통 컴포넌트 우선 개발**: 재사용 가능한 부분

---

## 📞 커뮤니케이션 채널

### **Slack/Discord 채널 구성**
- `#general`: 전체 공지사항
- `#backend`: Backend 관련 논의
- `#frontend`: Frontend 관련 논의
- `#devops`: 인프라 관련 논의
- `#daily-standup`: 일일 스탠드업
- `#code-review`: 코드 리뷰 요청

### **주간 회의**
- **매주 금요일 오후 5시**: 주간 회고 및 다음 주 계획
- **화상 회의**: 필요시 화면 공유로 코드 리뷰

---

## 🎯 성공 지표

### **1주차 목표**
- ✅ 개발 환경 100% 설정 완료
- ✅ 기본 인증 시스템 동작
- ✅ 모바일 앱 기본 화면 완성

### **2주차 목표**
- ✅ 모든 CRUD API 완성
- ✅ 음성 녹음/재생 기능 동작
- ✅ 사용자 타입별 화면 분기

### **3주차 목표**
- ✅ AI 기능 기본 동작 (STT, 일기 생성)
- ✅ 보호자 모니터링 기능
- ✅ 실시간 알림 시스템

### **4주차 목표**
- ✅ 전체 기능 통합 완료
- ✅ 크로스 플랫폼 테스트 통과
- ✅ 배포 환경 준비 완료

### **5주차 목표**
- ✅ 프로덕션 배포 성공
- ✅ 실제 사용자 테스트 완료
- ✅ 프로젝트 문서 완성

---

## 🆘 트러블슈팅 가이드

### **자주 발생하는 문제들**

#### **Backend 개발자**
- **데이터베이스 마이그레이션 오류**: `alembic revision --autogenerate`
- **의존성 충돌**: `poetry lock --no-update`
- **Docker 컨테이너 연결 실패**: 네트워크 설정 확인

#### **Frontend 개발자**
- **Expo SDK 버전 충돌**: `expo install --fix`
- **타입 오류**: 공통 패키지 빌드 확인
- **모바일 디버깅**: React Native Debugger 사용

#### **DevOps 개발자**
- **Docker 빌드 실패**: 캐시 삭제 후 재빌드
- **CI/CD 파이프라인 오류**: 환경 변수 설정 확인
- **배포 실패**: 로그 확인 및 롤백

이 가이드를 따라하면 팀이 효율적으로 협업할 수 있습니다! 🚀
