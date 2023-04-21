import Jwt from "jsonwebtoken";

export const auth = (request, respond, next) => {
  try {
    const token = request.header("x-auth-token");
    Jwt.verify(token, process.env.secret_key);
  } catch (err) {
    respond.status(401).send({ message: err.message });
  }
};
