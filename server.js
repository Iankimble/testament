// Dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
var request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Routes
const authRoutes = require("./routes/auth-route");
const userRoutes = require("./routes/user-route");
const mainPrayerRoutes = require("./routes/pm-routes");
const dailyBreadRoute = require("./routes/dailyBread-route");

// Daily bread logic
// var options = {
//   method: "GET",
//   url: "https://ajith-holy-bible.p.rapidapi.com/GetVerses",
//   qs: { Book: "Job", chapter: "4", VerseFrom: "5", VerseTo: "10" },
//   headers: {
//     "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
//     "x-rapidapi-key": "vvGe6mgKVamsh6lwgjlpLJnxM7oKp1qiE7OjsnFW2o2Lpl9caf"
//   }
// };

// request(options, function(error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", mainPrayerRoutes);
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
