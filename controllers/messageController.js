const { saveMessage } = require("../db/queries");

const getCreateMessageForm = async (req, res) => {
  res.render("createMessageView", { title: "Create New Message", data: {} });
};

const postMessage = async (req, res, next) => {
  const id = req.session.passport.user;
  const title = req.body.title;
  const text = req.body.message;
  await saveMessage(id, title, text);
  res.redirect("/");
};

module.exports = {
  getCreateMessageForm,
  postMessage,
};
