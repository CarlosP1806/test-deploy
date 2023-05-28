const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('trust proxy', 1);
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(cookieParser());

// Setup session
const ONE_DAY =  1000 * 60 * 60 * 24;
app.use(sessions({
  secret: process.env.SECRET,
  saveUninitialized: true,
  cookie: { maxAge: ONE_DAY, sameSite: process.env.NODE_ENV === 'development' ? false : true, secure: process.env.NODE_ENV === 'development' ? false : true, httpOnly: true },
  resave: false
}));

app.use(routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hola"});
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
