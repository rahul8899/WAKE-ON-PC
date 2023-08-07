import { Router } from "express";
import { userController } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class userRoutes {
    router = Router();
    private uc: userController = new userController();
    constructor() {
        // route to create user
        this.router.post('/', authMiddleware, this.uc.createUser);

        // route to diaplay all users
        this.router.get('/', authMiddleware, this.uc.getAllUser);

        // route to update user
        this.router.put('/:user_id', authMiddleware, this.uc.updateUser);

        // route to delete user
        this.router.delete('/:user_id', authMiddleware, this.uc.deleteUser);

    }
}