import joi from "joi";

export const permissionSchema = joi.object({
    role_id: joi.number().required(),
    module_id: joi.number().required(),
    permission_read: joi.number().valid(0, 1).required(),
    permission_write: joi.number().valid(0, 1).required(),
    permission_update: joi.number().valid(0, 1).required(),
    permission_delete: joi.number().valid(0, 1).required()
})