import Joi from 'joi'

const email = Joi.string().email().required().label('Email')

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username')

const name = Joi.string().max(64).required().label('Name')

const password = Joi.string()
  .required()
  .min(8)
  .max(30)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s]).*$/)
  .label('Password')
  .messages({
    'string.pattern.base':
      '{#label}must be 8 character long and must have atleast one lowercase letter, one uppercase letter, one digit and one special character'
  })

export const signUp = Joi.object({
  email,
  username,
  name,
  password
})

export const signIn = Joi.object({
  email,
  password
})
