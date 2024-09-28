const getCreateMessageForm = async (req, res) => {
  console.log(await req.user);
  res.render("createMessageView", { title: "Create New Message", data: {} });
};

module.exports = {
  getCreateMessageForm,
};
