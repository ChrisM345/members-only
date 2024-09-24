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
module.exports = {
  createUser,
  checkLogin,
  getUserById,
};
