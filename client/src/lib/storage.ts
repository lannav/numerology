import { NumerologyReading, CompatibilityTest } from "@/lib/schema";

const READINGS_KEY = 'numerologyReadings';
const COMPATIBILITY_KEY = 'compatibilityTests';
const PREFERENCES_KEY = 'userPreferences';

export interface UserPreferences {
  language: string;
  userId: string;
}

export class LocalStorage {
  static saveReading(reading: NumerologyReading): void {
    const readings = this.getReadings();
    readings.unshift(reading);
    // Keep only last 20 readings
    if (readings.length > 20) {
      readings.splice(20);
    }
    localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
  }

  static getReadings(): NumerologyReading[] {
    try {
      const stored = localStorage.getItem(READINGS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveCompatibilityTest(test: CompatibilityTest): void {
    const tests = this.getCompatibilityTests();
    tests.unshift(test);
    // Keep only last 15 compatibility tests
    if (tests.length > 15) {
      tests.splice(15);
    }
    localStorage.setItem(COMPATIBILITY_KEY, JSON.stringify(tests));
  }

  static getCompatibilityTests(): CompatibilityTest[] {
    try {
      const stored = localStorage.getItem(COMPATIBILITY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static savePreferences(preferences: UserPreferences): void {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }

  static getPreferences(): UserPreferences | null {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static deleteReading(id: string): void {
    const readings = this.getReadings().filter(r => r.id !== id);
    localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
  }

  static deleteCompatibilityTest(id: string): void {
    const tests = this.getCompatibilityTests().filter(t => t.id !== id);
    localStorage.setItem(COMPATIBILITY_KEY, JSON.stringify(tests));
  }

  static clearAllData(): void {
    localStorage.removeItem(READINGS_KEY);
    localStorage.removeItem(COMPATIBILITY_KEY);
  }

  static generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
