// 유효성 검증 관련 상수

/**
 * 유효성 검증 규칙
 */
export const VALIDATION_RULES = {
  // 사용자
  USER: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
    },
    PHONE: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 11,
    },
  },
  
  // 일기
  DIARY: {
    TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 100,
    },
    CONTENT: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 2000,
    },
    MAX_PHOTOS: 5,
  },
  
  // 할일
  TODO: {
    TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 100,
    },
    DESCRIPTION: {
      MAX_LENGTH: 500,
    },
  },
  
  // 통화
  CALL: {
    MIN_DURATION: 1, // 최소 1초
    MAX_DURATION: 3600, // 최대 1시간
  },
  
  // 파일 업로드
  FILE: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_AUDIO_TYPES: ['audio/wav', 'audio/mp3', 'audio/m4a'],
  },
} as const;

/**
 * 에러 메시지
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: '필수 입력 항목입니다.',
  INVALID_FORMAT: '올바른 형식이 아닙니다.',
  TOO_SHORT: '너무 짧습니다.',
  TOO_LONG: '너무 깁니다.',
  INVALID_PHONE: '올바른 전화번호를 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일을 입력해주세요.',
  PASSWORD_WEAK: '비밀번호는 최소 8자리, 영문과 숫자를 포함해야 합니다.',
  FILE_TOO_LARGE: '파일 크기가 너무 큽니다.',
  INVALID_FILE_TYPE: '지원하지 않는 파일 형식입니다.',
  MAX_PHOTOS_EXCEEDED: '사진은 최대 5장까지 업로드할 수 있습니다.',
} as const;
