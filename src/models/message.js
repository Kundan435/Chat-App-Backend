import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    body: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)
