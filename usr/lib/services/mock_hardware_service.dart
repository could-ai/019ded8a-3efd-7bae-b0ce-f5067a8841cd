import 'dart:async';
import 'dart:convert';
import 'dart:math';

class MockHardwareService {
  static final MockHardwareService _instance = MockHardwareService._internal();
  factory MockHardwareService() => _instance;
  MockHardwareService._internal();

  final _controller = StreamController<Map<String, dynamic>>.broadcast();
  Timer? _timer;
  final Random _random = Random();

  Stream<Map<String, dynamic>> get sensorStream => _controller.stream;

  void start() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 3), (timer) {
      final packet = {
        "temp": 24.0 + _random.nextDouble() * 5.0, // 24-29
        "humidity": 40 + _random.nextInt(30), // 40-70
        "motion": _random.nextDouble() > 0.2, // 80% chance of motion
        "gas": 0.05 + _random.nextDouble() * 0.1,
        "sound_spike": _random.nextDouble() > 0.95, // 5% chance of loud noise
        "sound_db": 30 + _random.nextInt(40),
        "panic": false, // can mock a panic later
        "hr": 60 + _random.nextInt(30),
        "spo2": 95 + _random.nextInt(5),
        "ts": DateTime.now().millisecondsSinceEpoch ~/ 1000
      };
      _controller.add(packet);
    });
  }

  void stop() {
    _timer?.cancel();
  }
  
  void triggerPanic() {
    final packet = {
      "temp": 25.0,
      "humidity": 50,
      "motion": true,
      "gas": 0.1,
      "sound_spike": true,
      "sound_db": 80,
      "panic": true,
      "hr": 110,
      "spo2": 96,
      "ts": DateTime.now().millisecondsSinceEpoch ~/ 1000
    };
    _controller.add(packet);
  }
}
