import Joi from "joi";

export const createRoleRequest = Joi.object().keys({
  name: Joi.string().required(),
});

export const findAllRolesRequest = Joi.object().keys({
  search: Joi.string().optional(),
});

export const findOneRoleRequest = Joi.object().keys({
  roleId: Joi.string().required().length(24),
});
