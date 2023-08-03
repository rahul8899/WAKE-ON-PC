import express from "express"
import { authRoutes } from "../routes/auth.routes";
import { wolRoutes } from "../routes/wol.routes";
export class Routes {
    route = express.Router();

    path() {
        this.route.use('/auth', new authRoutes().router);
        this.route.use('/wol', new wolRoutes().router)
        // this.route.use('/medicaltest', new medialTestRoutes().router)
        // this.route.use('/appointment', new appointmentRoutes().router)
        return this.route
    }
}