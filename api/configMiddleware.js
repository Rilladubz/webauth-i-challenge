const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const knex = require("../database/dbConfig");

const sessionConfig = {
  name: "vixen",
  secret: "keepIt Secret",
  cookie: {
    maxAge: 1000 * 30,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex,
    createTable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: "sid",
    tablename: "session"
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
