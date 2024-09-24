const get = (req, res) => {
  res.render("indexView", { title: "Members Only" });
};
const getSignup = (req, res) => {
  res.render("signupView", { title: "Signup Form", data: {} });
};

const getLogin = (req, res) => {
  res.render("loginView", { title: "Login", data: {} });
};

const userLogin = (req, res) => {
  console.log("testing login");
  res.redirect("/login");
};

module.exports = {
  get,
  getSignup,
  getLogin,
  userLogin,
};
