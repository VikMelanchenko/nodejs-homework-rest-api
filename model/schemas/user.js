const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
var gravatar = require('gravatar');
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  this.password = bcrypt.hashSync(this.password, salt, null);
  return next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
