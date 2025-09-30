# AI-Call Mobile

React Native + Expo 기반의 AI-Call 모바일 애플리케이션입니다.

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 수정하여 실제 값 입력
```

### 3. 공통 패키지 빌드
```bash
cd ../../
npm run build:shared
cd apps/mobile
```

### 4. 앱 실행
```bash
# 개발 서버 시작
npm start

# 특정 플랫폼에서 실행
npm run ios      # iOS 시뮬레이터
npm run android  # Android 에뮬레이터
npm run web      # 웹 브라우저
```

## 📱 빌드

### 개발 빌드
```bash
expo build:android
expo build:ios
```

### 프로덕션 빌드
```bash
# Android APK
expo build:android -t apk

# iOS IPA
expo build:ios -t archive
```

## 🧪 테스트

```bash
# 전체 테스트 실행
npm test

# 테스트 watch 모드
npm run test:watch

# 커버리지와 함께 테스트
npm run test:coverage
```

## 🔧 개발 도구

### 코드 품질 검사
```bash
# 린트 검사
npm run lint

# 코드 포맷팅
npm run format

# 타입 검사
npm run typecheck
```

### 디버깅
- React Native Debugger 사용
- Expo DevTools 활용
- Chrome DevTools 연동

## 📁 프로젝트 구조

```
src/
├── api/                # API 통신
├── components/         # 재사용 컴포넌트
├── screens/           # 화면 컴포넌트
│   ├── elderly/       # 어르신용 화면
│   └── guardian/      # 보호자용 화면
├── navigation/        # 네비게이션
├── state/            # 상태 관리
├── services/         # 서비스 레이어
├── hooks/            # 커스텀 훅
├── constants/        # 앱별 상수
└── utils/            # 유틸리티
```
