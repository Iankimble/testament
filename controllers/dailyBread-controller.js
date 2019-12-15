const cors = require("cors");
let request = require("request");

// Write logic that will randomly selct a wisdom book
// Write logic that will loop through chapters and select 1
// Write logic that will loop through verses from selected chapter

exports.dailyBread = (req, res, next) => {
  let options = {
    mode: cors,
    method: "GET",
    url: "https://ajith-holy-bible.p.rapidapi.com/GetVerses",
    qs: { Book: "Job", chapter: "4", VerseFrom: "5", VerseTo: "10" },
    headers: {
      "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
      "x-rapidapi-key": "vvGe6mgKVamsh6lwgjlpLJnxM7oKp1qiE7OjsnFW2o2Lpl9caf"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    return res.json(body);
  });
};
