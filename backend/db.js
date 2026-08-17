import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config({path: "./backend/.env"});
const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

export default pool;