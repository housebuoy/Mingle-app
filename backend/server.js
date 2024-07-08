const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Firebase initialization
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const firestoreDb = admin.firestore();

// Middleware
app.use(express.json());

// Models
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
}));

const Message = mongoose.model('Message', new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  audioUri: String,
  timestamp: { type: Date, default: Date.now },
}));

// Routes
app.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;

  const user = new User({ name, username, email, password });
  await user.save();

  await firestoreDb.collection('users').add({
    name,
    username,
    email,
  });

  res.status(201).send(user);
});

app.post('/messages', async (req, res) => {
  const { sender, receiver, text, audioUri } = req.body;

  const message = new Message({ sender, receiver, text, audioUri });
  await message.save();

  await firestoreDb.collection('messages').add({
    sender,
    receiver,
    text,
    audioUri,
    timestamp: new Date()
  });

  io.emit('newMessage', message);
  res.status(201).send(message);
});

// Real-time communication with Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('newMessage', (message) => {
    io.emit('newMessage', message);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
