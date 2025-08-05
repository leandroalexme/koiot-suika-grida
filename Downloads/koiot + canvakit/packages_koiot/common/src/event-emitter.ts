type EventListener = (...args: any[]) => void;

export class EventEmitter<Events extends Record<string, (...args: any[]) => void> = Record<string, (...args: any[]) => void>> {
  private listeners: Map<keyof Events, Set<EventListener>> = new Map();

  on<K extends keyof Events>(event: K, listener: Events[K]): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as EventListener);
  }

  off<K extends keyof Events>(event: K, listener: Events[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener as EventListener);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for "${String(event)}":`, error);
        }
      });
    }
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}