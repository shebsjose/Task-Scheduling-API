const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
      userName: Joi.string().min(3).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data)
  };

  const loginValidation = (data) => {
    const schema =Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data)
  };

  const taskValidation = (data) => {
    const schema =Joi.object({
      description: Joi.string().min(6).required(),
      user: Joi.string().min(3).required(),
      time : Joi.string().required(),
    });
    return schema.validate(data)
  };

  module.exports.registerValidation = registerValidation;
  module.exports.loginValidation = loginValidation;
  module.exports.taskValidation = taskValidation;
  
  