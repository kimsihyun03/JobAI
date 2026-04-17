import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("알림", "이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {

// LoginScreen.js 16번 줄 근처
const response = await fetch("http://127.0.0.1:8000/login" , {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: email, password: password }),
});

      const data = await response.json();

      if (response.ok && data.status === "success") {
        console.log("로그인 성공!");
        navigation.navigate("Dashboard", { major: "컴퓨터공학과" }); // 기본 학과 설정
      } else {
        Alert.alert("실패", "아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      Alert.alert("서버 연결 실패", "백엔드 서버가 켜져 있는지 확인하세요. (localhost:8000)");
      
      // 테스트용: 서버가 없어도 강제로 넘어가고 싶다면 아래 주석을 해제하세요.
      // navigation.navigate("Dashboard", { major: "컴퓨터공학과" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>JobAI</Text>
      <Text style={styles.subtitle}>취업의 길을 AI와 함께 시작하세요</Text>

      <TextInput 
        style={styles.input} 
        placeholder="이메일 주소" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>계정이 없으신가요? 회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30, backgroundColor: "#fff" },
  logo: { fontSize: 40, fontWeight: "bold", color: "#1E40AF", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 40 },
  input: { backgroundColor: "#F3F4F6", padding: 15, borderRadius: 10, marginBottom: 15 },
  loginBtn: { backgroundColor: "#1E40AF", padding: 18, borderRadius: 10, alignItems: "center", marginTop: 10 },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  signupText: { textAlign: "center", color: "#1E40AF", marginTop: 20 }
});