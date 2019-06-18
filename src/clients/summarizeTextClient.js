const request = require("request");

module.exports = {
  getContentFromUrl: function(url, callback) {
    request(
      {
        uri: `https://mysterious-anchorage-15460.herokuapp.com/api/v1/texts/scrape?uri=${url}}`,
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      },
      (err, res, body) => {
        if (!err) {
          console.log("Got content");
          var json = JSON.parse(body);
          var contentAsBytes = json.contentAsBytes[0];
          return callback(false, contentAsBytes);
        } else {
          console.error("Unable to get content");
          return callback(null, error);
        }
      }
    );
  },

  getBrief: function(content, callback) {
    let request_body = {
      base64Content: content
    };

    request(
      {
        uri:
          "https://mysterious-anchorage-15460.herokuapp.com/api/v1/texts/summarize",
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        json: request_body
      },
      (err, res, body) => {
        if (!err) {
          console.log("Got brief");
          var text = body.text[0];
          return callback(false, text);
        } else {
          console.error("Unable to get text");
          return callback(null, error);
        }
      }
    );
  }
};
