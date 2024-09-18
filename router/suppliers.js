// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

// Get all Supplires list

router.get('/suppliers/get', async (req, res) => {
  const db = req.db;
  const suppliersCollection = db.collection('Suppliers');
  const suppliers  = await suppliersCollection.find({}).toArray();
  res.send(suppliers);
});

// Get a Supplier by ID

router.get("/suppliers/get/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('Suppliers');
  const suppliers = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!suppliers) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(suppliers);
})

// Add a new suppliers

router.post('/suppliers/add', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('Suppliers');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a suppliers by ID

router.put('/suppliers/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Suppliers');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a suppliers by ID

router.delete('/suppliers/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Suppliers');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
