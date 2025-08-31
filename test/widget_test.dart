import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:kktime/main.dart';

void main() {
  testWidgets('KKTime app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const KKTimeApp());

    // Verify that the app title is displayed
    expect(find.text('KKTime - Time Tracker'), findsOneWidget);
    
    // Verify that the welcome message is displayed
    expect(find.text('Welcome to KKTime'), findsOneWidget);
    
    // Verify that the floating action button is present
    expect(find.byType(FloatingActionButton), findsOneWidget);
    
    // Tap the floating action button and verify snackbar appears
    await tester.tap(find.byType(FloatingActionButton));
    await tester.pump();
    
    expect(find.text('Time tracking feature coming soon!'), findsOneWidget);
  });

  testWidgets('App theme and basic UI elements test', (WidgetTester tester) async {
    await tester.pumpWidget(const KKTimeApp());

    // Verify timer icon is displayed
    expect(find.byIcon(Icons.timer), findsOneWidget);
    
    // Verify app uses Material 3 design
    final MaterialApp app = tester.widget(find.byType(MaterialApp));
    expect(app.theme?.useMaterial3, isTrue);
    
    // Verify app title configuration
    expect(app.title, 'KKTime');
    expect(app.debugShowCheckedModeBanner, isFalse);
  });
}