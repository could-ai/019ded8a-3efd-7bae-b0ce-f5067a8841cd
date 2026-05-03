import 'package:flutter/material.dart';
import '../../services/mock_hardware_service.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;
  final MockHardwareService _hardwareService = MockHardwareService();

  @override
  void initState() {
    super.initState();
    _hardwareService.start();
  }

  @override
  void dispose() {
    _hardwareService.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Family Dashboard'),
        backgroundColor: Colors.blueAccent,
        foregroundColor: Colors.white,
      ),
      body: _buildBody(),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Environment'),
          NavigationDestination(icon: Icon(Icons.favorite_outline), label: 'Wellbeing'),
          NavigationDestination(icon: Icon(Icons.list_alt), label: 'Activity'),
          NavigationDestination(icon: Icon(Icons.notifications_none), label: 'Alerts'),
          NavigationDestination(icon: Icon(Icons.touch_app_outlined), label: 'Actions'),
        ],
      ),
    );
  }

  Widget _buildBody() {
    switch (_currentIndex) {
      case 0:
        return _buildEnvironmentPanel();
      case 1:
        return const Center(child: Text('Wellbeing & Mood Tracking', style: TextStyle(fontSize: 20)));
      case 2:
        return const Center(child: Text('Activity Timeline', style: TextStyle(fontSize: 20)));
      case 3:
        return const Center(child: Text('Alerts & Notifications', style: TextStyle(fontSize: 20)));
      case 4:
        return const Center(child: Text('Remote Actions', style: TextStyle(fontSize: 20)));
      default:
        return const SizedBox();
    }
  }

  Widget _buildEnvironmentPanel() {
    return StreamBuilder<Map<String, dynamic>>(
      stream: _hardwareService.sensorStream,
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final data = snapshot.data!;
        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const Text(
              'Live Environment',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            GridView.count(
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildSensorCard('Temperature', '🌡️', '${data["temp"].toStringAsFixed(1)}°C', data["temp"] > 35 ? Colors.red : Colors.green),
                _buildSensorCard('Humidity', '💧', '${data["humidity"]}%', Colors.green),
                _buildSensorCard('Motion', '🚶', data["motion"] ? 'Active' : 'No Motion', data["motion"] ? Colors.green : Colors.orange),
                _buildSensorCard('Air Quality', '💨', data["gas"] > 0.5 ? 'Alert' : 'Clear', data["gas"] > 0.5 ? Colors.red : Colors.green),
              ],
            ),
            const SizedBox(height: 24),
            const Text(
              'Biometrics',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            GridView.count(
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildSensorCard('Heart Rate', '❤️', '${data["hr"]} bpm', (data["hr"] < 50 || data["hr"] > 110) ? Colors.red : Colors.green),
                _buildSensorCard('SpO2', '🩸', '${data["spo2"]}%', data["spo2"] < 92 ? Colors.red : Colors.green),
              ],
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                _hardwareService.triggerPanic();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.redAccent,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.all(16),
              ),
              child: const Text('Simulate Panic Button'),
            )
          ],
        );
      },
    );
  }

  Widget _buildSensorCard(String title, String emoji, String value, Color statusColor) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(emoji, style: const TextStyle(fontSize: 32)),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontSize: 16, color: Colors.black54)),
            const SizedBox(height: 8),
            Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: statusColor.withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                statusColor == Colors.green ? 'Normal' : 'Check',
                style: TextStyle(color: statusColor, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
