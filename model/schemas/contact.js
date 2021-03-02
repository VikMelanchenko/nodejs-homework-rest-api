const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    subscription: {
      type: String,
    },
    date: { type: Date, default: () => Date.now() },
    password: {},
    token: {},
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
