const Joi = require('joi');
const { error } = require("consola");

const validateSignup = (req, res, next) => {
  
  const schema = Joi.object().keys({
    
    name: Joi.string().regex(/^[a-zA-Z .]+$/).required(),
    email: Joi.string().email().lowercase().required(),
    phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
    gender: Joi.string().valid('male', 'female').lowercase().required(),
    about: Joi.string().required(),
    password: Joi.string().min(8).regex(/^[\w]+$/).required(),
  
  });

  const { error: err, value } = schema.validate(req.body);

  if (err) {

    error({
      message: err,
      badge: true
    });

    return res.status(400).json({
      message: "Invalid input",
      success: false
    });

  } else {

    req.body = value;
    next();

  }

};

module.exports = { validateSignup };