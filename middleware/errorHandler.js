const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

const errorHandler = (err, request, response, next) => {
  if (err instanceof ErrorWithHttpStatus)
    response.status(err.status).send(err.message);
  else response.status(500).send('Server error');
};

module.exports = errorHandler;
