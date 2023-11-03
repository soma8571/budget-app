import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import { userRouter } from './routes/users.js';
import { itemRouter } from './routes/items.js';

const app = express();

async function connectDBMiddleware(req, res, next) {
    try {
        const db_conn_string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.atudqdj.mongodb.net/budget?retryWrites=true&w=majority`;
        await mongoose.connect(db_conn_string);
        next();
    } catch (err) {
        console.log("Hiba az adatbázishoz való csatlakozás során!");
        res.status(500).json( {error: "Hiba az adatbázishoz való csatlakozás során!"} );
    }
}

//Middlewares
app.use(cors());
app.use(connectDBMiddleware);
app.use(express.json());



app.use("/auth", userRouter);
app.use("/items", itemRouter);


app.listen(8000, () => console.log("SERVER STARTED!"));
