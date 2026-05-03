import { useStore } from '../store/useStore';

class MockSensorService {
  private intervalId: NodeJS.Timeout | null = null;

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      const currentData = useStore.getState().sensorData;
      
      // Simulate slight variations
      const newData = {
        temperature: Math.max(18, Math.min(30, currentData.temperature + (Math.random() * 0.4 - 0.2))),
        humidity: Math.max(30, Math.min(60, currentData.humidity + (Math.random() * 2 - 1))),
        motion: Math.random() > 0.8,
        airQuality: Math.max(50, Math.min(100, currentData.airQuality + (Math.random() * 4 - 2))),
      };

      // Rounding
      newData.temperature = parseFloat(newData.temperature.toFixed(1));
      newData.humidity = Math.round(newData.humidity);
      newData.airQuality = Math.round(newData.airQuality);

      useStore.getState().updateSensorData(newData);

      // Check for alerts
      if (newData.temperature > 28) {
        useStore.getState().addAlert({ level: 'warning', message: 'High temperature detected' });
      }
      
    }, 3000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const sensorService = new MockSensorService();
