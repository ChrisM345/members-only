const pool = require("./pool");

async function createUser(first_name, last_name, email, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, email, hashedPassword, "NOW()"]
  );
}

async function checkLogin(email, password) {
  console.log("checklogin");
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

async function getUserById(id) {
  console.log("getid");
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function checkEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  console.log(rows[0]);
  return rows[0];
}

async function setMemberStatus(id) {
  console.log(id);
  await pool.query("UPDATE users SET member_status = true WHERE id = $1", [id]);
}

async function saveMessage(id, title, text) {
  await pool.query("INSERT INTO messages (title, text, created_at, user_id) VALUES ($1, $2, $3, $4)", [
    title,
    text,
    "NOW()",
    id,
  ]);
}

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

module.exports = {
  createUser,
  checkLogin,
  getUserById,
  checkEmail,
  setMemberStatus,
  saveMessage,
  getMessages,
};
