import { Client } from 'pg';

export const DBClient = (): Client => {
  return new Client({
    host: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT!,
  });
};
