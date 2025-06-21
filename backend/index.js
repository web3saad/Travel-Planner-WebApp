import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv first with path to root .env file
const envPath = path.join(__dirname, '../.env');
console.log('Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Debug logs
console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URL:", process.env.MONGO_URL ? "is defined" : "is undefined");

// If MONGO_URL is undefined, use the hardcoded connection string as fallback
const mongoURI = process.env.MONGO_URL || "mongodb+srv://arshaksd236:arshak@travel.zwkthoo.mongodb.net/?retryWrites=true&w=majority&appName=Travel";
console.log("Connecting to MongoDB with URI:", mongoURI.substring(0, 20) + "...");

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

app.use(
  cors({
    origin: process.env.SERVER_URL,
  })
);

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());

// Import upload route
import uploadRoute from "./routes/upload.route.js";

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/upload", uploadRoute);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV_CUSTOM === "production") {
  //static files
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
} else {
  // //rest api
  app.use("/", (req, res) => {
    res.send("Welcome to travel and tourism app");
  });
}

//port
const PORT = process.env.PORT || 8000;
let currentPort = PORT;

// Try to start server with port fallback mechanism
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Error: Port ${port} is already in use.`);
      
      // Try with a different port if the original is busy
      if (port === PORT) {
        const fallbackPort = parseInt(port) + 1;
        console.log(`Attempting to use fallback port ${fallbackPort}...`);
        startServer(fallbackPort);
      } else {
        console.error(`Failed to find an available port.`);
        console.error(`Please run ./stop-servers.sh to stop all running servers.`);
        process.exit(1);
      }
    } else {
      console.error(`Server error:`, err);
      process.exit(1);
    }
  });
  
  return server;
};

// Start the server
const server = startServer(currentPort);
