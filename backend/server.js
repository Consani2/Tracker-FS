import express from "express";
import cors from "cors";
import registroRouter from "./routes/registro.js";
import loginRouter from "./routes/login.js"
import session from "express-session";
import connectPgSimple from "connect-pg-simple"
import pool from "./db.js";

const pgSession = connectPgSimple(session)
const app = express();

app.use(
    session({
        store: new pgSession({
            pool: pool
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false,
    })
)
app.use(cors());
app.use(express.json());

app.use("/api", registroRouter);
app.use("/api", loginRouter)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});