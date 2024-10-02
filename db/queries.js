const pool = require("./pool");

async function createUser(first_name, last_name, email, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, email, hashedPassword, "NOW()"]
  );
}

async function checkLogin(email, password) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function checkEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

async function setMemberStatus(id) {
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
  const { rows } = await pool.query(
    "SELECT first_name, last_name, title, text, messages.created_at FROM messages INNER JOIN users ON users.id = messages.user_id ORDER BY messages.id DESC;"
  );
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
