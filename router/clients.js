// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/clients/get', async (req, res) => {
  const db = req.db;
  const clientsCollection = db.collection('Clients');
  const clients = await clientsCollection.find({}).toArray();
  res.send(clients);
});

router.get("/clients/get/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('clients');
  const clients = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!clients) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(clients);
})

// Add a new clients

router.post('/clients/add', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('clients');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a clients by ID

router.put('/clients/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('clients');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a clients by ID

router.delete('/clients/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('clients');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
