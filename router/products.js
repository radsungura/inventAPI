// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
// product model
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});
const Product = mongoose.model('Product', Schema);

// Get all Products list

router.get('/products/get', async (req, res) => {
  const db = req.db;
  const productsCollection = db.collection('Products');
  const products = await productsCollection.find({}).toArray();
  res.send(products);
});

// Get Product by ID

router.get("/products/get/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('Products');
  const products = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!products) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(products);
})

// Add a new products

router.post('/products/add', async (req, res) => {
 const product = new Product(req.body);
  console.log("Datasent", req.body, product);
  const db = req.db;
  const collection = db.collection('Products');
  const result = await collection.insertOne(req.body);
  res.json(result);
  // res.status(200).json('nice');
});

// Update a products by ID

router.put('/products/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Products');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a products by ID

router.delete('/products/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Products');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
