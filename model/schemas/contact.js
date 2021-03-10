const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, model, SchemaTypes } = mongoose;

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
    password: {
      type: String,
      required: [true, 'Set password'],
    },

    token: {
      type: String,
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    date: { type: Date, default: () => Date.now() },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
