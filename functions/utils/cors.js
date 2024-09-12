// Set allowed origins for CORS
const allowedOrigins = ["http://localhost:3000", "https://jobfit-pro.web.app", "https://jobfit-pro.firebaseapp.com"];

const cors = (request, response) => {
  const origin = request.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    response.header("Access-Control-Allow-Origin", origin);
  }

  response.header("Access-Control-Allow-Methods", "POST");
  response.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Firebase-Instance-Id-Token",
  );
};

module.exports = {cors};
