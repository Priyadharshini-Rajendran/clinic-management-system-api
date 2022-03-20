const { Router } = require('express');

const appointmentRouter = Router();

appointmentRouter.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});
appointmentRouter.post('/', (req, res) => {
  res.send({ message: 'Hello world' });
});
appointmentRouter.get('/:userId', (req, res) => {
  res.send({ message: 'Hello world' });
});
appointmentRouter.put('/:userId', (req, res) => {
  res.send({ message: 'Hello world' });
});
module.exports = appointmentRouter;
