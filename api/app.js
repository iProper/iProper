const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("express-jwt");
const jwt_jsonwebtoken = require("jsonwebtoken");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
const Socket = require("socket.io");
const { ServerContainer } = require("@react-navigation/native");
const io = require("socketio-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

io.use(jwtMiddleware);
/*
const io = Socket(app, {
  cors: {
    origin: "http://192.168.0.36:19002",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);

    // socket.on("disconnect", () => {
    //   console.log("User disconnected");
    // });
  });
});

*/
/*
const io = require("socket.io")();
const socketioJwt = require("socketio-jwt");

io.sockets
  .on(
    "connection",
    socketioJwt.authorize({
      secret: "SECRET_KEY",
      timeout: 15000, // 15 seconds to send the authentication message
    })
  )
  .on("authenticated", function (socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log(`Hello! ${socket.decoded_token.name}`);
  });
  */
app.use(cors());
app.use(auth);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vpfrf.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to database"));

const getUser = (token) => {
  if (token) {
    try {
      token = token.split(" ")[1];
      return jwt_jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid authentication token");
    }
  }
};

app.use(
  "/graphql",
  graphqlHTTP((req) => {
    return {
      schema,
      graphiql: process.env.NODE_ENV === "development",
      context: {
        user: getUser(req.headers.authorization),
      },
    };
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
