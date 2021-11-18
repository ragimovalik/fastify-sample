const { Schema, model, SchemaTypes } = require('mongoose')

const transactionsSchema = Schema(
  {
    isIncome: {
      type: Boolean,
      required: [true, 'Set transaction type'],
    },
    description: {
      type: String,
      required: [true, 'Set transaction description'],
      lowercase: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    categoryIncoming: {
      type: String,
      required: function () {
        return this.isIncome
      },
      lowercase: true,
      trim: true,
      enum: ['salary', 'extra-job'],
    },
    categorySpending: {
      type: String,
      required: function () {
        return !this.isIncome
      },
      lowercase: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    value: {
      type: Number,
      min: 0.01,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    operationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
)

// const joiSchema = Joi.object({})

const Transaction = model('Transaction', transactionsSchema)

module.exports = Transaction
