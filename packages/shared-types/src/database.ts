// 데이터베이스 스키마 관련 타입

/**
 * 공통 데이터베이스 필드
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 사용자 테이블
 */
export interface UserEntity extends BaseEntity {
  name: string;
  phone: string;
  role: 'elderly' | 'guardian';
  guardianId?: string;
  isActive: boolean;
}

/**
 * 일기 테이블
 */
export interface DiaryEntity extends BaseEntity {
  userId: string;
  title: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'worried';
  callLogId?: string;
  photos: string[];
}

/**
 * 통화 기록 테이블
 */
export interface CallLogEntity extends BaseEntity {
  userId: string;
  duration: number;
  transcript: string;
  emotionScore: number;
  status: 'completed' | 'failed' | 'missed';
  audioFileUrl?: string;
}

/**
 * 할일 테이블
 */
export interface TodoEntity extends BaseEntity {
  userId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: Date;
  reminderTime?: Date;
  createdBy: string;
}

/**
 * 알림 테이블
 */
export interface NotificationEntity extends BaseEntity {
  userId: string;
  type: 'todo_reminder' | 'call_missed' | 'emotion_alert' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>;
}
