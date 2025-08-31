# Development Setup Guide

This guide will help you set up the development environment for KKTime.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Tools
- **Git** - Version control
- **Flutter SDK** (latest stable version) - For frontend development
- **Dart SDK** (comes with Flutter)
- **Node.js** (LTS version) - For backend development
- **npm** or **yarn** - Package manager for Node.js

### Recommended Tools
- **VS Code** with Flutter and Dart extensions
- **Android Studio** (for Android development)
- **Xcode** (for iOS development on macOS)
- **Postman** or similar tool for API testing

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/abdalabaaji/kktime.git
cd kktime
```

### 2. Verify Flutter Installation
```bash
flutter doctor
```
This command checks your environment and displays a report of the status of your Flutter installation.

### 3. Verify Node.js Installation
```bash
node --version
npm --version
```

## Development Workflow

### Frontend Development (Flutter)
*Instructions will be added when the Flutter project is initialized*

1. Navigate to the frontend directory (when created)
2. Install dependencies: `flutter pub get`
3. Run the app: `flutter run`

### Backend Development (Node.js)
*Instructions will be added when the backend project is initialized*

1. Navigate to the backend directory (when created)
2. Install dependencies: `npm install`
3. Set up environment variables: Copy `.env.example` to `.env`
4. Start the development server: `npm run dev`

## Project Structure

See [STRUCTURE.md](STRUCTURE.md) for detailed information about the project organization.

## Common Issues and Solutions

### Flutter Issues
- **Issue**: `flutter doctor` shows issues
- **Solution**: Follow the recommendations provided by the doctor command

### Node.js Issues
- **Issue**: Permission errors when installing packages
- **Solution**: Use a Node version manager like nvm

## Contributing

1. Create a feature branch from main
2. Make your changes
3. Test your changes thoroughly
4. Submit a pull request

## Getting Help

If you encounter issues:
1. Check this guide first
2. Search existing issues on GitHub
3. Create a new issue with detailed information

---

*This guide will be updated as the project develops*