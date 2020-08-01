import Redis from 'ioredis';
import JSONCache from 'redis-json';

const client = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: process.env.REDISPASS
});

client.on('error', (err) => {
  console.log('Could not connect to Redis: ' + err);
});
client.on('connect', (err) => {
  console.log('Connected to Redis.');
});

export default client;
