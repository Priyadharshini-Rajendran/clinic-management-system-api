const { Router } = require('express');
const { getAllPatient, createNewPatient } = require('../services/userMaintaince');
const userMaintenanceRouter = Router();

userMaintenanceRouter.get('/', async (req, res) => {
  await getAllPatient(req, res);
});
userMaintenanceRouter.post('/', async (req, res) => {
  await createNewPatient(req, res);
});
userMaintenanceRouter.get('/:userId', (req, res) => {
  res.send({ message: 'Hello world' });
});
userMaintenanceRouter.put('/:userId', (req, res) => {
  res.send({ message: 'Hello world' });
});
module.exports = userMaintenanceRouter;
