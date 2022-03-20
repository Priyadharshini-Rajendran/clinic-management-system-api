const database = require('../database/database');

const getAllPatient = async (req, res) => {
  try {
    const dbConnect = await database.getDb();
    if (dbConnect) {
      const userResponse = await dbConnect.collection('patientdetails').find().toArray();
      res.status(200).json(userResponse);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewPatient = async (req, res) => {
  try {
    const { body } = req;
    const dbConnect = await database.getDb();
    const userResponse = await dbConnect.collection('patientdetails').insertOne(body);
    res.status(200).json({ message: 'New Patient Created' });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllPatient, createNewPatient };
