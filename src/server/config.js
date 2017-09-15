require('dotenv').config({ path: './config/.env' });

const { env } = process;

const APP = {
  PORT: env.PORT || 8000,
  ENV: env.NODE_ENV,
  CWD: process.cwd(),
  DOMAIN: env.DOMAIN || 'localhost',
  PATH: {
    PUBLIC: `${process.cwd()}/public`
  }
};

const DATABASE = {
  POSTGRES: {
    HOST: env.DB_HOST,
    PORT: env.POSTGRES_PORT,
    DB_NAME: env.POSTGRES_DB,
    USER: env.POSTGRES_USER,
    PASSWORD: env.POSTGRES_PASSWORD
  },
  REDIS: {
    SECRETKEY: env.REDIS_SECRETKEY,
    HOST: env.REDIS_HOST,
    PORT: env.REDIS_PORT
  }
};

const API = {
  YOUTUBE: {
    KEY: env.YOUTUBE_KEY,
    URL: env.YOUTUBE_URL
  },
  FACEBOOK: {
    CLIENT_ID: env.FACEBOOK_CLIENT_ID,
    CLIENT_SECRET: env.FACEBOOK_CLIENT_SECRET
  }
};

module.exports = { APP, DATABASE, API };
