const cors = require("cors");
const express = require("express");
const app = express();
const { connectToMongo, getDb } = require('./db');
const port = process.env.PORT || 4000;

// Enable CORS for specific origins

const corsOptions = {
  origin: 'https://e-inventory.onrender.com', //  Allowed origin
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));



// Import the routes
const clients = require('./router/clients');
const products = require('./router/products');
const users = require('./router/users');
const suppliers = require('./router/suppliers');

// Middleware to parse JSON bodies
app.use(express.json()); 

// Connect to MongoDB
connectToMongo().catch(err => {
  console.error(err);
  process.exit(1);
});

app.use('/api', (req, res, next) => {
  req.db = getDb();
  next();
}, clients);

app.use('/api', (req, res, next) => {
  req.db = getDb();
  next();
}, products);

app.use('/api', (req, res, next) => {
  req.db = getDb();
  next();
}, users);

app.use('/api', (req, res, next) => {
  req.db = getDb();
  next();
}, suppliers);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });
