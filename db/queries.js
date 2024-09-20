const pool = require("./pool");

async function createUser(first_name, last_name, email, hashedPassword) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, email, hashedPassword, "NOW()"]
  );
}
module.exports = {
  createUser,
};
