// import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models/index.js'
import { attemptSignIn, signOut } from '../auth.js'
import { signIn, signUp } from '../schemas/index.js'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // Todo Projection

      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // TODO projection, paginaton
      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // TODO  projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`User ID is not valid user ID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO not Auth
      await signUp.validateAsync(args, {
        abortEarly: false
      })
      const user = await User.create(args)
      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      await signIn.validateAsync(args, {
        abortEarly: false
      })

      const user = await attemptSignIn(args.email, args.password)
      req.session.userId = user.id
      return user
    },
    signOut: (roots, args, { req, res }, info) => {
      return signOut(req, res)
    }
  }
}
