export interface IRedisCacheProvider {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown, ttlInSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
