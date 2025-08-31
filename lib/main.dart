import 'package:flutter/material.dart';

void main() {
  runApp(const KKTimeApp());
}

class KKTimeApp extends StatelessWidget {
  const KKTimeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KKTime - Responsive Time Tracker',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const ResponsiveHomePage(),
    );
  }
}

class ResponsiveHomePage extends StatefulWidget {
  const ResponsiveHomePage({super.key});

  @override
  State<ResponsiveHomePage> createState() => _ResponsiveHomePageState();
}

class _ResponsiveHomePageState extends State<ResponsiveHomePage> {
  int _selectedIndex = 0;

  final List<String> _timeEntries = [
    'Project A - 2h 30m',
    'Meeting - 1h 15m',
    'Code Review - 45m',
    'Documentation - 1h 20m',
    'Bug Fixes - 3h 10m',
    'Planning - 1h 5m',
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= ScreenBreakpoints.desktop) {
          return _buildDesktopLayout();
        } else if (constraints.maxWidth >= ScreenBreakpoints.tablet) {
          return _buildTabletLayout();
        } else {
          return _buildMobileLayout();
        }
      },
    );
  }

  Widget _buildDesktopLayout() {
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _selectedIndex,
            onDestinationSelected: (index) {
              setState(() {
                _selectedIndex = index;
              });
            },
            labelType: NavigationRailLabelType.all,
            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.timer),
                label: Text('Timer'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.history),
                label: Text('History'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.analytics),
                label: Text('Reports'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.settings),
                label: Text('Settings'),
              ),
            ],
          ),
          const VerticalDivider(thickness: 1, width: 1),
          Expanded(
            child: _buildMainContent(isDesktop: true),
          ),
        ],
      ),
    );
  }

  Widget _buildTabletLayout() {
    return Scaffold(
      appBar: AppBar(
        title: const Text('KKTime'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: _buildMainContent(isDesktop: false),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.timer),
            label: 'Timer',
          ),
          NavigationDestination(
            icon: Icon(Icons.history),
            label: 'History',
          ),
          NavigationDestination(
            icon: Icon(Icons.analytics),
            label: 'Reports',
          ),
          NavigationDestination(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }

  Widget _buildMobileLayout() {
    return Scaffold(
      appBar: AppBar(
        title: const Text('KKTime'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.deepPurple,
              ),
              child: Text(
                'KKTime',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.timer),
              title: const Text('Timer'),
              selected: _selectedIndex == 0,
              onTap: () {
                setState(() {
                  _selectedIndex = 0;
                });
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.history),
              title: const Text('History'),
              selected: _selectedIndex == 1,
              onTap: () {
                setState(() {
                  _selectedIndex = 1;
                });
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.analytics),
              title: const Text('Reports'),
              selected: _selectedIndex == 2,
              onTap: () {
                setState(() {
                  _selectedIndex = 2;
                });
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              selected: _selectedIndex == 3,
              onTap: () {
                setState(() {
                  _selectedIndex = 3;
                });
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body: _buildMainContent(isDesktop: false),
    );
  }

  Widget _buildMainContent({required bool isDesktop}) {
    return ResponsivePadding(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ResponsiveSpacing.vertical(),
          Text(
            'Welcome to KKTime',
            style: ResponsiveText.getHeadlineStyle(context),
          ),
          ResponsiveSpacing.vertical(),
          _buildTimerCard(),
          ResponsiveSpacing.vertical(),
          Text(
            'Recent Time Entries',
            style: ResponsiveText.getTitleStyle(context),
          ),
          ResponsiveSpacing.vertical(factor: 0.5),
          Expanded(
            child: _buildTimeEntriesList(isDesktop: isDesktop),
          ),
        ],
      ),
    );
  }

  Widget _buildTimerCard() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth > ScreenBreakpoints.tablet;
        
        return Card(
          elevation: 4,
          child: Padding(
            padding: ResponsivePadding.getContentPadding(),
            child: Column(
              children: [
                Text(
                  '00:00:00',
                  style: ResponsiveText.getTimerStyle(context),
                ),
                ResponsiveSpacing.vertical(factor: 0.5),
                if (isWide)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: _buildTimerButtons(),
                  )
                else
                  Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: _buildTimerButtons().take(2).toList(),
                      ),
                      ResponsiveSpacing.vertical(factor: 0.25),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: _buildTimerButtons().skip(2).toList(),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        );
      },
    );
  }

  List<Widget> _buildTimerButtons() {
    return [
      ElevatedButton.icon(
        onPressed: () {},
        icon: const Icon(Icons.play_arrow),
        label: const Text('Start'),
      ),
      ElevatedButton.icon(
        onPressed: () {},
        icon: const Icon(Icons.pause),
        label: const Text('Pause'),
      ),
      ElevatedButton.icon(
        onPressed: () {},
        icon: const Icon(Icons.stop),
        label: const Text('Stop'),
      ),
      ElevatedButton.icon(
        onPressed: () {},
        icon: const Icon(Icons.refresh),
        label: const Text('Reset'),
      ),
    ];
  }

  Widget _buildTimeEntriesList({required bool isDesktop}) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final crossAxisCount = ResponsiveGrid.getCrossAxisCount(constraints.maxWidth);
        
        if (crossAxisCount == 1) {
          return ListView.builder(
            itemCount: _timeEntries.length,
            itemBuilder: (context, index) {
              return Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: ListTile(
                  leading: const Icon(Icons.access_time),
                  title: Text(_timeEntries[index]),
                  trailing: IconButton(
                    icon: const Icon(Icons.more_vert),
                    onPressed: () {},
                  ),
                ),
              );
            },
          );
        } else {
          return GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: crossAxisCount,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 3,
            ),
            itemCount: _timeEntries.length,
            itemBuilder: (context, index) {
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      const Icon(Icons.access_time),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          _timeEntries[index],
                          style: const TextStyle(fontWeight: FontWeight.w500),
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.more_vert),
                        onPressed: () {},
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        }
      },
    );
  }
}

