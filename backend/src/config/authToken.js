import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getAuthToken = async (userId) => {
  try {
    const token = await Jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    return response.status(500).json({ message: Error `generating token ${error}` });
  }
};

export default getAuthToken;
