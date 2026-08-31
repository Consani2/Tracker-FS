import express from "express";
import cors from "cors";
import registroRouter from "./routes/registro.js";
import loginRouter from "./routes/login.js"
import serieRouter  from "./routes/serie.js"
import userRouter from "./routes/user.js"
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
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/api", registroRouter);
app.use("/api", loginRouter);
app.use("/api", serieRouter);
app.use("/api", userRouter)
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});