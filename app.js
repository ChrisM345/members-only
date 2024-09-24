const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("node:path");

const session = require("express-session");
const passport = require("passport");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRoute = require("./routes/indexRoute");
const userRoute = require("./routes/usersRoute");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRoute);
app.use("/users", userRoute);

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
