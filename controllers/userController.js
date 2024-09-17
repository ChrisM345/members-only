module.exports = {
  get: (req, res) => {
    console.log("post");
    res.redirect("/");
  },
  getSignup: (req, res) => {
    res.render("signupView", { title: "Signup Form" });
  },
};
