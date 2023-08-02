import { Sequelize } from "sequelize";
import * as dotenv from "dotenv"
dotenv.config();

const DATABASE: any = process.env.DATABASE;
const USER: any = process.env.DB_USER;
const PASSWORD: any = process.env.DB_PASSWORD;
const HOST: any = process.env.DB_HOST;
const DB_PORT: any = process.env.DB_PORT;

console.log(DATABASE);

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    // host: HOST,
    // username: USER,
    // password: PASSWORD,
    dialect: "sqlite",
    storage: 'wakeonlan.sqlite',
    logging: false,
    // port: DB_PORT,
    // pool: {
    //     max: 25,
    //     min: 0,
    //     idle: 1000
    // },
    define: {
        timestamps: false,
    }
})

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch(async (err) => {
    console.log("Unable to connect to the database:", err.message);
})

var db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db as default };