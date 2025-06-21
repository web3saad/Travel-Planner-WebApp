// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Log Firebase configuration for debugging (without exposing API key)
console.log('Firebase configuration:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  apiKeyProvided: firebaseConfig.apiKey ? 'Yes' : 'No'
});

// Check for missing or invalid configuration
if (!firebaseConfig.storageBucket) {
  console.error('CRITICAL ERROR: Firebase Storage Bucket is not configured!');
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Test storage initialization
import { getStorage } from 'firebase/storage';
try {
  const storage = getStorage(app);
  console.log('Firebase Storage initialized successfully:', storage.app.options.storageBucket);
} catch (error) {
  console.error('Firebase Storage initialization failed:', error);
}

export { app };
