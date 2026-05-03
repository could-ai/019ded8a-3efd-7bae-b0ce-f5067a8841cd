import { create } from 'zustand';

export type UserType = 'elderly' | 'family' | null;

export interface SensorData {
  temperature: number;
  humidity: number;
  motion: boolean;
  airQuality: number;
}

export interface Alert {
  id: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
}

export interface AppState {
  userType: UserType;
  sensorData: SensorData;
  alerts: Alert[];
  reminders: string[];
  conversationHistory: string[];
  setUserType: (type: UserType) => void;
  updateSensorData: (data: Partial<SensorData>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  addReminder: (reminder: string) => void;
  addConversation: (message: string) => void;
}

export const useStore = create<AppState>((set) => ({
  userType: null,
  sensorData: {
    temperature: 22,
    humidity: 45,
    motion: false,
    airQuality: 98,
  },
  alerts: [],
  reminders: [],
  conversationHistory: [],
  
  setUserType: (type) => set({ userType: type }),
  
  updateSensorData: (data) => set((state) => ({
    sensorData: { ...state.sensorData, ...data }
  })),
  
  addAlert: (alert) => set((state) => ({
    alerts: [{
      ...alert,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now()
    }, ...state.alerts]
  })),
  
  addReminder: (reminder) => set((state) => ({
    reminders: [...state.reminders, reminder]
  })),
  
  addConversation: (message) => set((state) => ({
    conversationHistory: [...state.conversationHistory, message]
  }))
}));
