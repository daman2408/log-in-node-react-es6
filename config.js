const env = process.env;

export const nodeEnv = env.NOD_ENV || 'development'

export default {
  port: env.PORT || 3000
}
