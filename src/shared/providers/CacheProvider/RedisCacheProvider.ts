import Redis from "ioredis";
import { IRedisCacheProvider } from "./IRedisCacheProvider";

export class RedisCacheProvider implements IRedisCacheProvider {
  private redis: Redis;
  private defaultTTL = 600;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.redis.on("connect", () => {
      console.log("✅ Redis connection established successfully!");
    });

    this.redis.on("error", error => {
      console.error("❌ Error connecting to Redis:", error);
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error fetching from Redis cache:", error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttlInSeconds?: number): Promise<void> {
    try {
      const ttl = ttlInSeconds || this.defaultTTL;
      const serializedValue = JSON.stringify(value);
      await this.redis.setex(key, ttl, serializedValue);
    } catch (error) {
      console.error("Error saving to Redis cache:", error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error("Error deleting from Redis cache:", error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.redis.flushdb();
    } catch (error) {
      console.error("Error clearing Redis cache:", error);
    }
  }

  disconnect(): void {
    this.redis.disconnect();
  }
}
