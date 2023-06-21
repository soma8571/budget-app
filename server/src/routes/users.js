import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';
import 'dotenv/config';

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username }); //shorthand not., username: username 

    if (user) {
        return res
            .status(400)
            .json({ message: "Ez a felhasználónév már foglalt, kérlek válassz másikat!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "A regisztráció sikeres volt." });
});

//LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username }); //shorthand not., username: username 

    if (!user) {
        return res
            .status(401)
            .json({ message: "Ilyen felhasználó nem létezik!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res
            .status(401)
            .json({ message: "Helytelen felhasználónév vagy jelszó!" });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_KEY);
    res.json({ token, userID: user._id });

});

export { router as userRouter };

//Middleware
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}