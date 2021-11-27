const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('express-jwt');
const jwt_jsonwebtoken = require('jsonwebtoken');
const { createServer } = require('http');
const { Server } = require('socket.io');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app = express();

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: false,
});

app.use(cors());
app.use(auth);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vpfrf.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to database'));

const getUser = (token) => {
  if (token) {
    try {
      token = token.split(' ')[1];
      return jwt_jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid authentication token');
    }
  }
};

app.use(
  '/graphql',
  graphqlHTTP((req) => {
    return {
      schema,
      graphiql: process.env.NODE_ENV === 'development',
      context: {
        user: getUser(req.headers.authorization),
      },
    };
  })
);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
