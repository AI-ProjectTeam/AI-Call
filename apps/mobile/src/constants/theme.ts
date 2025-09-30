/**
 * 앱 테마 설정
 */

export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#34C759',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E1E1E1',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
};

export type Theme = typeof theme;