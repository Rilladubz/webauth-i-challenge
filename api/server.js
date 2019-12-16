const express = require("express");

const apiRouter = require("./api-router");
const configMiddleware = require("./configMiddleware.js");

const server = express();

configMiddleware(server);

server.use("/api", apiRouter);

module.exports = server;
