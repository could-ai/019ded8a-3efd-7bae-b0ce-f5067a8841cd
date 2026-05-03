# JADAI — Just A Dedicated AI (Elderly Companion System)

JADAI is a comprehensive elderly companion system and family dashboard built with Flutter. It consists of two main "faces" within a single app: a serene, distraction-free voice interface for the elderly person, and a detailed monitoring dashboard for family members. 

## Product Overview

The core concept is to provide a non-intrusive companion device that sits in an elderly person's home. The JADAI app connects to a hardware hub (e.g. Arduino via USB OTG) that reads environment and biometric sensors. The app runs AI models locally to process voice commands, answer questions, trigger actions, and analyze the user's wellbeing.

Family members log in with a different role to view the "Child Dashboard" – a real-time monitor showing sensor data, mood tracking, activity logs, alerts, and remote actions without needing an AI model loaded on their own devices.

## Complete Feature List

* **Role Selection:** Start the app as an "Elderly Companion" or a "Family Dashboard".
* **Elderly Companion UI:**
  * Clean, warm, large-text UI with no complicated menus.
  * Central animated "orb" that pulses and reacts to voice interaction.
  * Shortcut buttons for quick actions (Call Family, Reminders, SOS).
* **Family Dashboard:**
  * **Environment Panel:** Live sensor readings (Temperature, Humidity, Motion, Air Quality, Heart Rate, SpO2) and an interactive mock panic simulation.
  * **Wellbeing & Mood (Mocked):** Real-time mood analysis derived from conversations.
  * **Activity Timeline (Mocked):** Scrollable chronological event log.
  * **Alerts Panel (Mocked):** Safety and environment anomaly notifications.
  * **Remote Actions (Mocked):** Capability to send voice notes or reminders.
* **Mock Hardware Service:** Internal Dart stream service simulating realistic Arduino sensor updates.

## Main User Flows

1. **Role Setup:** On app launch, the user chooses between the Elderly UI and the Family Dashboard.
2. **Elderly Interaction:** The elderly user views the calm glowing orb. Tapping it mimics activating a voice interaction (animations and UI states respond). Quick shortcuts are available at the bottom.
3. **Family Monitoring:** The child views the Environment tab. Live mock sensor data streams onto visually coded cards. A "Simulate Panic Button" tests the threshold coloring (cards turn red if values go out of bounds).

## Tech Stack

* **Frontend:** Flutter & Dart
* **State Management & Routing:** Built-in Flutter (`setState` and `Navigator`)
* **Simulated Hardware:** Internal Dart Streams & Timers (`MockHardwareService`)
* **Target Platforms:** iOS, Android, macOS, Windows, Linux, and Web

## Setup / Run Instructions

Ensure you have Flutter installed, then run the following commands:

```bash
# Fetch dependencies
flutter pub get

# Run the app on your preferred target device/simulator
flutter run
```

*Note: The hardware sensors and AI components are currently mocked by `MockHardwareService` for development purposes. Real device integration requires the respective hardware and native plugins.*

## Deployment Notes

Currently, all mock processes run locally within the application. For the production release, the app will integrate with:
* Native bindings for `llama.cpp` to run local LLMs.
* `vosk` / `piper_tts` for voice interaction.
* `usb_serial` for Arduino connectivity.
* A cloud relay (e.g., Firebase) to synchronize real-time alerts to the child app.

---

## About CouldAI

This app was generated with [CouldAI](https://could.ai), the AI app builder for cross-platform apps. CouldAI turns prompts into real native iOS, Android, Web, and Desktop apps with autonomous AI agents that architect, build, test, deploy, and iterate production-ready applications.
