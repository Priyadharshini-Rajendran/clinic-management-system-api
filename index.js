const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const http = require('http');
const indexRouter = require('./routes/index');
const port = 3000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
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
