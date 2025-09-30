/**
 * 어르신용 홈 화면
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

export const ElderlyHome = ({ navigation }: any) => {
  const { user, logout } = useAuthStore();

  const handleVoiceMemo = () => {
    navigation.navigate('VoiceMemo');
  };

  const handleDiary = () => {
    navigation.navigate('DiaryList');
  };

  const handleTodos = () => {
    navigation.navigate('TodoList');
  };

  const handleLogout = () => {
    const message = '로그아웃 하시겠습니까?';
    if (Platform.OS === 'web') {
      if (window.confirm(message)) {
        logout();
        navigation.replace('Login');
      }
    } else {
      Alert.alert('로그아웃', message, [
        { text: '취소', style: 'cancel' },
        { 
          text: '로그아웃', 
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.replace('Login');
          }
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요</Text>
        <Text style={styles.userName}>{user?.name}님!</Text>
        <Text style={styles.subtitle}>오늘도 좋은 하루 보내세요 😊</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bigButton} onPress={handleVoiceMemo}>
          <Text style={styles.buttonIcon}>🎤</Text>
          <Text style={styles.buttonTitle}>음성 메모</Text>
          <Text style={styles.buttonSubtitle}>목소리로 기록하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigButton} onPress={handleDiary}>
          <Text style={styles.buttonIcon}>📔</Text>
          <Text style={styles.buttonTitle}>내 일기</Text>
          <Text style={styles.buttonSubtitle}>오늘의 일기 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigButton} onPress={handleTodos}>
          <Text style={styles.buttonIcon}>✅</Text>
          <Text style={styles.buttonTitle}>할 일</Text>
          <Text style={styles.buttonSubtitle}>오늘 할 일 확인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigButton} onPress={() => {
          const message = 'AI 전화 기능은 곧 추가될 예정입니다.';
          if (Platform.OS === 'web') {
            window.alert(message);
          } else {
            Alert.alert('알림', message);
          }
        }}>
          <Text style={styles.buttonIcon}>📞</Text>
          <Text style={styles.buttonTitle}>AI 전화</Text>
          <Text style={styles.buttonSubtitle}>AI와 대화하기</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
  },
  bigButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
