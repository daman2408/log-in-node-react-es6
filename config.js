const env = process.env;

export const nodeEnv = env.NOD_ENV || 'development';

export default {
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
