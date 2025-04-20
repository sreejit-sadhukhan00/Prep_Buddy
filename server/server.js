import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';    

dotenv.config();

const app=express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
  app.use(express.json());
  app.use(cookieParser());
  

    import authRoutes from "./Routes/auth.routes.js";
    import vapiRoutes from "./Routes/vapi.routes.js";

     app.use('/api/auth',authRoutes);
     app.use('/api/vapi',vapiRoutes);
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });