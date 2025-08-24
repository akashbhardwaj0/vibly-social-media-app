import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import connectDB from './config/dbConnection.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent
}))
app.use(express.json())
app.use(cookieParser());


app.use("/api/auth/", authRouter)
app.use("/api/user/", userRouter)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});