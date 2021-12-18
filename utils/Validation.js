const Joi = require('joi');

const validateSignup = (req, res, next) => {
  
  const schema = Joi.object().keys({
    
    name: Joi.string().regex(/^[a-zA-Z .]+$/).required(),
    email: Joi.string().email().lowercase().required(),
    phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
    gender: Joi.string().valid('male', 'female').lowercase().required(),
    about: Joi.string().required(),
    password: Joi.string().min(8).regex(/^[\w]+$/).required(),
  
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error.details.map(x => x.message).join(', '));
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