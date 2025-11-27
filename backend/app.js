const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors());

//routes
const path = require("path");

readdirSync(path.join(__dirname, "routes")).map((file) => {
  const routePath = path.join(__dirname, "routes", file);
  app.use("/api/v1", require(routePath));
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
