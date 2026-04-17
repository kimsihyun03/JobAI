import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function SignupScreen({ navigation }) {
  // 초기값을 빈 문자열로 설정하여 본인 정보가 뜨지 않게 합니다.
  const [info, setInfo] = useState({ name: '', email: '', password: '', major: '컴퓨터공학과' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>회원가입</Text>
      <TextInput style={styles.input} placeholder="이름을 입력하세요" onChangeText={(t) => setInfo({...info, name:t})} />
      <TextInput style={styles.input} placeholder="이메일 주소" onChangeText={(t) => setInfo({...info, email:t})} />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry onChangeText={(t) => setInfo({...info, password:t})} />
      <View style={styles.pickerBox}>
        <Picker selectedValue={info.major} onValueChange={(v) => setInfo({...info, major: v})}>
          <Picker.Item label="컴퓨터공학과" value="컴퓨터공학과" />
          <Picker.Item label="건축학과" value="건축학과" />
          <Picker.Item label="경영학과" value="경영학과" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ProfileSetup", { userInfo: info })}>
        <Text style={styles.btnText}>다음 단계로</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, backgroundColor: '#fff', flexGrow: 1 },
  logo: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#F3F4F6', padding: 15, borderRadius: 10, marginBottom: 15 },
  pickerBox: { backgroundColor: '#F3F4F6', borderRadius: 10, marginBottom: 20 },
  btn: { backgroundColor: '#1E40AF', padding: 18, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});