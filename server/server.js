import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';    

dotenv.config();

const app = express();

// Determine environment and set appropriate origin
const isDevelopment = process.env.NODE_ENV !== 'production';
const corsOrigin = isDevelopment 
  ? ['http://localhost:5173', 'https://api.vapi.ai'] 
  : ['https://prepwise-self.vercel.app', 'https://api.vapi.ai'];

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());
app.use(cookieParser());
  
import authRoutes from "./Routes/auth.routes.js";
import vapiRoutes from "./Routes/vapi.routes.js";

app.use('/api/auth', authRoutes);
app.use('/api/vapi', vapiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for origin: ${corsOrigin}`);
});