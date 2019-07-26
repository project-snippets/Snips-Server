/**
 * Error object containing user-friendly message and HTTP status code
 */
class ErrorWithHttpStatus extends Error {
  /**
   * @param {string} message User-friendly error message
   * @param {number} status HTTP status code
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

module.exports = ErrorWithHttpStatus;
