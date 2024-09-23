// Middleware to extract token info
const fetchUser = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const tokenPart = token.split(" ")[1];

  jwt.verify(tokenPart, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    req.user = decoded;
    next();
  });
};
export default fetchUser;
