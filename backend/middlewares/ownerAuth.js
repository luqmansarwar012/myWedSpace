import { ROLES } from "../constants.js";
import jwt from "jsonwebtoken";

const ownerAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({ error: "No authorization header found" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "No token found" });
  }
  try {
    const extToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("extracted tokenn", token);

    if (extToken.role === ROLES.OWNER) {
      next();
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: "Something went wrong in authenticating token" });
  }
};

export default ownerAuth;
