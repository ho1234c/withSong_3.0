const { env } = process;

const INFO = {
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
    DB_HOST: env.DB_HOST,
    POSTGRES_PORT: env.POSTGRES_PORT,
    POSTGRES_DB: env.POSTGRES_DB,
    POSTGRES_USER: env.POSTGRES_USER,
    POSTGRES_PASSWORD: env.POSTGRES_PASSWORD
  },
  REDIS: {
    REDIS_SECRETKEY: env.REDIS_SECRETKEY,
    REDIS_HOST: env.REDIS_HOST,
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

const config = { INFO, DATABASE, API };

module.exports = config;
