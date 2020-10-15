const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const accountsRouter = require("../accountsRouter");

server.use(accountsRouter);

module.exports = server;
