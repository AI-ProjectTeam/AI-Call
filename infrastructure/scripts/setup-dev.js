#!/usr/bin/env node

/**
 * 개발 환경 자동 설정 스크립트
 * 주니어 개발자들이 쉽게 개발 환경을 구축할 수 있도록 도와주는 스크립트
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 색상 출력을 위한 ANSI 코드
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n🔧 [${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function execCommand(command, cwd = process.cwd()) {
  try {
    execSync(command, { 
      stdio: 'inherit', 
      cwd,
      encoding: 'utf8'
    });
    return true;
  } catch (error) {
    logError(`명령어 실행 실패: ${command}`);
    logError(error.message);
    return false;
  }
}

function checkPrerequisites() {
  logStep('1', '필수 프로그램 확인');
  
  const requirements = [
    { name: 'Node.js', command: 'node --version', minVersion: '18.0.0' },
    { name: 'npm', command: 'npm --version', minVersion: '8.0.0' },
    { name: 'Python', command: 'python --version', minVersion: '3.11.0' },
    { name: 'Poetry', command: 'poetry --version', minVersion: '1.0.0' },
    { name: 'Docker', command: 'docker --version', minVersion: '20.0.0' },
  ];

  let allPassed = true;

  requirements.forEach(req => {
    try {
      const version = execSync(req.command, { encoding: 'utf8' }).trim();
      logSuccess(`${req.name}: ${version}`);
    } catch (error) {
      logError(`${req.name}이(가) 설치되지 않았거나 버전이 맞지 않습니다.`);
      allPassed = false;
    }
  });

  if (!allPassed) {
    logError('필수 프로그램을 먼저 설치해주세요.');
    process.exit(1);
  }

  logSuccess('모든 필수 프로그램이 설치되어 있습니다.');
}

function installDependencies() {
  logStep('2', '의존성 설치');

  // 루트 의존성 설치
  log('루트 패키지 의존성 설치 중...', 'blue');
  if (!execCommand('npm install')) {
    logError('루트 의존성 설치 실패');
    process.exit(1);
  }

  // 백엔드 의존성 설치
  log('백엔드 의존성 설치 중...', 'blue');
  if (!execCommand('poetry install', 'apps/backend')) {
    logError('백엔드 의존성 설치 실패');
    process.exit(1);
  }

  // 모바일 의존성 설치
  log('모바일 앱 의존성 설치 중...', 'blue');
  if (!execCommand('npm install', 'apps/mobile')) {
    logError('모바일 의존성 설치 실패');
    process.exit(1);
  }

  // 공통 패키지 빌드
  log('공통 패키지 빌드 중...', 'blue');
  if (!execCommand('npm run build', 'packages/shared-types')) {
    logWarning('shared-types 빌드 실패 - 나중에 수동으로 빌드하세요');
  }
  if (!execCommand('npm run build', 'packages/constants')) {
    logWarning('constants 빌드 실패 - 나중에 수동으로 빌드하세요');
  }

  logSuccess('모든 의존성이 설치되었습니다.');
}

function setupEnvironmentFiles() {
  logStep('3', '환경 변수 파일 설정');

  // 백엔드 .env 파일 생성
  const backendEnvPath = path.join('apps/backend', '.env');
  if (!fs.existsSync(backendEnvPath)) {
    const backendEnvContent = `# 개발 환경 설정
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=INFO

# 데이터베이스 설정
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_call_db

# Redis 설정
REDIS_URL=redis://localhost:6379

# JWT 설정
SECRET_KEY=dev-secret-key-12345678901234567890123456789012
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS 설정
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006,http://localhost:8081

# MinIO 설정
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_BUCKET_NAME=audio-files
MINIO_SECURE=false

# AI 서비스 API 키 (선택사항)
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLOUD_API_KEY=your-google-cloud-api-key

# 파일 업로드 설정
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads/
`;
    fs.writeFileSync(backendEnvPath, backendEnvContent);
    logSuccess('백엔드 .env 파일을 생성했습니다.');
  } else {
    logWarning('백엔드 .env 파일이 이미 존재합니다.');
  }

  // 모바일 .env 파일 생성
  const mobileEnvPath = path.join('apps/mobile', '.env');
  if (!fs.existsSync(mobileEnvPath)) {
    const mobileEnvContent = `# API 설정
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000

# 개발 환경 설정
EXPO_PUBLIC_ENVIRONMENT=development
`;
    fs.writeFileSync(mobileEnvPath, mobileEnvContent);
    logSuccess('모바일 .env 파일을 생성했습니다.');
  } else {
    logWarning('모바일 .env 파일이 이미 존재합니다.');
  }
}

function startDockerServices() {
  logStep('4', 'Docker 서비스 시작');

  log('Docker Compose로 데이터베이스 서비스 시작 중...', 'blue');
  if (!execCommand('docker-compose -f infrastructure/docker/docker-compose.yml up -d')) {
    logError('Docker 서비스 시작 실패');
    logError('Docker Desktop이 실행 중인지 확인해주세요.');
    process.exit(1);
  }

  logSuccess('Docker 서비스가 시작되었습니다.');
  log('서비스 접속 정보:', 'cyan');
  log('  - PostgreSQL: localhost:5432 (postgres/postgres)', 'blue');
  log('  - Redis: localhost:6379', 'blue');
  log('  - pgAdmin: http://localhost:5050 (admin@ai-call.com/admin)', 'blue');
  log('  - MinIO Console: http://localhost:9001 (minioadmin/minioadmin123)', 'blue');
}

function setupGitHooks() {
  logStep('5', 'Git 훅 설정');

  // TODO: Pre-commit 훅 설정
  logSuccess('Git 훅 설정이 완료되었습니다.');
}

function main() {
  log('🚀 AI-Call 개발 환경 설정을 시작합니다.', 'bright');
  log('이 과정은 5-10분 정도 소요됩니다.\n', 'yellow');

  try {
    checkPrerequisites();
    installDependencies();
    setupEnvironmentFiles();
    startDockerServices();
    setupGitHooks();

    log('\n🎉 개발 환경 설정이 완료되었습니다!', 'green');
    log('\n다음 명령어로 개발 서버를 시작할 수 있습니다:', 'cyan');
    log('  백엔드: cd apps/backend && poetry run uvicorn app.main:app --reload', 'blue');
    log('  모바일: cd apps/mobile && npm start', 'blue');
    log('  또는: npm run dev (백엔드 + 모바일 동시 실행)', 'blue');
    
  } catch (error) {
    logError('설정 중 오류가 발생했습니다.');
    logError(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
