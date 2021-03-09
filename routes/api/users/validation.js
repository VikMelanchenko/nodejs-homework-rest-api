// const Joi = require('joi');

// const schemaRegUser = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// const schemaLoginUser = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// const validate = (schema, obj, next) => {
//   const { error } = schema.validate(obj);

//   if (error) {
//     console.log(error.details[0].path);
//     console.log(error.details[0].context);
//     const [{ message }] = error.details;
//     return next({
//       status: 400,
//       message: `Field: ${message.replace(/"/g, '')}`,
//     });
//   }
//   next();
// };

// module.exports.reg = (req, _res, next) => {
//   return validate(schemaRegUser, req.body, next);
// };

// module.exports.login = (req, _res, next) => {
//   return validate(schemaLoginUser, req.body, next);
// };
