import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:kktime/main.dart';

void main() {
  group('Responsive Design Tests', () {
    testWidgets('App should display timer card on all screen sizes', (WidgetTester tester) async {
      await tester.pumpWidget(const KKTimeApp());
      
      // Check if timer card is present
      expect(find.text('00:00:00'), findsOneWidget);
      expect(find.text('Start'), findsOneWidget);
      expect(find.text('Pause'), findsOneWidget);
      expect(find.text('Stop'), findsOneWidget);
      expect(find.text('Reset'), findsOneWidget);
    });

    testWidgets('Mobile layout should show drawer', (WidgetTester tester) async {
      // Set mobile screen size
      tester.binding.window.physicalSizeTestValue = const Size(400, 800);
      tester.binding.window.devicePixelRatioTestValue = 1.0;
      
      await tester.pumpWidget(const KKTimeApp());
      
      // Check if drawer is present (AppBar with hamburger menu)
      expect(find.byType(AppBar), findsOneWidget);
      expect(find.byType(Drawer), findsOneWidget);
    });

    testWidgets('Desktop layout should show navigation rail', (WidgetTester tester) async {
      // Set desktop screen size
      tester.binding.window.physicalSizeTestValue = const Size(1400, 800);
      tester.binding.window.devicePixelRatioTestValue = 1.0;
      
      await tester.pumpWidget(const KKTimeApp());
      await tester.pumpAndSettle();
      
      // Check if navigation rail is present
      expect(find.byType(NavigationRail), findsOneWidget);
      expect(find.byType(AppBar), findsNothing); // No app bar in desktop layout
    });

    testWidgets('Tablet layout should show bottom navigation', (WidgetTester tester) async {
      // Set tablet screen size
      tester.binding.window.physicalSizeTestValue = const Size(800, 600);
      tester.binding.window.devicePixelRatioTestValue = 1.0;
      
      await tester.pumpWidget(const KKTimeApp());
      await tester.pumpAndSettle();
      
      // Check if bottom navigation is present
      expect(find.byType(NavigationBar), findsOneWidget);
      expect(find.byType(AppBar), findsOneWidget);
    });

    testWidgets('ResponsiveGrid should return correct cross axis count', (WidgetTester tester) async {
      // Test grid responsiveness
      expect(ResponsiveGrid.getCrossAxisCount(400), equals(1)); // Mobile
      expect(ResponsiveGrid.getCrossAxisCount(800), equals(2)); // Tablet
      expect(ResponsiveGrid.getCrossAxisCount(1400), equals(3)); // Desktop
    });

    testWidgets('Time entries should display in list format on mobile', (WidgetTester tester) async {
      // Set mobile screen size
      tester.binding.window.physicalSizeTestValue = const Size(400, 800);
      tester.binding.window.devicePixelRatioTestValue = 1.0;
      
      await tester.pumpWidget(const KKTimeApp());
      await tester.pumpAndSettle();
      
      // Check if ListView is used for mobile
      expect(find.byType(ListView), findsOneWidget);
      expect(find.text('Project A - 2h 30m'), findsOneWidget);
    });

    testWidgets('Time entries should display in grid format on desktop', (WidgetTester tester) async {
      // Set desktop screen size
      tester.binding.window.physicalSizeTestValue = const Size(1400, 800);
      tester.binding.window.devicePixelRatioTestValue = 1.0;
      
      await tester.pumpWidget(const KKTimeApp());
      await tester.pumpAndSettle();
      
      // Check if GridView is used for desktop
      expect(find.byType(GridView), findsOneWidget);
      expect(find.text('Project A - 2h 30m'), findsOneWidget);
    });
  });
}