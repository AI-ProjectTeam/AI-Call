// 앱 관련 상수

/**
 * 앱 정보
 */
export const APP_INFO = {
  NAME: 'AI-Call',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI 전화를 통한 어르신 안부인사 서비스',
  SUPPORT_EMAIL: 'support@ai-call.com',
} as const;

/**
 * 환경 설정
 */
export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

/**
 * 기본 설정값
 */
export const DEFAULT_SETTINGS = {
  // 통화 설정
  CALL: {
    DEFAULT_SCHEDULE_TIME: '18:00', // 오후 6시
    MAX_DURATION: 1800, // 30분 (초)
    RETRY_ATTEMPTS: 3,
    RETRY_INTERVAL: 300, // 5분 (초)
  },
  
  // 알림 설정
  NOTIFICATION: {
    ENABLED: true,
    SOUND_ENABLED: true,
    VIBRATION_ENABLED: true,
    QUIET_HOURS_START: '22:00',
    QUIET_HOURS_END: '08:00',
  },
  
  // 일기 설정
  DIARY: {
    AUTO_SAVE: true,
    MAX_PHOTOS: 5,
    MAX_CONTENT_LENGTH: 2000,
  },
  
  // 할일 설정
  TODO: {
    DEFAULT_REMINDER_TIME: '09:00',
    MAX_ITEMS: 20,
  },
} as const;

/**
 * UI 상수
 */
export const UI = {
  // 색상 (기본 색상, 자세한 색상은 각 앱에서 정의)
  COLORS: {
    PRIMARY: '#007AFF',
    SECONDARY: '#5856D6',
    SUCCESS: '#34C759',
    WARNING: '#FF9500',
    ERROR: '#FF3B30',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY: '#8E8E93',
  },
  
  // 폰트 크기
  FONT_SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    EXTRA_LARGE: 24,
  },
  
  // 간격
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  
  // 애니메이션 시간
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
} as const;

/**
 * 저장소 키
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  APP_SETTINGS: 'app_settings',
  CALL_HISTORY: 'call_history',
  DRAFT_DIARY: 'draft_diary',
} as const;

/**
 * 이벤트 이름
 */
export const EVENTS = {
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  CALL_STARTED: 'call_started',
  CALL_ENDED: 'call_ended',
  DIARY_CREATED: 'diary_created',
  TODO_COMPLETED: 'todo_completed',
  NOTIFICATION_RECEIVED: 'notification_received',
} as const;

/**
 * 정규식 패턴
 */
export const REGEX_PATTERNS = {
  PHONE: /^[0-9]{10,11}$/, // 10-11자리 숫자
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // 최소 8자, 영문+숫자
} as const;
