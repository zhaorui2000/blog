import Joi from 'joi';
export default Joi.object({
  hour: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  minute: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  hour: Joi.alternatives().try(Joi.string(), Joi.number()),
});
