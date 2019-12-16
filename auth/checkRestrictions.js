const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
module.exports = function checkRestrictions(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          Users.find().then(users => {
            res.status(200).json({ users });
          });
        } else {
          res.status(401).json({ UnauthorizedMsg: "THOU SHALL NOT PASS!" });
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "WOMP, YOU SUCK", err });
      });
  } else {
    res.status(401).json({ errorMsg: "Invalid Credentials" });
  }
};
