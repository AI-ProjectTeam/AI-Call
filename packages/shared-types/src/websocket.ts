// WebSocket 이벤트 타입 정의

/**
 * WebSocket 이벤트 타입
 */
export interface WebSocketEvents {
  // 연결 관련
  'connection:established': { userId: string; timestamp: string };
  'connection:lost': { userId: string; timestamp: string };
  
  // 통화 관련
  'call:initiated': { callId: string; userId: string; timestamp: string };
  'call:ringing': { callId: string; userId: string };
  'call:answered': { callId: string; userId: string; timestamp: string };
  'call:ended': { callId: string; userId: string; duration: number; timestamp: string };
  'call:failed': { callId: string; userId: string; error: string; timestamp: string };
  
  // 일기 관련
  'diary:created': { diaryId: string; userId: string; title: string; timestamp: string };
  'diary:updated': { diaryId: string; userId: string; timestamp: string };
  
  // 할일 관련
  'todo:created': { todoId: string; userId: string; title: string; timestamp: string };
  'todo:completed': { todoId: string; userId: string; timestamp: string };
  'todo:reminder': { todoId: string; userId: string; title: string; timestamp: string };
  
  // 알림 관련
  'notification:sent': { notificationId: string; userId: string; type: string; timestamp: string };
  'notification:read': { notificationId: string; userId: string; timestamp: string };
  
  // 감정 분석 관련
  'emotion:alert': { userId: string; emotionScore: number; message: string; timestamp: string };
  
  // 시스템 관련
  'system:maintenance': { message: string; scheduledAt: string };
  'system:update': { version: string; message: string };
}

/**
 * WebSocket 메시지 형식
 */
export interface WebSocketMessage<T extends keyof WebSocketEvents = keyof WebSocketEvents> {
  event: T;
  data: WebSocketEvents[T];
  timestamp: string;
  messageId: string;
}

/**
 * WebSocket 연결 상태
 */
export type WebSocketConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

/**
 * WebSocket 클라이언트 설정
 */
export interface WebSocketConfig {
  url: string;
  reconnectAttempts: number;
  reconnectDelay: number;
  heartbeatInterval: number;
  timeout: number;
}
