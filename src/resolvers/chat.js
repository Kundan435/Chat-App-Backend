import { startChat, result } from '../schemas/index.js'

export default {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session
      await result(args, startChat(userId), {
        abortEarly: false
      })

      return {}
    }
  }
}
