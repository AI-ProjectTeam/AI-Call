// 공통 유틸리티 타입

/**
 * 에러 코드 정의
 */
export enum ErrorCode {
  // 인증 관련
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  // 사용자 관련
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  
  // 일기 관련
  DIARY_NOT_FOUND = 'DIARY_NOT_FOUND',
  DIARY_SAVE_FAILED = 'DIARY_SAVE_FAILED',
  
  // 통화 관련
  CALL_CONNECTION_FAILED = 'CALL_CONNECTION_FAILED',
  CALL_NOT_FOUND = 'CALL_NOT_FOUND',
  
  // AI 서비스 관련
  STT_SERVICE_ERROR = 'STT_SERVICE_ERROR',
  TTS_SERVICE_ERROR = 'TTS_SERVICE_ERROR',
  LLM_SERVICE_ERROR = 'LLM_SERVICE_ERROR',
  
  // 할일 관련
  TODO_NOT_FOUND = 'TODO_NOT_FOUND',
  TODO_SAVE_FAILED = 'TODO_SAVE_FAILED',
  
  // 시스템 관련
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR'
}

/**
 * 앱 에러 클래스
 */
export interface AppError {
  code: ErrorCode;
  message: string;
  details?: any;
  timestamp: string;
}

/**
 * 감정 상태
 */
export type EmotionType = 'happy' | 'sad' | 'neutral' | 'excited' | 'worried' | 'angry' | 'calm';

/**
 * 사용자 역할
 */
export type UserRole = 'elderly' | 'guardian';

/**
 * 통화 상태
 */
export type CallStatus = 'pending' | 'ringing' | 'active' | 'completed' | 'failed' | 'missed';

/**
 * 알림 타입
 */
export type NotificationType = 'todo_reminder' | 'call_missed' | 'emotion_alert' | 'system' | 'diary_created';

/**
 * 날짜 유틸리티 타입
 */
export interface DateRange {
  startDate: string;
  endDate: string;
}

/**
 * 페이지네이션 파라미터
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 검색 파라미터
 */
export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

/**
 * 파일 업로드 타입
 */
export interface FileUpload {
  filename: string;
  mimetype: string;
  size: number;
  url: string;
}

/**
 * 설정 타입
 */
export interface AppSettings {
  callSchedule: {
    enabled: boolean;
    time: string; // HH:mm 형식
    timezone: string;
  };
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    shareDataWithGuardian: boolean;
    saveCallRecordings: boolean;
  };
}
