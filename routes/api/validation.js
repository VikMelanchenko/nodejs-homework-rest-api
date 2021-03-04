const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  subscription: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  token: Joi.string().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  subscription: Joi.string().optional(),
  password: Joi.string().alphanum().optional(),
  token: Joi.string().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    console.log(error.details[0].path);
    console.log(error.details[0].context);
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.addContact = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.updateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
