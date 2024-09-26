const auth = require("../auth");

const get = (req, res) => {
  res.render("indexView", { title: "Members Only" });
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

module.exports = {
  get,
  getSignup,
  getLogin,
  userLogin,
};
