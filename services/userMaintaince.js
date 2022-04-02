const database = require('../database/database');
const { sendMail } = require('../utils/sendMail');
const defaultValue = 'PAT';
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
    let newUserId = defaultValue + body.firstName.charAt(1) + body.firstName.charAt(2) + body.dob.split('-')[0] + body.age;
    const isUserIdExist = await dbConnect.collection('patientdetails').find({ userId: newUserId.toUpperCase() }).toArray();
    if (isUserIdExist.length > 0) {
      newUserId = defaultValue + body.firstName.charAt(1) + body.firstName.charAt(2) + body.dob.split('-')[1] + body.age;
    }
    body.userId = newUserId.toUpperCase();
    body.createdAt = new Date();
    const userResponse = await dbConnect.collection('patientdetails').insertOne(body);
    if (body.mailId) {
      // await sendMail(body.mailId); // commented for now
    }
    res.status(200).json({ message: 'New Patient Created' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const updatePatient = async (req, res) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    if (body._id) {
      delete body._id;
    }
    const dbConnect = await database.getDb();
    const userResponse = await dbConnect.collection('patientdetails').findOneAndUpdate({ userId }, { $set: body });
    res.status(200).json({ message: 'Updated Patient Details' });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getPatientInfo = async (req, res) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    const dbConnect = await database.getDb();
    const userResponse = await dbConnect.collection('patientdetails').findOne({ userId });
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { getAllPatient, createNewPatient, updatePatient, getPatientInfo };
