// Dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const schedule = require("node-schedule");
const Scripture = require("./models/DailyBread-model");
const Daily = require("./models/Daily");

var request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

//---------------------------------------------------------------------------//

// recurrence rule with node schedule that will get random passage every
// morning at 12 AM

getRandomPassage = function() {
  var rule = new schedule.RecurrenceRule();

  // rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
  // rule.hour = 24;

  rule.second = 10;

  schedule.scheduleJob(rule, function() {
    Scripture.aggregate([{ $sample: { size: 1 } }]).exec((err, data) => {
      if (err) {
        return err;
      }
      let newData = data[0];
      // console.log(newData);
      let daily = new Daily(newData);
      daily.save((err, result) => {
        if (err) {
          return err;
        }
        // console.log("success : " + result);
      });
    });
  });
};

// recurrence rule that will remove the current passage from
//passge schema at 11:59:59 PM daily

clearPassagefromDaily = function() {
  var rule = new schedule.RecurrenceRule();

  // rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
  // rule.hour = 23;
  // rule.minute = 59;
  // rule.second = 59;

  rule.second = 8;

  schedule.scheduleJob(rule, function() {
    Daily.remove().exec((err, result) => {
      if (err) {
        return err;
      }
      // console.log("removes success - Ian" + result);
    });
  });
};

clearPassagefromDaily();
getRandomPassage();

//-----------------------------------------------------------------//
// initial attempt at retrieving bible data via backend
// api was unreliable and the data schema was diffcult to pase
// specifically the main information needed; book, verse, chapter etc
// were a json object as an entire string
//------------------------------------------------------------------------//
// let randomBook = "Job";
// let randomChapter = "2";
// let start = 1;
// let end = 2;

// var options = {
//   method: "GET",
//   url: "https://ajith-holy-bible.p.rapidapi.com/GetVerses",
//   qs: {
//     Book: randomBook,
//     chapter: randomChapter,
//     VerseFrom: start,
//     VerseTo: end
//   },
//   headers: {
//     "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
//     "x-rapidapi-key": "vvGe6mgKVamsh6lwgjlpLJnxM7oKp1qiE7OjsnFW2o2Lpl9caf"
//   }
// };

// request(options, function(error, response, body) {
//   if (error) throw new Error(error);
//   let scripture = new Scripture({ body });
//   scripture.save((result, err) => {
//     if (err) {
//       return res.status(400).json({ msg: "nah" });
//     }
//     res.json("saved. AMEN " + result);
//   });
// });
//--------------------------------------------------------------------------//

// Routes
const authRoutes = require("./routes/auth-route");
const userRoutes = require("./routes/user-route");
const prayerRoutes = require("./routes/prayer-routes");
const dailyBreadRoute = require("./routes/dailyBread-route");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", prayerRoutes);
app.use("/", dailyBreadRoute);

app.use((err, req, res, next) => {
  if (err.firstName === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthroized user" });
  }
});

// Mongo Atlas DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected"))
  .catch(err => {
    console.log(`db connection error : ${err.message}`);
    process.exit();
  });

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
