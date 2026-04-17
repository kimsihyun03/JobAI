import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

export default function Dashboard({ route, navigation }) {
  const { major } = route.params || { major: "건축학과" };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>취업 AI 도우미</Text>
        <Text style={styles.userName}>김시현님 · {major}</Text>
      </View>

      <View style={styles.mainSection}>
        <Text style={styles.mainTitle}>2026년 4월 취업 시장 동향</Text>
        <Text style={styles.mainSubtitle}>AI로 인한 산업 재편, 새로운 직무 기회 확대</Text>

        <View style={styles.statRow}>
          <View style={styles.statBox}><Text style={styles.statLabel}>채용 공고</Text><Text style={styles.statVal}>12,543</Text><Text style={{color: 'green'}}>↗ +8.2%</Text></View>
          <View style={styles.statBox}><Text style={styles.statLabel}>평균 연봉</Text><Text style={styles.statVal}>4,250만원</Text><Text style={{color: 'green'}}>↗ +3.5%</Text></View>
          <View style={styles.statBox}><Text style={styles.statLabel}>경쟁률</Text><Text style={styles.statVal}>15.3:1</Text><Text style={{color: 'red'}}>↘ -2.1%</Text></View>
        </View>

        <View style={styles.trendCard}>
          <Text style={styles.cardTitle}>주요 동향 분석</Text>
          <Text style={styles.bullet}>• AI 관련 직무 전 산업군에서 수요 증가</Text>
          <Text style={styles.bullet}>• 전공 무관 채용 확대, 역량 중심 평가</Text>
          <TouchableOpacity style={styles.aiBtn} onPress={() => navigation.navigate("Chat", { major })}>
            <Text style={{color: '#2563EB'}}>💬 AI 상담 시작하기</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>📰 최신 취업 뉴스</Text>
        <View style={styles.newsBox}>
          <Text style={styles.newsTitle}>AI 시대, 비전공자도 개발자로 전환 가능</Text>
          <Text style={styles.newsDate}>2026.04.10</Text>
        </View>
        <View style={styles.newsBox}>
          <Text style={styles.newsTitle}>스타트업 채용 시장 활황, 대기업 못지않은 처우</Text>
          <Text style={styles.newsDate}>2026.04.09</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
  logo: { fontSize: 20, fontWeight: 'bold' },
  userName: { color: '#666' },
  mainSection: { padding: 20 },
  mainTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 10 },
  mainSubtitle: { fontSize: 18, color: '#666', marginBottom: 30 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statBox: { backgroundColor: '#F9FAFB', padding: 15, borderRadius: 15, width: '31%' },
  statLabel: { color: '#666', marginBottom: 5 },
  statVal: { fontSize: 18, fontWeight: 'bold' },
  trendCard: { backgroundColor: '#2563EB', padding: 25, borderRadius: 20, marginBottom: 30 },
  cardTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  bullet: { color: '#fff', fontSize: 16, marginBottom: 10 },
  aiBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 10, alignSelf: 'flex-start', marginTop: 10 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  newsBox: { paddingVertical: 20, borderBottomWidth: 1, borderColor: '#eee' },
  newsTitle: { fontSize: 17, fontWeight: '600', marginBottom: 5 },
  newsDate: { color: '#999' }
});