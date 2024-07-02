const Joi = require("joi");

// Admin requests
const adminLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


export default {
  adminLogin,
};
