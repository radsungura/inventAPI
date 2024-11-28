const { ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

// Get all Users list

router.get('/users/get', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const users  = await collection.find({}).toArray();
  res.send(users);
});

// Get a User by ID

router.get("/users/get/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(user);
})

// Add a new User

router.post('/users/add', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a User by ID

router.put('/users/set/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
});

// Delete a User by ID

router.delete('/users/delete/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
