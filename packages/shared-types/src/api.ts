// API 요청/응답 타입 정의

/**
 * 공통 API 응답 형식
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * 페이지네이션 응답
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 사용자 관련 타입
 */
export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'elderly' | 'guardian';
  guardianId?: string; // 보호자 ID (어르신인 경우)
  elderlyIds?: string[]; // 관리하는 어르신 IDs (보호자인 경우)
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateRequest {
  name: string;
  phone: string;
  role: 'elderly' | 'guardian';
  guardianId?: string;
}

export interface UserUpdateRequest {
  name?: string;
  phone?: string;
}

/**
 * 일기 관련 타입
 */
export interface Diary {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'worried';
  callLogId?: string; // 연결된 통화 기록 ID
  photos: string[]; // 사진 URL 배열
  createdAt: string;
  updatedAt: string;
}

export interface DiaryCreateRequest {
  title?: string;
  content: string;
  mood: Diary['mood'];
  callLogId?: string;
  photos?: string[];
}

export interface DiaryUpdateRequest {
  title?: string;
  content?: string;
  mood?: Diary['mood'];
  photos?: string[];
}

/**
 * 통화 기록 관련 타입
 */
export interface CallLog {
  id: string;
  userId: string;
  duration: number; // 통화 시간 (초)
  transcript: string; // STT 결과
  emotionScore: number; // 감정 점수 (-1 ~ 1)
  status: 'completed' | 'failed' | 'missed';
  createdAt: string;
}

export interface CallLogCreateRequest {
  userId: string;
  duration: number;
  transcript: string;
  emotionScore: number;
  status: CallLog['status'];
}

/**
 * 할일 관련 타입
 */
export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
  reminderTime?: string; // 알림 시간
  createdBy: string; // 생성자 ID (보호자 또는 어르신)
  createdAt: string;
  updatedAt: string;
}

export interface TodoCreateRequest {
  userId: string;
  title: string;
  description?: string;
  dueDate?: string;
  reminderTime?: string;
}

export interface TodoUpdateRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string;
  reminderTime?: string;
}

/**
 * 알림 관련 타입
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'todo_reminder' | 'call_missed' | 'emotion_alert' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>; // 추가 데이터
  createdAt: string;
}

export interface NotificationCreateRequest {
  userId: string;
  type: Notification['type'];
  title: string;
  message: string;
  data?: Record<string, any>;
}
