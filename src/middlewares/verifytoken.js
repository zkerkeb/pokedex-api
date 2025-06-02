import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log(token);
      if (!token) {
        console.log("No token provided");
        return res.status(401).send({ message: "Unauthorized" });
      }
        jwt.verify(token, process.env.JWT_SECRET)
        next();
      } catch (error) {
        console.log(error);
        return res.status(401).send({ message: "Unauthorized" });
      }
  }

  export default verifyToken;