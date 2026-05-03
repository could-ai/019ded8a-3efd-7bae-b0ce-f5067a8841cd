import 'package:flutter/material.dart';
import '../../theme/jadai_theme.dart';

class CompanionScreen extends StatefulWidget {
  const CompanionScreen({super.key});

  @override
  State<CompanionScreen> createState() => _CompanionScreenState();
}

class _CompanionScreenState extends State<CompanionScreen> with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _scaleAnimation;
  late Animation<Color?> _colorAnimation;

  String _currentGreeting = "Good morning Hedi,\nhow are you feeling today?";
  bool _isListening = false;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    _colorAnimation = ColorTween(
      begin: JadaiTheme.orangeAccent.withOpacity(0.6),
      end: JadaiTheme.orangeAccent,
    ).animate(_pulseController);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _toggleListening() {
    setState(() {
      _isListening = !_isListening;
      if (_isListening) {
        _pulseController.duration = const Duration(milliseconds: 500);
        _pulseController.repeat(reverse: true);
        _currentGreeting = "Listening...";
      } else {
        _pulseController.duration = const Duration(seconds: 2);
        _pulseController.repeat(reverse: true);
        _currentGreeting = "I'm here for you.";
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: JadaiTheme.creamBackground,
      body: SafeArea(
        child: Column(
          children: [
            const Spacer(),
            // Greeting Text
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Text(
                _currentGreeting,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                  height: 1.3,
                ),
              ),
            ),
            const Spacer(),
            // Animated Orb
            GestureDetector(
              onTap: _toggleListening,
              child: AnimatedBuilder(
                animation: _pulseController,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _scaleAnimation.value,
                    child: Container(
                      width: 200,
                      height: 200,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: _colorAnimation.value,
                        boxShadow: [
                          BoxShadow(
                            color: _colorAnimation.value!.withOpacity(0.4),
                            blurRadius: 40,
                            spreadRadius: 20,
                          )
                        ],
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.mic_none,
                          size: 64,
                          color: Colors.white70,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const Spacer(flex: 2),
            // Shortcut Buttons
            Padding(
              padding: const EdgeInsets.only(bottom: 32.0, left: 16.0, right: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildShortcutBtn(Icons.phone, "Call Family", Colors.green),
                  _buildShortcutBtn(Icons.alarm, "Reminders", Colors.blue),
                  _buildShortcutBtn(Icons.sos, "Help", Colors.red),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildShortcutBtn(IconData icon, String label, Color color) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            shape: const CircleBorder(),
            padding: const EdgeInsets.all(24),
            backgroundColor: color.withOpacity(0.1),
            foregroundColor: color,
            elevation: 0,
          ),
          child: Icon(icon, size: 36),
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
        ),
      ],
    );
  }
}
