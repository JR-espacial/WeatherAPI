// src/redisClient.ts
import { createClient } from 'redis';

// Create a Redis client and promisify the required methods
class RedisClient {
    private client: any; // Using 'any' to represent Redis client
    private getAsync: Function;
    private setAsync: Function;

    constructor() {
        // Create a new Redis client using the correct syntax for Redis v4+
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
        });
        
        this.client.connect(); // Make sure to explicitly call connect
        this.getAsync = this.client.get.bind(this.client);
        this.setAsync = this.client.setEx.bind(this.client); // Ensure you use the correct method
    }

    // Method to get data from Redis cache
    public async get(key: string): Promise<string | null> {
        return await this.getAsync(key);
    }

    // Method to set data in Redis cache
    public async set(key: string, value: string, expirationTime: number): Promise<void> {
        await this.setAsync(key, expirationTime, value);
    }

    // Method to close Redis connection
    public async close(): Promise<void> {
        await this.client.quit(); // Use 'quit' to close the Redis connection
    }
}

// Singleton instance
const redisClient = new RedisClient();
export default redisClient;
