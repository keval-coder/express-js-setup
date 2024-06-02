export class ApiError extends Error {
  constructor(status, error, isOperational = true, stack = "") {
    console.log(error, "ApiError");
    console.log(error?.message, "Error message");
    super(error);
    this.status = status;
    this.isOperational = isOperational;
    this.message = error?.message || error;
    if (error?.stack) {
      this.stack = error?.stack;
    }

    console.log(this, "+++++");

    Error.captureStackTrace(this, this.constructor);
  }
}
