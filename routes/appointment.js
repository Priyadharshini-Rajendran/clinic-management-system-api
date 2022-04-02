const { Router } = require('express');
const { createAppointment, deleteAppointment, getAllAppointment, getAppointmentDetail, updateAppointment } = require('../services/appointment');
const appointmentRouter = Router();

appointmentRouter.get('/', async (req, res) => {
  await getAllAppointment(req, res);
});
appointmentRouter.post('/', async (req, res) => {
  await createAppointment(req, res);
});
appointmentRouter.get('/:id', async (req, res) => {
  await getAppointmentDetail(req, res);
});
appointmentRouter.delete('/:id', async (req, res) => {
  await deleteAppointment(req, res);
});
appointmentRouter.put('/:id', async (req, res) => {
  await updateAppointment(req, res);
});
module.exports = appointmentRouter;
