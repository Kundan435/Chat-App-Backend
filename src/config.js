export const ENV_VARS = () => {
  const SESS_LIFE = process.env.SESS_LIFETIME
  const HTTP_PORT = process.env.PORT
  const NODE_ENV = process.env.NODE_ENV

  const DB_URI = process.env.DB_URI

  const SESS_NAME = process.env.SESS_NAME
  const SESS_SECRET = process.env.SESS_SECRET
  const SESS_LIFETIME = SESS_LIFE

  const REDIS_HOST = process.env.REDIS_HOST
  const REDIS_PORT = process.env.REDIS_PORT
  const REDIS_PASSWORD = process.env.REDIS_PASSWORD

  const IN_PROD = NODE_ENV === 'production'

  // Password URL encoded to escape special characters
  // export const DB_URI = `mongodb://${DB_USERNAME}:${encodeURIComponent(
  //   DB_PASSWORD
  // )}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

  const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  const REDIS_OPTIONS = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
    // TODO: retry_strategy
  }

  const SESS_OPTIONS = {
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    }
  }
}
