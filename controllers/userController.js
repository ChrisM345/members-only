const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { createUser } = require("../db/queries");

const passwordLengthErr = "must be between 4 and 16 characters.";
const validatePassword = [
  body("password").trim().isLength({ min: 4, max: 10 }).withMessage(`Password ${passwordLengthErr}`),
];

module.exports = {
  createLogin: [
    validatePassword,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("signupView", {
          title: "Signup Form",
          errors: errors.array(),
          data: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          },
        });
      }
      try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            return console.log("Error encrypting password");
          }
          createUser(req.body.first_name, req.body.last_name, req.body.email, hashedPassword);
          res.redirect("/");
        });
      } catch (err) {
        return next(err);
      }
    },
  ],
  getSignup: (req, res) => {
    res.render("signupView", { title: "Signup Form" });
  },
};
