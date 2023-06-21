/*
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import { userRouter } from './routes/users.js';
import { itemRouter } from './routes/items.js';
*/

require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
//const userRouter = require()


const app = express();
app.use(express.json());
app.use(cors());
/*
//Middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/items", itemRouter);
*/
//const db_conn_string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.atudqdj.mongodb.net/budget?retryWrites=true&w=majority`;
//const db_conn_string = `mongodb+srv://soma8571:G9tbycXXEIgyDjzd@budget.atudqdj.mongodb.net/budget?retryWrites=true&w=majority`;
//mongoose.connect(db_conn_string);

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
    //const { username, password } = req.body;

    /*    
    const user = await UserModel.findOne({ username }); //shorthand not., username: username 

    if (user) {
        return res
            .status(400)
            .json({ message: "This username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    */
    res.json({ message: "Megkaptam az adatokat." });
});

app.listen(8000, () => console.log("SERVER STARTED!"));
