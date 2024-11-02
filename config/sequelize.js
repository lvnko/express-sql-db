import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const Sqlize = new Sequelize(
    process.env.DB_NAME || 'TodoList',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
    }
);

export const Auth = async () => {

    try {
        await Sqlize.authenticate();
        console.log("MySQL server connection succeeded!");
    } catch(err) {
        console.error("MySQL server connection failed!");
    }
}

export default Sqlize;