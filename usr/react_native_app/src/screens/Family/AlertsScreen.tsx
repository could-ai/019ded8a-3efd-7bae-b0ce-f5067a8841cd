import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore } from '../../store/useStore';

export const AlertsScreen = () => {
  const alerts = useStore((state) => state.alerts);

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical': return '#E53935';
      case 'warning': return '#FB8C00';
      case 'info': return '#1E88E5';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { borderLeftColor: getAlertColor(item.level) }]}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No alerts at this time.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  item: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10,
    borderLeftWidth: 6,
    elevation: 1,
  },
  message: { fontSize: 16, color: '#333', fontWeight: '500' },
  time: { fontSize: 12, color: '#999', marginTop: 5 },
  empty: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
});
