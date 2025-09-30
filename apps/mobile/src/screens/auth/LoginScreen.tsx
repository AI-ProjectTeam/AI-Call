/**
 * 로그인 화면
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

export const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!username || !password) {
      const message = '사용자명과 비밀번호를 입력해주세요.';
      if (Platform.OS === 'web') {
        window.alert(message);
      } else {
        Alert.alert('입력 오류', message);
      }
      return;
    }

    setLoading(true);
    try {
      // TODO: 실제 API 호출로 변경
      const mockUser = {
        id: '1',
        username,
        type: username.includes('elderly') ? 'elderly' : 'guardian',
        name: username.includes('elderly') ? '김할머니' : '김보호자',
      };
      
      await login(mockUser, 'mock-token');
      
      // 사용자 타입에 따라 네비게이션
      if (mockUser.type === 'elderly') {
        navigation.replace('ElderlyHome');
      } else {
        navigation.replace('GuardianHome');
      }
    } catch (error) {
      const message = '로그인에 실패했습니다.';
      if (Platform.OS === 'web') {
        window.alert(message);
      } else {
        Alert.alert('로그인 실패', message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI-Call</Text>
      <Text style={styles.subtitle}>어르신을 위한 AI 전화 서비스</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="사용자명 (예: elderly1 또는 guardian1)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? '로그인 중...' : '로그인'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>
          테스트 계정:{'\n'}
          어르신: elderly1 / password{'\n'}
          보호자: guardian1 / password
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  form: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  helpContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 16,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
