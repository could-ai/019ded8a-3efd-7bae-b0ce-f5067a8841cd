import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RoleSelectionScreen = () => {
  const setUserType = useStore((state) => state.setUserType);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to JADAI</Text>
      <Text style={styles.subtitle}>Please select your interface</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.elderlyButton]} 
          onPress={() => setUserType('elderly')}
        >
          <Text style={styles.buttonText}>Elderly Companion</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.familyButton]} 
          onPress={() => setUserType('family')}
        >
          <Text style={styles.buttonText}>Family Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  elderlyButton: {
    backgroundColor: '#FF8A65',
  },
  familyButton: {
    backgroundColor: '#4DB6AC',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
  },
});
