import * as dotenv from 'dotenv';
import path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export type ConfigProps = {
  POSTGRES_URL: string;
  POSTGRES_USER: string;
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: string;
  APP_SECRET: string;
  EXPIRES: string;
  MAILER_SERVICE: string;
  MAILER_EMAIL: string;
  MAILER_SECRET_KEY: string;
  URL_VERIFY: string;
};

export const getConfig = (): ConfigProps => ({
  POSTGRES_URL: process.env.POSTGRES_URL || '',
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_DB: process.env.POSTGRES_DB || '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
  APP_SECRET: process.env.APP_SECRET || '',
  EXPIRES: process.env.EXPIRES || '',
  MAILER_SERVICE: process.env.MAILER_SERVICE || '',
  MAILER_EMAIL: process.env.MAILER_EMAIL || '',
  MAILER_SECRET_KEY: process.env.MAILER_SECRET_KEY || '',
  URL_VERIFY: process.env.URL_VERIFY || '',
});
