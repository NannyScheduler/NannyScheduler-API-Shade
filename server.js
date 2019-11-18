const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("./auth/auth-router.js");
const nannyRouter = require("./nanny/nanny-router.js");

const server = express();

const sessionConfig = {
  name: "ladygaga",
  secret: "make it a little long and keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60, // you need it if the cookie is to survive !!
    secure: false, // with secure, the cookie only gets set when https !!
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("./database/db-config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/nanny", nannyRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
