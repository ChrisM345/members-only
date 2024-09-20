module.exports = {
  get: (req, res) => {
    res.render("indexView", { title: "Members Only" });
  },
  getSignup: (req, res) => {
    res.render("signupView", { title: "Signup Form", data: {} });
  },
};
