import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: async (email) => User.dontExist({ email }),
        message: ({ value }) => 'Email has already been taken' // TODO : security for Xss Attack
      }
    },
    username: {
      type: String,
      validate: {
        validator: async (username) => User.dontExist({ username }),
        message: ({ value }) => 'Username has already been taken' // TODO : security for Xss Attack
      }
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    name: String,
    password: String
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

userSchema.statics.dontExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0
}

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
