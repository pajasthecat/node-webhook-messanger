const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  var body = req.body;

  res.sendStatus(200).send("Hello world");
});

router.get("/", (req, res) => {
  var verifyToken = "Dana";

  var mode = req.query["hub.mode"];
  var token = req.query["hub.verify_token"];
  var challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode == "subscribe" && token == verifyToken) {
        console.log('Verified');
        res.sendStatus(200).send(challenge);
    }
  } else {
      res.sendStatus(403);
  }
});

module.exports = router;