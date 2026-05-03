import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';

export const EnvironmentScreen = () => {
  const sensorData = useStore((state) => state.sensorData);

  const renderCard = (title: string, value: string | number, unit: string) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Home Environment</Text>
      <View style={styles.grid}>
        {renderCard('Temperature', sensorData.temperature, '°C')}
        {renderCard('Humidity', sensorData.humidity, '%')}
        {renderCard('Air Quality', sensorData.airQuality, 'AQI')}
        <View style={[styles.card, sensorData.motion ? styles.motionActive : null]}>
          <Text style={styles.cardTitle}>Motion</Text>
          <Text style={styles.cardValue}>{sensorData.motion ? 'Active' : 'Still'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  motionActive: {
    backgroundColor: '#E0F7FA',
  },
  cardTitle: { fontSize: 16, color: '#666', marginBottom: 10 },
  cardValue: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  cardUnit: { fontSize: 16, fontWeight: 'normal', color: '#666' },
});
