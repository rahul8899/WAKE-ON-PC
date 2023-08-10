import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import cors from "cors";
import cron from "node-cron";
import { PcStatusController } from "../service/pcStatus/pcStatus.controller";

export class App {
    private psc: PcStatusController = new PcStatusController();
    protected app: express.Application = express();
    constructor() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Request-Headers', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale,x-auth-organization'
            );
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
            next();
        });

        // Set up the cron job to check PC status every 10 seconds
        const cronExpression = "*/10 * * * * *";
        cron.schedule(cronExpression, () => this.psc.updatePCStatusINDB());

        const port = 2003;
        this.app.listen(port, () => {
            console.log("Surver is runnig on port : ", port);
        });
        // For using routing 
        const route = new Routes();
        this.app.use("/", route.path());

    }
}

new App();
