import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// Middleware to check if the user is authenticated
 const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access: Token not found" });
    }
    const verifyToken = await Jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId; // Attach user ID to request object
    next();
  } catch (error) {
    return res.status(500).json({ message: `Error verifying token: ${error}` });
  }
};

export default isAuth;