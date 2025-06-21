import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from different locations
console.log('\n--- CHECKING ROOT .ENV ---');
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('PORT from root:', process.env.PORT);
console.log('MONGO_URL from root:', process.env.MONGO_URL ? 'is defined' : 'is undefined');
console.log('JWT_SECRET from root:', process.env.JWT_SECRET ? 'is defined' : 'is undefined');

// Reset env variables for testing
process.env.PORT = undefined;
process.env.MONGO_URL = undefined;
process.env.JWT_SECRET = undefined;

// Check backend .env
console.log('\n--- CHECKING BACKEND .ENV ---');
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });
console.log('PORT from backend:', process.env.PORT);
console.log('MONGO_URL from backend:', process.env.MONGO_URL ? 'is defined' : 'is undefined');
console.log('JWT_SECRET from backend:', process.env.JWT_SECRET ? 'is defined' : 'is undefined');

// Check client .env (should have Firebase variables)
console.log('\n--- CHECKING CLIENT .ENV (Using fs to read directly) ---');
import fs from 'fs';
try {
  const clientEnvPath = path.join(__dirname, 'client', '.env');
  const clientEnv = fs.readFileSync(clientEnvPath, 'utf8');
  console.log('Client .env file exists and contains:');
  console.log(clientEnv.split('\n').map(line => 
    line.includes('KEY') ? line.split('=')[0] + '=[HIDDEN]' : line
  ).join('\n'));
} catch (error) {
  console.error('Error reading client .env:', error.message);
}

// Summary
console.log('\n--- SUMMARY ---');
console.log('If you can see "is defined" for the backend variables, your server should work correctly.');
console.log('If you can see Firebase variables in the client .env, your frontend should work correctly.');
console.log('If any files are missing or variables are undefined, you need to fix your .env files.');
