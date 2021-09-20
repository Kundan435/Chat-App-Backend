import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import dotenv from 'dotenv'
import colors from 'colors'
import session from 'express-session'
import connectDB from './config/db.js'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'
import schemaDirectives from './derectives/index.js'
;(async () => {
  try {
    const REDIS_OPTIONS = {
      host: 'redis-19030.c261.us-east-1-4.ec2.cloud.redislabs.com',
      port: 19030,
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: 'cNTN7v2WWFqnOaTVnrUdElbzjZXxHuWb'
      // TODO: retry_strategy
    }

    dotenv.config()

    connectDB()

    const ENVIORNMENT = process.env.NODE_ENV

    const IN_PROD = ENVIORNMENT === 'production'

    const COOKIE_LIFE = 1000 * 60 * 60 * 2

    const app = express()

    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      client: new Redis(REDIS_OPTIONS)
    })
    app.use(
      session({
        store,
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: COOKIE_LIFE,
          sameSite: true,
          secure: IN_PROD
        }
      })
    )

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD
        ? false
        : {
            settings: {
              'request.credentials': 'include'
            }
          },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app })

    const PORT = process.env.PORT || 4000

    app.listen({ port: PORT }, () =>
      console.log(
        `Server running on ${ENVIORNMENT} mode at http://localhost:${PORT}${server.graphqlPath}`
      )
    )
  } catch (e) {
    console.error(e)
  }
})()
