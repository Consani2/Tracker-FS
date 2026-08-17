import express from "express";
import cors from "cors";
import registroRouter from "./routes/registro.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", registroRouter);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});