class AppConstants {
  // App Information
  static const String appName = 'KKTime';
  static const String appVersion = '1.0.0';
  
  // Time Formats
  static const String timeFormat = 'HH:mm:ss';
  static const String dateFormat = 'yyyy-MM-dd';
  static const String dateTimeFormat = 'yyyy-MM-dd HH:mm:ss';
  
  // Default Categories
  static const List<String> defaultCategories = [
    'Work',
    'Study',
    'Exercise',
    'Personal',
    'Meeting',
    'Break',
  ];
  
  // Colors
  static const Map<String, int> categoryColors = {
    'Work': 0xFF2196F3,      // Blue
    'Study': 0xFF4CAF50,     // Green
    'Exercise': 0xFFFF9800,  // Orange
    'Personal': 0xFF9C27B0,  // Purple
    'Meeting': 0xFFF44336,   // Red
    'Break': 0xFF607D8B,     // Blue Grey
  };
  
  // Storage Keys
  static const String timeEntriesKey = 'time_entries';
  static const String settingsKey = 'app_settings';
  
  // API Configuration (for future use)
  static const String baseUrl = 'https://api.kktime.app';
  static const Duration requestTimeout = Duration(seconds: 30);
}