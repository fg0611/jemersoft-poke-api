// Imports the Google Cloud Translation library
var api = process.env.API || "AIzaSyDBKINbXrO-q7ParEXSTKNFm_yc8Nn9Xic";
var googleTranslate = require("google-translate")(api);

function trans() {
  if (!api) return;
  var text = "I am using google translator to convert this text to spanish";
  console.log("English :>", text);
  googleTranslate.translate(text, "es", function (err, translation) {
    console.log("Spanish :>", translation.translatedText);
  });
  return;
}

trans();
