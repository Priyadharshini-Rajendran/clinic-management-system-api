const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const http = require('http');
const indexRouter = require('./routes/index');
const userRoute = require('./routes/userMaintenance');
const appointmentRoute = require('./routes/appointment');
const loginRoute = require('./routes/login');
const database = require('./database/database');
const port = 3000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
app.use('/user', userRoute);
app.use('/appointment', appointmentRoute);
app.use('/login', loginRoute);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});
database.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});
const server = http.createServer(app);
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`); // eslint-disable-line no-console
}

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('listening', onListening);
module.exports = app;
