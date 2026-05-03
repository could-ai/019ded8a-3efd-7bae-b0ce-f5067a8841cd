# JADAI — Just A Dedicated AI (Elderly Companion System)

JADAI is a comprehensive elderly companion system and family dashboard built with React Native. It consists of two main "faces" within a single app: a serene, distraction-free voice interface for the elderly person, and a detailed monitoring dashboard for family members.

## Product Overview

The core concept is to provide a non-intrusive companion device that sits in an elderly person's home. The JADAI app connects to a hardware hub (or mocked sensors) that reads environment and biometric sensors. The app manages simulated interactions, answering questions, triggering actions, and analyzing the user's wellbeing.

Family members log in with a different role to view the "Family Dashboard" – a real-time monitor showing sensor data, mood tracking, activity logs, alerts, and remote actions.

## Complete Feature List

* **Role Selection:** Start the app as an "Elderly Companion" or a "Family Dashboard".
* **Elderly Companion UI:**
  * Clean, warm, large-text UI with no complicated menus.
  * Central animated "orb" that breathes and reacts to interactions.
  * Shortcut buttons for quick actions (Call Family, Reminders, SOS).
* **Family Dashboard:**
  * **Environment Panel:** Live sensor readings (Temperature, Humidity, Light, Pressure, Heart Rate, SpO2) driven by an automated mock service.
  * **Timeline:** Scrollable chronological event log capturing interactions and reminders.
  * **Alerts Panel:** Safety and environment anomaly notifications.
  * **Actions:** Capability to set remote reminders and view contact options.
* **Mock Sensor & Action Handlers:** 
  * `MockSensorService` continuously pushes telemetry data into the global store.
  * `ActionHandler` parses mock text inputs (like `[CALL: Family]` or `[REMINDER: ...]`) into actionable system events.

## Main User Flows

1. **Role Setup:** On app launch, the user chooses between the Elderly UI and the Family Dashboard.
2. **Elderly Interaction:** The elderly user views the calm glowing orb. Pressing shortcuts instantly creates timeline logs, sends SOS alerts, or triggers simulated calls.
3. **Family Monitoring:** The family member navigates the bottom tab bar. They can view live streaming metrics on the Environment tab, read through the Timeline, or check the Alerts tab for critical notifications.

## Tech Stack

* **Frontend:** React Native (TypeScript) - Bare workflow
* **State Management:** Zustand
* **Routing:** React Navigation (Native Stack + Bottom Tabs)
* **Styling:** React Native StyleSheet
* **Simulated Hardware:** Internal TypeScript Services (`MockSensorService`, `ActionHandler`)
* **Target Platforms:** Android, iOS

## Setup / Run Instructions

Ensure you have Node.js, Watchman, and the React Native CLI setup for Android development.

```bash
cd react_native_app

# Install dependencies
npm install

# Run the app on Android
npx react-native run-android
```

*Note: The hardware sensors and interactions are currently mocked for development purposes.*

---

## About CouldAI

This app was generated with [CouldAI](https://could.ai), the AI app builder for cross-platform apps. CouldAI turns prompts into real native iOS, Android, Web, and Desktop apps with autonomous AI agents that architect, build, test, deploy, and iterate production-ready applications.