// Responsive Design Utilities
class ScreenBreakpoints {
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
}

class ResponsivePadding extends StatelessWidget {
  final Widget child;

  const ResponsivePadding({super.key, required this.child});

  static EdgeInsets getContentPadding() {
    return const EdgeInsets.all(16);
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double horizontalPadding;
        
        if (constraints.maxWidth >= ScreenBreakpoints.desktop) {
          horizontalPadding = 32;
        } else if (constraints.maxWidth >= ScreenBreakpoints.tablet) {
          horizontalPadding = 24;
        } else {
          horizontalPadding = 16;
        }

        return Padding(
          padding: EdgeInsets.symmetric(
            horizontal: horizontalPadding,
            vertical: 16,
          ),
          child: child,
        );
      },
    );
  }
}

class ResponsiveSpacing {
  static Widget vertical({double factor = 1.0}) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double spacing;
        
        if (constraints.maxWidth >= ScreenBreakpoints.desktop) {
          spacing = 24 * factor;
        } else if (constraints.maxWidth >= ScreenBreakpoints.tablet) {
          spacing = 20 * factor;
        } else {
          spacing = 16 * factor;
        }

        return SizedBox(height: spacing);
      },
    );
  }
}

class ResponsiveText {
  static TextStyle getHeadlineStyle(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    if (screenWidth >= ScreenBreakpoints.desktop) {
      return Theme.of(context).textTheme.headlineLarge!;
    } else if (screenWidth >= ScreenBreakpoints.tablet) {
      return Theme.of(context).textTheme.headlineMedium!;
    } else {
      return Theme.of(context).textTheme.headlineSmall!;
    }
  }

  static TextStyle getTitleStyle(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    if (screenWidth >= ScreenBreakpoints.desktop) {
      return Theme.of(context).textTheme.titleLarge!;
    } else {
      return Theme.of(context).textTheme.titleMedium!;
    }
  }

  static TextStyle getTimerStyle(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    if (screenWidth >= ScreenBreakpoints.desktop) {
      return Theme.of(context).textTheme.displayLarge!.copyWith(
        fontWeight: FontWeight.bold,
        color: Theme.of(context).colorScheme.primary,
      );
    } else if (screenWidth >= ScreenBreakpoints.tablet) {
      return Theme.of(context).textTheme.displayMedium!.copyWith(
        fontWeight: FontWeight.bold,
        color: Theme.of(context).colorScheme.primary,
      );
    } else {
      return Theme.of(context).textTheme.displaySmall!.copyWith(
        fontWeight: FontWeight.bold,
        color: Theme.of(context).colorScheme.primary,
      );
    }
  }
}

class ResponsiveGrid {
  static int getCrossAxisCount(double width) {
    if (width >= ScreenBreakpoints.desktop) {
      return 3;
    } else if (width >= ScreenBreakpoints.tablet) {
      return 2;
    } else {
      return 1;
    }
  }
}