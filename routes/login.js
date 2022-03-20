const { Router } = require('express');

const loginRouter = Router();

loginRouter.post('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

module.exports = loginRouter;
