import { Request, Response, NextFunction } from "express";

export const bodyValidate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error) {
            console.log("There is erroe in validating schema");
            res.json(result.error)
        } else {
            next();
        }
    }
}