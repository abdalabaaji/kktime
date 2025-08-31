import 'package:flutter/material.dart';
import '../models/time_entry.dart';
import '../utils/date_time_helper.dart';

class TimeEntryCard extends StatelessWidget {
  final TimeEntry timeEntry;
  final VoidCallback? onTap;
  final VoidCallback? onStop;

  const TimeEntryCard({
    super.key,
    required this.timeEntry,
    this.onTap,
    this.onStop,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 2,
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: timeEntry.isRunning 
              ? Colors.green 
              : Colors.grey,
          child: Icon(
            timeEntry.isRunning ? Icons.play_arrow : Icons.stop,
            color: Colors.white,
          ),
        ),
        title: Text(
          timeEntry.title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (timeEntry.description.isNotEmpty)
              Text(timeEntry.description),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(
                  Icons.access_time,
                  size: 16,
                  color: Colors.grey[600],
                ),
                const SizedBox(width: 4),
                Text(
                  DateTimeHelper.formatDuration(timeEntry.duration),
                  style: TextStyle(
                    color: Colors.grey[600],
                    fontSize: 12,
                  ),
                ),
                if (timeEntry.category != null) ...[
                  const SizedBox(width: 16),
                  Icon(
                    Icons.label,
                    size: 16,
                    color: Colors.grey[600],
                  ),
                  const SizedBox(width: 4),
                  Text(
                    timeEntry.category!,
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontSize: 12,
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
        trailing: timeEntry.isRunning && onStop != null
            ? IconButton(
                icon: const Icon(Icons.stop, color: Colors.red),
                onPressed: onStop,
                tooltip: 'Stop Timer',
              )
            : null,
        onTap: onTap,
      ),
    );
  }
}