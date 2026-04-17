import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { chatWithAI } from './api';

export default function ChatScreen({ route }) {
  const { major } = route.params || { major: "전공 미지정" };
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const onSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputText("");

    try {
      const data = await chatWithAI(inputText, major);
      const aiMessage = { id: Date.now() + 1, text: data.answer, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      alert("AI와 연결할 수 없습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{major} 취업 상담소</Text>
      <ScrollView style={styles.chatBox}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.bubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput 
            style={styles.input} 
            value={inputText} 
            onChangeText={setInputText} 
            placeholder="고민을 말씀해주세요..." 
        />
        <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
          <Text style={{color: '#fff'}}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1E40AF' },
  chatBox: { flex: 1 },
  bubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#1E40AF' },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#E5E7EB' },
  msgText: { color: '#333' },
  inputArea: { flexDirection: 'row', padding: 10 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, borderWidth: 1, borderColor: '#ddd' },
  sendBtn: { marginLeft: 10, backgroundColor: '#1E40AF', padding: 12, borderRadius: 20 }
});