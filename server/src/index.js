import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import { userRouter } from './routes/users.js';
import { itemRouter } from './routes/items.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/items", itemRouter);

const db_conn_string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.atudqdj.mongodb.net/budget?retryWrites=true&w=majority`;
mongoose.connect(db_conn_string);

app.listen(8000, () => console.log("SERVER STARTED!"));
