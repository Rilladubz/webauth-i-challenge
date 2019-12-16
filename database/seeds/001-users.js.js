exports.seed = function(knex) {
  return knex("users").insert([
    { username: "Sam", password: "pass" },
    { username: "Marcellino", password: "pass" },
    { username: "CAM FAM", password: "pass" }
  ]);
};
