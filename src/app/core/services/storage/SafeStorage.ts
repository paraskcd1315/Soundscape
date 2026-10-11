export class SafeStorage {
  private readonly memory = new Map<string, string>();
  private persistent = true;

  get isPersistent(): boolean {
    return this.persistent;
  }

  read(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      this.persistent = false;
      return this.memory.get(key) ?? null;
    }
  }

  write(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      this.persistent = false;
      this.memory.set(key, value);
    }
  }

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      this.persistent = false;
    }
    this.memory.delete(key);
  }
}
