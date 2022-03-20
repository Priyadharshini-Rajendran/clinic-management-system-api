const { ObjectId } = require('mongodb');
const database = require('../database/database');
const { sendMail } = require('../utils/sendMail');

const createAppointment = async (req, res) => {
  try {
    const { body } = req;
    const dbConnect = await database.getDb();
    await dbConnect.collection('appointment').insertOne(body);
    if (body.mailId) {
      await sendMail(mailId);
    }
    res.status(200).json({ message: 'New Appointment Created' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteAppointment = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const dbConnect = await database.getDb();
    if (dbConnect) {
      await dbConnect.collection('appointment').deleteOne({ _id: ObjectId(id) });
      res.status(200).json({ message: 'Appointment Deleted' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllAppointment = async (req, res) => {
  try {
    const dbConnect = await database.getDb();
    if (dbConnect) {
      const userResponse = await dbConnect.collection('appointment').find().toArray();
      res.status(200).json(userResponse);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAppointmentDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const dbConnect = await database.getDb();
    if (dbConnect) {
      const userResponse = await dbConnect.collection('appointment').findOne({ _id: id }).toArray();
      res.status(200).json(userResponse);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { createAppointment, deleteAppointment, getAllAppointment, getAppointmentDetail };
