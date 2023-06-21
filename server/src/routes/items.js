import express from 'express';
import mongoose from 'mongoose';
import { ItemModel } from '../models/Items.js';
import { UserModel } from '../models/User.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/:userID", verifyToken, async (req, res) => {
    try {
        //const userid = mongoose.Types.ObjectId(req.body.userID);
        const response = await ItemModel.find({ user: req.params.userID }).sort({date: 1});
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {
    const item = new ItemModel(req.body.item);
    try {
        const response = await item.save();
        res.json(response);
        //console.log(req.body);
    } catch(err) {
        res.json(err);
        console.log(err);
    }
});

router.delete("/:itemID", async(req, res) => {
    const itemID = req.params.itemID;
    try {
        const response = await ItemModel.deleteOne({_id: itemID});
        res.json(itemID);
        //console.log("A törlés sikeres volt.");
    } catch(err) {
        res.json(err);
    }
    
});

/*
router.put("/", async (req, res) => {
    try {
        const item = await ItemModel.findById(req.body.itemID);
        const user = await UserModel.findById(req.body.userID);
        user.savedItems.push(item);
        await item.save();
        res.json({ savedItems: user.savedItems });
    } catch(err) {
        res.json(err);
    }
});

router.get("/savedItems/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({ savedItems: user?.savedItems })
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedItems", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedItems = await ItemModel.find({ _id: { $in: user.savedItems } });
        res.json({ savedItems })
    } catch (err) {
        res.json(err);
    }
});
*/

export { router as itemRouter };

