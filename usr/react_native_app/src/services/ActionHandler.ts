import { Linking } from 'react-native';
import { useStore } from '../store/useStore';

export class ActionHandler {
  static parseCommand(text: string) {
    const callMatch = text.match(/\[CALL:\s*(.+?)\]/i);
    const reminderMatch = text.match(/\[REMINDER:\s*(.+?)\]/i);
    const sosMatch = text.match(/\[SOS\]/i);

    if (callMatch) {
      this.handleCall(callMatch[1]);
    } else if (reminderMatch) {
      this.handleReminder(reminderMatch[1]);
    } else if (sosMatch) {
      this.handleSOS();
    }
  }

  private static handleCall(name: string) {
    // Open dialer
    Linking.openURL(`tel:5550199`);
    useStore.getState().addConversation(`Calling ${name}...`);
  }

  private static handleReminder(text: string) {
    useStore.getState().addReminder(text);
    useStore.getState().addConversation(`Reminder set: ${text}`);
  }

  private static handleSOS() {
    useStore.getState().addAlert({
      level: 'critical',
      message: 'SOS triggered by companion app!',
    });
    useStore.getState().addConversation(`Emergency alert sent to family!`);
  }
}
