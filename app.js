// require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express();
const { connectToMongo, getDb } = require('./db');
const port = process.env.PORT || 4000;



// app.use(cors({
//   origin: /http:\/\/rad-pc/
// }));

// Enable CORS for specific origins
// const corsOptions = {
//   origin: 'http://localhost:4200', //  Allowed origin
//   optionsSuccessStatus: 200 // For legacy browser support
// };
// app.use(cors(corsOptions));
// default but not secure, all origin 
app.use(cors()); 



// Import the routes
const clients = require('./router/clients');
const products = require('./router/products');

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });
