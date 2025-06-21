#!/bin/bash

echo "====================================="
echo "Restarting server with new file upload implementation"
echo "====================================="

echo "1. Creating uploads directory (if not exists)..."
mkdir -p backend/uploads

echo "2. Setting permissions for uploads directory..."
chmod -R 755 backend/uploads

echo "3. Stopping any existing servers..."
pkill -f "node backend/index.js" || true

echo "4. Starting server..."
npm start

echo "====================================="
echo "Server restarted with file upload capability"
echo "====================================="
