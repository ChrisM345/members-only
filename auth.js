const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { checkLogin, getUserById } = require("./db/queries");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = checkLogin(email, password);

      if (!user) {
        console.log("hi");
        return done(null, false, { message: "Email not found in database. Please sign up." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = { passport };
