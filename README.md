# KKTime - Time Tracking Mobile App

A Flutter-based mobile application for time tracking and productivity management.

## Features

- ⏱️ Time tracking with start/stop functionality
- 📊 Categorized time entries
- 📱 Cross-platform (iOS and Android)
- 🎨 Modern Material 3 design
- 🔄 State management with Riverpod

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── screens/                  # Screen widgets
│   └── home_screen.dart     # Home screen
├── widgets/                  # Reusable widgets
│   └── time_entry_card.dart # Time entry display widget
├── models/                   # Data models
│   └── time_entry.dart      # Time entry model
└── utils/                    # Utility functions
    ├── constants.dart        # App constants
    └── date_time_helper.dart # Date/time utilities
```

## Dependencies

- **flutter_riverpod**: State management
- **provider**: Alternative state management
- **http**: HTTP requests for API communication
- **cupertino_icons**: iOS-style icons

## Getting Started

### Prerequisites

- Flutter SDK (>=3.10.0)
- Dart SDK (>=3.0.0)
- Android Studio / Xcode for device testing

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdalabaaji/kktime.git
   cd kktime
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

### Running Tests

```bash
flutter test
```

### Building for Production

For Android:
```bash
flutter build apk --release
```

For iOS:
```bash
flutter build ios --release
```

## Development

### Code Style

This project follows Flutter's recommended linting rules with additional strict rules enabled in `analysis_options.yaml`.

### State Management

The app uses Flutter Riverpod for state management, providing a robust and scalable solution for managing app state.

### Architecture

The project follows a clean architecture pattern with separation of concerns:
- **Models**: Data structures and business logic
- **Screens**: UI screens and navigation
- **Widgets**: Reusable UI components
- **Utils**: Helper functions and constants

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code passes linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.