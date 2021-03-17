const express = require("express");
const UserModel = require("../db/User");
const AdvisorModel = require("../db/Advisor");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = new express.Router();

app.use(express.json());

router.post("/user/register", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const key = mongoose.Types.ObjectId().toHexString();
    const token = jwt.sign(key, "secret");
    user.tokens.push(token);
    await user.save();
    res.status(200).send({ id: user._id, token: token });
  } catch (err) {
    res.status(400).send("Error:Try again");
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await UserModel.findOne(req.body);
    const key = mongoose.Types.ObjectId().toHexString();
    const token = jwt.sign(key, "secret");
    user.tokens.push(token);
    await user.save();
    res.send({ id: user._id, token: token });
  } catch (err) {
    res.status(401).send("Error:Authentication Failed");
  }
});

router.get("/user/:userId/advisor", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    res.send(user.Advisors);
  } catch (err) {
    res.status(404).send("Error: Invalid UserID");
  }
});

router.post("/user/:userId/advisor/:advisorId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const advisorId = req.params.advisorId;
    const user = await UserModel.findById(userId);
    const advisor = await AdvisorModel.findById(advisorId);
    const bookingTime = req.body.BookingTime;
    user.Advisors.push(advisor);
    user.Bookings.push({
      advisorName: advisor.name,
      advisorProfilePic: advisor.url,
      advisorId: advisor._id,
      BookingTime: new Date(bookingTime),
      BookingId: mongoose.Types.ObjectId().toHexString(),
    });
    await user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send("Invalid Credentials");
  }
});

router.get("/user/:userId/advisor/booking", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    res.send(user.Bookings);
  } catch (err) {
    res.status(400).send("Error : Invalid User");
  }
});

module.exports = router;
