const express = require("express");
const AdvisorModel = require("../db/Advisor");

const app = express();
const router = new express.Router();

app.use(express.json());

router.post("/admin/advisor", async (req, res) => {
  try {
    const name = req.body.name;
    const photoURL = req.body.url;
    if (!name || !photoURL) {
      throw new Error("Missing Fields");
    }
    const advisor = new AdvisorModel(req.body);
    await advisor.save();
    res.status(200).send("Successful!");
  } catch (err) {
    res.status(400).send("Fields are missing");
  }
});

module.exports = router;
