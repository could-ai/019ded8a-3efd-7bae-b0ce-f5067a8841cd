import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '../../store/useStore';

export const ActionsScreen = () => {
  const setUserType = useStore((state) => state.setUserType);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Remote Actions</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Reminder</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => setUserType(null)}>
        <Text style={styles.buttonText}>Switch Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  button: {
    backgroundColor: '#1E88E5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#757575',
    marginTop: 20,
  },
  buttonText: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
});
