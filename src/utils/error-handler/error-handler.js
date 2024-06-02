export function ErrorHandler(err, req, res, next) {
  const status = err.status || 500;

  let errorMessage = err.message;
  if (status === 404) {
    errorMessage = `This Route ${err.message}.`;
  }

  if (status === 401 && !errorMessage) {
    errorMessage = "You are unauthorized.";
  }

  console.log(err, "Status");

  // send the error
  res.status(status).send({
    status: status,
    path: req.url,
    message: errorMessage,
    timestamps: new Date(),
  });
}
