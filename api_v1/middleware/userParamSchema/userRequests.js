import Joi from "joi";

const login = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});



export default {
  login,
};
