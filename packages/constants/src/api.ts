// API 관련 상수

/**
 * API 엔드포인트
 */
export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH: '/api/v1/auth/refresh',
    REGISTER: '/api/v1/auth/register',
  },
  
  // 사용자
  USERS: {
    BASE: '/api/v1/users',
    PROFILE: '/api/v1/users/profile',
    BY_ID: (id: string) => `/api/v1/users/${id}`,
  },
  
  // 일기
  DIARIES: {
    BASE: '/api/v1/diaries',
    BY_ID: (id: string) => `/api/v1/diaries/${id}`,
    BY_USER: (userId: string) => `/api/v1/users/${userId}/diaries`,
    PHOTOS: (diaryId: string) => `/api/v1/diaries/${diaryId}/photos`,
  },
  
  // 통화 기록
  CALLS: {
    BASE: '/api/v1/calls',
    BY_ID: (id: string) => `/api/v1/calls/${id}`,
    BY_USER: (userId: string) => `/api/v1/users/${userId}/calls`,
    INITIATE: '/api/v1/calls/initiate',
    END: (callId: string) => `/api/v1/calls/${callId}/end`,
  },
  
  // 할일
  TODOS: {
    BASE: '/api/v1/todos',
    BY_ID: (id: string) => `/api/v1/todos/${id}`,
    BY_USER: (userId: string) => `/api/v1/users/${userId}/todos`,
    COMPLETE: (todoId: string) => `/api/v1/todos/${todoId}/complete`,
  },
  
  // 알림
  NOTIFICATIONS: {
    BASE: '/api/v1/notifications',
    BY_ID: (id: string) => `/api/v1/notifications/${id}`,
    BY_USER: (userId: string) => `/api/v1/users/${userId}/notifications`,
    MARK_READ: (notificationId: string) => `/api/v1/notifications/${notificationId}/read`,
  },
  
  // AI 서비스
  AI: {
    STT: '/api/v1/ai/stt',
    TTS: '/api/v1/ai/tts',
    CHAT: '/api/v1/ai/chat',
    EMOTION_ANALYSIS: '/api/v1/ai/emotion',
    DIARY_SUMMARY: '/api/v1/ai/diary-summary',
  },
  
  // 파일 업로드
  FILES: {
    UPLOAD: '/api/v1/files/upload',
    BY_ID: (fileId: string) => `/api/v1/files/${fileId}`,
  },
  
  // WebSocket
  WEBSOCKET: '/ws',
} as const;

/**
 * HTTP 상태 코드
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * API 설정
 */
export const API_CONFIG = {
  TIMEOUT: 30000, // 30초
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1초
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  SUPPORTED_AUDIO_TYPES: ['audio/wav', 'audio/mp3', 'audio/m4a'],
} as const;
