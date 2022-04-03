const moment = require("moment");
const { ObjectId } = require("mongodb");
const database = require("../database/database");
const { sendMail } = require("../utils/sendMail");

const createAppointment = async (req, res) => {
  try {
    const { body } = req;
    const dbConnect = await database.getDb();
    body.createdAt = new Date();
    body.isAppointmentClosed = false;
    body.isPaymentDone = false;
    body._id = ObjectId();
    await dbConnect.collection("appointment").insertOne(body);
    if (body.mailId) {
      // await sendMail(body.mailId);
    }
    res.status(200).json({ message: "New Appointment Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    if (body._id) {
      delete body._id;
    }
    const dbConnect = await database.getDb();
    delete body._id;
    const resp = await dbConnect
      .collection("appointment")
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: body });
    console.log("REP01", resp);
    if (body.mailId) {
      // await sendMail(mailId);
    }
    res.status(200).json({ message: "Appointment Updated Successfully" });
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
      await dbConnect
        .collection("appointment")
        .deleteOne({ _id: ObjectId(id) });
      res.status(200).json({ message: "Appointment Deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllAppointment = async (req, res) => {
  try {
    const dbConnect = await database.getDb();
    if (dbConnect) {
      const userResponse = await dbConnect
        .collection("appointment")
        .find({ appointmentDate: moment().format("DD-MM-YYYY") })
        .toArray();
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
      const userResponse = await dbConnect
        .collection("appointment")
        .findOne({ _id: id })
        .toArray();
      res.status(200).json(userResponse);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  createAppointment,
  deleteAppointment,
  getAllAppointment,
  getAppointmentDetail,
  updateAppointment,
};
