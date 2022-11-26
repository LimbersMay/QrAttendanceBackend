import "dotenv/config";
import express from 'express';
import cors from "express";
import userRouter from "./infraestructure/routes/user.route";
import db from "./infraestructure/db/mysql.connection";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
app.use(userRouter);
db.authenticate().then();
app.listen(port, () => console.log(`USER LISTO POR EL PUERTO ${port}`));
