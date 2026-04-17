import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";

export default function ProfileSetup({ route, navigation }) {
  // 회원가입 페이지에서 넘어온 유저 정보 (없을 경우 대비)
  const { userInfo } = route.params || { userInfo: { major: '전공 미지정' } };
  const [spec, setSpec] = useState({ university: '', gpa: '', english: '', license: '', career: '', skill: '' });

  // 다음 단계(대시보드)로 이동하는 함수
  const handleFinish = (isSkip = false) => {
    // 건너뛰기면 빈 값으로, 완료면 입력한 spec으로 이동
    const finalSpec = isSkip ? {} : spec;
    console.log("프로필 설정 완료:", finalSpec);
    
    // 대시보드로 이동하며 전공 정보를 넘겨줌
    navigation.navigate("Dashboard", { 
      major: userInfo.major,
      spec: finalSpec 
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>프로필 설정</Text>
        <Text style={styles.subtitle}>더 정확한 추천을 위해 스펙을 입력해주세요 (선택사항)</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>학교 / 학점</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput style={[styles.input, { flex: 2 }]} placeholder="예: 서울대학교" onChangeText={(t) => setSpec({...spec, university: t})} />
            <TextInput style={[styles.input, { flex: 1 }]} placeholder="3.8/4.5" onChangeText={(t) => setSpec({...spec, gpa: t})} />
          </View>

          <Text style={styles.label}>영어 성적</Text>
          <TextInput style={styles.input} placeholder="예: TOEIC 900" onChangeText={(t) => setSpec({...spec, english: t})} />

          <Text style={styles.label}>자격증</Text>
          <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="보유 자격증 (쉼표 구분)" onChangeText={(t) => setSpec({...spec, license: t})} />

          <Text style={styles.label}>경력 / 인턴</Text>
          <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="주요 경력 사항" onChangeText={(t) => setSpec({...spec, career: t})} />
        </View>

        {/* 버튼 영역: 여기가 중요합니다! */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={styles.skipBtn} 
            onPress={() => handleFinish(true)} // 건너뛰기 클릭 시
          >
            <Text style={styles.skipText}>건너뛰기</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.completeBtn} 
            onPress={() => handleFinish(false)} // 완료 클릭 시
          >
            <Text style={styles.completeText}>설정 완료</Text>
          </TouchableOpacity>
        </View>

        {/* 웹 브라우저에서 버튼이 잘리는 걸 방지하기 위한 하단 여백 */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 25, flexGrow: 1 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1E40AF' },
  subtitle: { color: '#666', marginBottom: 30, marginTop: 5 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 15, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  input: { 
    backgroundColor: '#F3F4F6', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  buttonWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20,
    gap: 10
  },
  skipBtn: { 
    flex: 1,
    padding: 18, 
    alignItems: 'center', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#D1D5DB',
    backgroundColor: '#fff' 
  },
  completeBtn: { 
    flex: 1,
    padding: 18, 
    alignItems: 'center', 
    borderRadius: 12, 
    backgroundColor: '#1E40AF' 
  },
  skipText: { color: '#666', fontWeight: 'bold' },
  completeText: { color: '#fff', fontWeight: 'bold' }
});