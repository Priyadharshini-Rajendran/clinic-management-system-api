const { Router } = require('express');
const { getAllPatient, createNewPatient, updatePatient, getPatientInfo } = require('../services/userMaintaince');
const userMaintenanceRouter = Router();

userMaintenanceRouter.get('/', async (req, res) => {
  await getAllPatient(req, res);
});
userMaintenanceRouter.post('/', async (req, res) => {
  await createNewPatient(req, res);
});
userMaintenanceRouter.get('/:userId', async (req, res) => {
  await getPatientInfo(req, res);
});
userMaintenanceRouter.put('/:userId', async (req, res) => {
  await updatePatient(req, res);
});
module.exports = userMaintenanceRouter;
