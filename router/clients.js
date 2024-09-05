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

router.get("/get/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('clients');
  const cow = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!cow) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(cow);
})

// Add a new cow

router.post('/add', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('clients');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a cow by ID

router.put('/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('clients');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a cow by ID

router.delete('/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('clients');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
