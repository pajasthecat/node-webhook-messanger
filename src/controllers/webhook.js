const express = require("express");
const request = require('request');
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
      if(webhook_event.message){
        handleMessage(sender_psid, webhook_event.message)
      } else if(webhook_event.postback){
        handlePostBack(sender_psid, webhook_event.postback)
      }
    });

    res.status(200).send("Hello world");
  } else {
    res.sendStatus(404);
  }
});

function handleMessage(sender_psid, received_message) {
  var response;
  if(received_message.text){
    response = {
      "text": `You said "${received_message.text}"`
    }
    callSendAPI(sender_psid, response)
  }
}

function handlePostBack(sender_psid, received_postback) {}

function callSendAPI(sender_psid, response) {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}
module.exports = router;
