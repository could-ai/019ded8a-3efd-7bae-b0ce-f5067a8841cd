import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore } from '../../store/useStore';

export const TimelineScreen = () => {
  const conversationHistory = useStore((state) => state.conversationHistory);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity Timeline</Text>
      <FlatList
        data={conversationHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No activity recorded yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  item: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10 },
  text: { fontSize: 16, color: '#333' },
  empty: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
});
