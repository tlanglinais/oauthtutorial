const express = require("express");
const authRouters = require("./routes/auth-routes");
const profileRouters = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// set up view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(
  keys.mongoDB.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Connected to mongodb");
  }
);

// set up routes
app.use("/auth", authRouters);
app.use("/profile", profileRouters);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3001, () => {
  console.log("app now listening for requests on port 3001");
});
