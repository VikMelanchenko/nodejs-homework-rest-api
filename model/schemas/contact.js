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
    subscription: {
      type: String,
    },
    password: { type: String, required: [true, 'Set password'] },

    token: {
      type: String,
      default: null,
    },
    date: { type: Date, default: () => Date.now() },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
