const express = require("express");
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const router = express.Router();

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
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  var body = req.body;
  if (body.object == "page") {
    body.entry.forEach(function(entry) {
      var webhook_event = entry.messaging[0];
      console.log(webhook_event);
      var sender_psid = webhook_event.sender.id;
      console.log(sender_psid);
    });

    res.status(200).send("Hello world");
  } else {
    res.sendStatus(404);
  }
});

function handleMessage(sender_psid, sender_message) {}

function handlePostBack(sender_psid, received_postback) {}

function callSendAPI(sender_psid, response) {}
module.exports = router;
