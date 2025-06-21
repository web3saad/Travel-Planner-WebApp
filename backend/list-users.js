import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// Setup dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || "mongodb+srv://arshaksd236:arshak@travel.zwkthoo.mongodb.net/?retryWrites=true&w=majority&appName=Travel";
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Create admin user schema (simplified version of your actual user model)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  avatar: String,
  user_role: Number
});

// Create user model
const User = mongoose.model('User', userSchema);

// Function to list all users
const listUsers = async () => {
  try {
    const users = await User.find({}, 'username email user_role');
    
    if (users.length === 0) {
      console.log('No users found in the database');
      return;
    }
    
    console.log('List of users:');
    console.log('--------------------------------------------------');
    console.log('| Username         | Email                | Role |');
    console.log('--------------------------------------------------');
    
    users.forEach(user => {
      const role = user.user_role === 1 ? 'Admin' : 'User';
      console.log(`| ${user.username.padEnd(17)} | ${user.email.padEnd(20)} | ${role.padEnd(4)} |`);
    });
    
    console.log('--------------------------------------------------');
    console.log(`Total users: ${users.length}`);
    
  } catch (error) {
    console.error('Error listing users:', error);
  }
};

// Main function
const main = async () => {
  // Connect to database
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }

  // List all users
  await listUsers();
  
  // Disconnect from database
  await mongoose.disconnect();
  process.exit(0);
};

// Execute the script
main();
