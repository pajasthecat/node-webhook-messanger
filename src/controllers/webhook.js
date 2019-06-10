const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  var body = req.body;
  if (body.object == "page") {
    body.entry.forEach(function(entry) {
      var webhook_event = entry.messaging[0].message;
      console.log(webhook_event);
    });
  }
  res.status(200).send("Hello world");
});

router.get("/", (req, res) => {
  var verifyToken = process.env.SECRET_KEY;

  var mode = req.query["hub.mode"];
  var token = req.query["hub.verify_token"];
  var challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode == "subscribe" && token == verifyToken) {
      console.log("Verified");
      res.status(200).send(challenge);
    }
  }
  res.sendStatus(403);
});

module.exports = router;
