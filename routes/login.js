const { Router } = require('express');
const { loginUser } = require('../services/login');
const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  await loginUser(req, res);
});

module.exports = loginRouter;
