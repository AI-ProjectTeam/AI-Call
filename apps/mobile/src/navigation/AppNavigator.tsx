/**
 * 메인 앱 네비게이터
 */

import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { ElderlyHome } from '../screens/elderly/ElderlyHome';

const Stack = createStackNavigator();

// 임시 홈 화면 컴포넌트
const HomeScreen = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleTestButton = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    const message = `버튼을 ${newCount}번 클릭했습니다.\n\n✅ Expo SDK 54 업그레이드 완료\n✅ React Native 앱 정상 작동\n✅ 백엔드 API 연결 준비 완료\n✅ 플랫폼: ${Platform.OS}`;
    
    if (Platform.OS === 'web') {
      window.alert(`🎉 앱이 정상 작동합니다!\n\n${message}`);
    } else {
      Alert.alert(
        '🎉 앱이 정상 작동합니다!',
        message,
        [{ text: '확인', style: 'default' }]
      );
    }
  };

  const handleAPITest = async () => {
    try {
      // 플랫폼별 API URL 설정
      const apiUrl = Platform.OS === 'web' 
        ? 'http://localhost:8000/' 
        : 'http://192.168.0.63:8000/';
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (Platform.OS === 'web') {
        // 웹에서는 window.alert 사용
        window.alert(`🌐 백엔드 연결 성공!\n\nAPI 응답: ${data.message}\n환경: ${data.environment}\n상태: ${data.status}`);
      } else {
        Alert.alert(
          '🌐 백엔드 연결 성공!',
          `API 응답: ${data.message}\n환경: ${data.environment}\n상태: ${data.status}`,
          [{ text: '확인', style: 'default' }]
        );
      }
    } catch (error) {
      const errorMessage = '백엔드 서버가 실행 중인지 확인해주세요.\n(http://localhost:8000)';
      
      if (Platform.OS === 'web') {
        window.alert(`⚠️ 백엔드 연결 실패\n\n${errorMessage}`);
      } else {
        Alert.alert(
          '⚠️ 백엔드 연결 실패',
          errorMessage,
          [{ text: '확인', style: 'default' }]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI-Call</Text>
      <Text style={styles.subtitle}>어르신을 위한 AI 전화 서비스</Text>
      <Text style={styles.description}>
        개발 환경이 성공적으로 설정되었습니다!
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleTestButton}>
        <Text style={styles.buttonText}>📱 앱 테스트하기</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.apiButton]} onPress={handleAPITest}>
        <Text style={styles.buttonText}>🌐 백엔드 API 테스트</Text>
      </TouchableOpacity>
      
      <Text style={styles.counter}>버튼 클릭 횟수: {clickCount}</Text>
    </View>
  );
};

interface AppNavigatorProps {
  isAuthenticated: boolean;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ElderlyHome" component={ElderlyHome} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    minWidth: 200,
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // 웹에서 호버 효과를 위한 transition
    ...(Platform.OS === 'web' && {
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#0056CC',
        transform: 'scale(1.05)',
      },
    }),
  },
  apiButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  counter: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
