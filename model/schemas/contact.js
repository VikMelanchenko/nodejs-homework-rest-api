const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true,
  },
  phone: {
    type: Number,
    min: 6,
    max: 12,
  },
  subscription: {
    type: String,
  },
  date: { type: Date, default: () => Date.now },
  password: {},
  token: {},
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
