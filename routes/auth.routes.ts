import { Router } from "express";
import { authController } from "../controller/auth.controller";

export class authRoutes {
    router = Router();
    private ac: authController = new authController();
    constructor() {
        //Route to login into system
        this.router.post('/login', this.ac.loginUser)
    }
}