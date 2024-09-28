const auth = require("../auth");
const { body, validationResult } = require("express-validator");
const { setMemberStatus } = require("../db/queries");

const validateSecret = [body("secret").trim().equals("verysecret").withMessage("Incorrect Secret")];

const get = async (req, res) => {
  console.log(await req.user);
  res.render("indexView", { title: "Members Only", user: await req.user });
};
const getSignup = (req, res) => {
  res.render("signupView", { title: "Signup Form", data: {} });
};

const getLogin = (req, res) => {
  let err = req.session.messages;
  if (req.session.messages) {
    err = req.session.messages.pop();
  }
  res.render("loginView", { title: "Login", data: {}, error: err });
};

const userLogin = (req, res, next) => {
  console.log("testing login");
  auth.passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const getSecretSignup = (req, res, next) => {
  res.render("secretSignupView", { title: "Secret Signup" });
};

const postSecretSignup = [
  validateSecret,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("secretSignupView", {
        title: "Secret Signup",
        errors: errors.array(),
      });
    }
    console.log("correct secret");
    console.log(req.session.passport.user);
    console.log(req.session.user);
    console.log("correct secret");
    setMemberStatus(req.session.passport.user);
    res.redirect("/");
  },
];

module.exports = {
  get,
  getSignup,
  getLogin,
  userLogin,
  logout,
  getSecretSignup,
  postSecretSignup,
};
