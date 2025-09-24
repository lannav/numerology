// This numerology application uses client-side local storage
// Server-side storage is not needed for this MVP
// All numerology calculations and data persistence happen on the frontend

export interface IStorage {
  // No server storage methods needed for this numerology app
}

export class MemStorage implements IStorage {
  constructor() {
    // Empty implementation - using client-side storage only
  }
}

export const storage = new MemStorage();
