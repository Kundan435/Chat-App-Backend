import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    title: String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    lastmessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Chat', chatSchema)
