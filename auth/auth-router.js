const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const newUser = req.body;

  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;

  Users.add(newUser)
    .then(user => {
      res.status(201).json({ userStatus: user, MSG: "New User Created" });
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "Sorry Error occured while trying to create new user"
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ UnauthorizedMsg: "THOU SHALL NOT PASS!" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "WOMP, YOU SUCK" });
    });
});

module.exports = router;
