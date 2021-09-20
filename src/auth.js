import { AuthenticationError } from 'apollo-server-errors'
import { User } from './models/index.js'

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.'
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError(message)
  }
  if (!(await user.matchesPassword(password))) {
    throw new AuthenticationError(message)
  }
  return user
}

const signedIn = (req) => req.session.userId

export const ensureSignedIn = (req) => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed In.')
  }
}

export const ensureSignedOut = (req) => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed In.')
  }
}

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err)

      res.clearCookie(process.env.SESS_NAME)

      resolve(true)
    })
  })
