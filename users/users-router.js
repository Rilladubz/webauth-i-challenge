const router = require("express").Router();

const Users = require("./users-model");
const checkRestrictions = require("../auth/checkRestrictions");

router.get("/", checkRestrictions, (req, res) => {
  const { username, password } = req.body;
});

module.exports = router;
