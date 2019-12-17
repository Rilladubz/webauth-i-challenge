const router = require("express").Router();

const Users = require("./users-model");
const checkRestrictions = require("../auth/checkRestrictions");

router.get("/", checkRestrictions, (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(404).json({ errorMsg: "Users not found. Error code:", err });
    });
});

module.exports = router;
