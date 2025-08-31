/**
 * Time tracking utilities
 */
class TimeUtils {
  /**
   * Calculate duration between two timestamps
   * @param {Date|string} startTime - Start time
   * @param {Date|string} endTime - End time
   * @returns {Object} - Duration object with hours, minutes, seconds
   */
  static calculateDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid date format');
    }
    
    if (end <= start) {
      throw new Error('End time must be after start time');
    }
    
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    
    return {
      milliseconds: durationMs,
      totalHours: durationMs / (1000 * 60 * 60),
      hours,
      minutes,
      seconds,
      formatted: this.formatDuration(hours, minutes, seconds)
    };
  }

  /**
   * Format duration as HH:MM:SS
   * @param {number} hours - Hours
   * @param {number} minutes - Minutes  
   * @param {number} seconds - Seconds
   * @returns {string} - Formatted duration
   */
  static formatDuration(hours, minutes, seconds = 0) {
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  /**
   * Parse formatted duration string (HH:MM:SS) to milliseconds
   * @param {string} duration - Duration string in HH:MM:SS format
   * @returns {number} - Duration in milliseconds
   */
  static parseDuration(duration) {
    const parts = duration.split(':');
    
    if (parts.length < 2 || parts.length > 3) {
      throw new Error('Invalid duration format. Expected HH:MM or HH:MM:SS');
    }
    
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts.length === 3 ? parseInt(parts[2], 10) : 0;
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      throw new Error('Invalid duration format. All parts must be numbers');
    }
    
    if (minutes >= 60 || seconds >= 60) {
      throw new Error('Invalid duration format. Minutes and seconds must be less than 60');
    }
    
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  }

  /**
   * Get current timestamp in ISO format
   * @returns {string} - ISO timestamp
   */
  static getCurrentTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Format timestamp for display
   * @param {Date|string} timestamp - Timestamp to format
   * @param {string} format - Format type ('date', 'time', 'datetime')
   * @returns {string} - Formatted timestamp
   */
  static formatTimestamp(timestamp, format = 'datetime') {
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid timestamp');
    }
    
    const options = {
      date: { year: 'numeric', month: '2-digit', day: '2-digit' },
      time: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true },
      datetime: { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true
      }
    };
    
    if (format === 'time') {
      return date.toLocaleTimeString('en-US', options.time);
    }
    
    return date.toLocaleDateString('en-US', options[format] || options.datetime);
  }

  /**
   * Check if a time entry is currently active (no end time)
   * @param {Object} entry - Time entry object
   * @returns {boolean} - True if entry is active
   */
  static isActiveEntry(entry) {
    return !!entry.startTime && !entry.endTime;
  }

  /**
   * Calculate total time from multiple entries
   * @param {Array} entries - Array of time entries
   * @returns {Object} - Total duration object
   */
  static calculateTotalTime(entries) {
    let totalMs = 0;
    
    for (const entry of entries) {
      if (entry.startTime && entry.endTime) {
        const duration = this.calculateDuration(entry.startTime, entry.endTime);
        totalMs += duration.milliseconds;
      }
    }
    
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    
    return {
      milliseconds: totalMs,
      totalHours: totalMs / (1000 * 60 * 60),
      hours,
      minutes,
      seconds,
      formatted: this.formatDuration(hours, minutes, seconds)
    };
  }
}

module.exports = TimeUtils;