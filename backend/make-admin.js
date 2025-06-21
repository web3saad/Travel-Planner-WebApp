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

// Function to promote user to admin
const promoteToAdmin = async (email) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`User with email ${email} not found`);
      return false;
    }
    
    user.user_role = 1;
    await user.save();
    
    console.log(`User ${email} has been promoted to admin (user_role: 1)`);
    return true;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    return false;
  }
};

// Main function
const makeAdmin = async () => {
  // Get email from command line arguments
  const userEmail = process.argv[2];
  
  if (!userEmail) {
    console.error('Please provide user email as an argument');
    console.log('Usage: node make-admin.js user@example.com');
    process.exit(1);
  }

  // Connect to database
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }

  // Promote user to admin
  const success = await promoteToAdmin(userEmail);
  
  // Disconnect from database
  await mongoose.disconnect();
  
  if (success) {
    console.log('Operation completed successfully');
    process.exit(0);
  } else {
    console.error('Operation failed');
    process.exit(1);
  }
};

// Execute the script
makeAdmin();
