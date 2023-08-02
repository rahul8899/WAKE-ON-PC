import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "../src/routes";

const port = 2003;
class App {

    protected app: express.Application = express();
    constructor() {
        this.app.use(bodyParser.json());

        this.app.listen(port, () => {
            console.log("Surver is runnig on port : ", port);
        });
        // For using routing 
        const route = new Routes();
        this.app.use("/", route.path());
    }
}

new App();
