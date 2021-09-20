import Joi from 'joi'
import mongoose from 'mongoose'

const objectId = {
  type: 'string',
  base: Joi.string(),
  rules: {
    objectId: {
      validate: (value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('string.objectId')
        }
        return value
      }
    }
  },
  messages: {
    'string.objectId': 'must be a valid Object ID'
  }
}

export default Joi.extend(objectId)
