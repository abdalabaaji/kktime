const TimeUtils = require('../../src/utils/time');

describe('TimeUtils', () => {
  describe('calculateDuration', () => {
    it('should calculate duration between two valid timestamps', () => {
      const startTime = '2023-01-01T09:00:00Z';
      const endTime = '2023-01-01T17:30:45Z';

      const duration = TimeUtils.calculateDuration(startTime, endTime);

      expect(duration.hours).toBe(8);
      expect(duration.minutes).toBe(30);
      expect(duration.seconds).toBe(45);
      expect(duration.formatted).toBe('08:30:45');
      expect(duration.totalHours).toBeCloseTo(8.5125, 4);
    });

    it('should handle Date objects as input', () => {
      const startTime = new Date('2023-01-01T10:00:00Z');
      const endTime = new Date('2023-01-01T12:00:00Z');

      const duration = TimeUtils.calculateDuration(startTime, endTime);

      expect(duration.hours).toBe(2);
      expect(duration.minutes).toBe(0);
      expect(duration.seconds).toBe(0);
      expect(duration.formatted).toBe('02:00:00');
    });

    it('should throw error for invalid date format', () => {
      expect(() => {
        TimeUtils.calculateDuration('invalid-date', '2023-01-01T17:00:00Z');
      }).toThrow('Invalid date format');
    });

    it('should throw error when end time is before start time', () => {
      const startTime = '2023-01-01T17:00:00Z';
      const endTime = '2023-01-01T09:00:00Z';

      expect(() => {
        TimeUtils.calculateDuration(startTime, endTime);
      }).toThrow('End time must be after start time');
    });

    it('should handle same start and end time', () => {
      const time = '2023-01-01T09:00:00Z';

      expect(() => {
        TimeUtils.calculateDuration(time, time);
      }).toThrow('End time must be after start time');
    });

    it('should calculate duration spanning multiple days', () => {
      const startTime = '2023-01-01T23:30:00Z';
      const endTime = '2023-01-02T01:45:00Z';

      const duration = TimeUtils.calculateDuration(startTime, endTime);

      expect(duration.hours).toBe(2);
      expect(duration.minutes).toBe(15);
      expect(duration.seconds).toBe(0);
      expect(duration.formatted).toBe('02:15:00');
    });
  });

  describe('formatDuration', () => {
    it('should format duration with zero padding', () => {
      expect(TimeUtils.formatDuration(1, 5, 30)).toBe('01:05:30');
      expect(TimeUtils.formatDuration(10, 0, 0)).toBe('10:00:00');
      expect(TimeUtils.formatDuration(0, 45, 0)).toBe('00:45:00');
    });

    it('should handle default seconds parameter', () => {
      expect(TimeUtils.formatDuration(2, 30)).toBe('02:30:00');
    });

    it('should handle large hour values', () => {
      expect(TimeUtils.formatDuration(123, 45, 30)).toBe('123:45:30');
    });
  });

  describe('parseDuration', () => {
    it('should parse HH:MM:SS format', () => {
      const duration = TimeUtils.parseDuration('02:30:45');
      const expectedMs = (2 * 60 * 60 + 30 * 60 + 45) * 1000;

      expect(duration).toBe(expectedMs);
    });

    it('should parse HH:MM format', () => {
      const duration = TimeUtils.parseDuration('01:45');
      const expectedMs = (1 * 60 * 60 + 45 * 60) * 1000;

      expect(duration).toBe(expectedMs);
    });

    it('should throw error for invalid format', () => {
      expect(() => {
        TimeUtils.parseDuration('invalid');
      }).toThrow('Invalid duration format. Expected HH:MM or HH:MM:SS');

      expect(() => {
        TimeUtils.parseDuration('1:2:3:4');
      }).toThrow('Invalid duration format. Expected HH:MM or HH:MM:SS');
    });

    it('should throw error for non-numeric values', () => {
      expect(() => {
        TimeUtils.parseDuration('ab:cd:ef');
      }).toThrow('Invalid duration format. All parts must be numbers');
    });

    it('should throw error for invalid time values', () => {
      expect(() => {
        TimeUtils.parseDuration('01:60:00');
      }).toThrow('Invalid duration format. Minutes and seconds must be less than 60');

      expect(() => {
        TimeUtils.parseDuration('01:30:60');
      }).toThrow('Invalid duration format. Minutes and seconds must be less than 60');
    });

    it('should handle zero values', () => {
      const duration = TimeUtils.parseDuration('00:00:00');
      expect(duration).toBe(0);
    });
  });

  describe('getCurrentTimestamp', () => {
    it('should return ISO formatted timestamp', () => {
      const timestamp = TimeUtils.getCurrentTimestamp();

      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(new Date(timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('formatTimestamp', () => {
    const testTimestamp = '2023-01-15T14:30:45Z';

    it('should format timestamp as datetime by default', () => {
      const formatted = TimeUtils.formatTimestamp(testTimestamp);

      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/);
    });

    it('should format timestamp as date only', () => {
      const formatted = TimeUtils.formatTimestamp(testTimestamp, 'date');

      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(formatted).not.toMatch(/:/);
    });

    it('should format timestamp as time only', () => {
      const formatted = TimeUtils.formatTimestamp(testTimestamp, 'time');

      expect(formatted).toMatch(/\d{1,2}:\d{2}:\d{2} (AM|PM)/);
      expect(formatted).not.toMatch(/\//);
    });

    it('should handle Date objects', () => {
      const date = new Date(testTimestamp);
      const formatted = TimeUtils.formatTimestamp(date, 'date');

      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should throw error for invalid timestamp', () => {
      expect(() => {
        TimeUtils.formatTimestamp('invalid-date');
      }).toThrow('Invalid timestamp');
    });
  });

  describe('isActiveEntry', () => {
    it('should return true for active entry (no end time)', () => {
      const entry = {
        startTime: '2023-01-01T09:00:00Z'
      };

      expect(TimeUtils.isActiveEntry(entry)).toBe(true);
    });

    it('should return false for completed entry', () => {
      const entry = {
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T17:00:00Z'
      };

      expect(TimeUtils.isActiveEntry(entry)).toBe(false);
    });

    it('should return false for entry without start time', () => {
      const entry = {
        endTime: '2023-01-01T17:00:00Z'
      };

      expect(TimeUtils.isActiveEntry(entry)).toBe(false);
    });
  });

  describe('calculateTotalTime', () => {
    it('should calculate total time for multiple entries', () => {
      const entries = [
        {
          startTime: '2023-01-01T09:00:00Z',
          endTime: '2023-01-01T12:00:00Z'
        },
        {
          startTime: '2023-01-01T13:00:00Z',
          endTime: '2023-01-01T17:30:00Z'
        }
      ];

      const total = TimeUtils.calculateTotalTime(entries);

      expect(total.hours).toBe(7);
      expect(total.minutes).toBe(30);
      expect(total.seconds).toBe(0);
      expect(total.formatted).toBe('07:30:00');
      expect(total.totalHours).toBe(7.5);
    });

    it('should handle empty array', () => {
      const total = TimeUtils.calculateTotalTime([]);

      expect(total.hours).toBe(0);
      expect(total.minutes).toBe(0);
      expect(total.seconds).toBe(0);
      expect(total.formatted).toBe('00:00:00');
    });

    it('should ignore entries without end time', () => {
      const entries = [
        {
          startTime: '2023-01-01T09:00:00Z',
          endTime: '2023-01-01T12:00:00Z'
        },
        {
          startTime: '2023-01-01T13:00:00Z'
          // No end time - should be ignored
        }
      ];

      const total = TimeUtils.calculateTotalTime(entries);

      expect(total.hours).toBe(3);
      expect(total.minutes).toBe(0);
      expect(total.seconds).toBe(0);
    });

    it('should ignore entries without start time', () => {
      const entries = [
        {
          startTime: '2023-01-01T09:00:00Z',
          endTime: '2023-01-01T12:00:00Z'
        },
        {
          // No start time - should be ignored
          endTime: '2023-01-01T17:00:00Z'
        }
      ];

      const total = TimeUtils.calculateTotalTime(entries);

      expect(total.hours).toBe(3);
      expect(total.minutes).toBe(0);
      expect(total.seconds).toBe(0);
    });

    it('should handle entries with fractional seconds', () => {
      const entries = [
        {
          startTime: '2023-01-01T09:00:00.500Z',
          endTime: '2023-01-01T09:01:30.750Z'
        }
      ];

      const total = TimeUtils.calculateTotalTime(entries);

      expect(total.minutes).toBe(1);
      expect(total.seconds).toBe(30);
      expect(total.milliseconds).toBe(90250); // 1 min 30.25 seconds
    });
  });
});