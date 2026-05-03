import React, { useEffect, useRef } from 'react';
import { ActionHandler } from '../../services/ActionHandler';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useStore } from '../../store/useStore';

export const CompanionScreen = () => {
  const setUserType = useStore((state) => state.setUserType);
  const breathAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breathAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [breathAnim]);

  const handleOrbPress = () => {
    // Mock STT -> AI -> TTS flow
    console.log("Orb pressed. Listening...");
    const DUMMY_COMMANDS = [
      '[REMINDER: Drink water in 10 minutes]',
      '[CALL: Family]',
      'Just chatting, no action needed.',
    ];
    const cmd = DUMMY_COMMANDS[Math.floor(Math.random() * DUMMY_COMMANDS.length)];
    useStore.getState().addConversation(`User asked something... AI responded: ${cmd}`);
    ActionHandler.parseCommand(cmd);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => setUserType(null)}
      >
        <Text style={styles.resetText}>Exit</Text>
      </TouchableOpacity>

      <View style={styles.orbContainer}>
        <TouchableOpacity onPress={handleOrbPress} activeOpacity={0.8}>
          <Animated.View style={[styles.orb, { transform: [{ scale: breathAnim }] }]} />
        </TouchableOpacity>
        <Text style={styles.greetingText}>Hello, I'm here for you.</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4DB6AC' }]}
          onPress={() => ActionHandler.parseCommand('[CALL: Family]')}
        >
          <Text style={styles.actionText}>Call Family</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FFB74D' }]}
          onPress={() => ActionHandler.parseCommand('[REMINDER: Daily check-in]')}
        >
          <Text style={styles.actionText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#E57373' }]}
          onPress={() => ActionHandler.parseCommand('[SOS]')}
        >
          <Text style={styles.actionText}>Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    justifyContent: 'space-between',
  },
  resetButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  resetText: {
    fontSize: 22,
    color: '#666',
  },
  orbContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orb: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FF8A65',
    shadowColor: '#FF8A65',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  greetingText: {
    marginTop: 40,
    fontSize: 28,
    color: '#333',
    fontWeight: '500',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 40,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
