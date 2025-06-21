#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== MERN Travel & Tourism App Launcher ===${NC}"

# First stop any running servers
echo -e "${YELLOW}Stopping any previously running servers...${NC}"
./stop-servers.sh

# Create uploads directory if it doesn't exist
mkdir -p backend/uploads
echo -e "${GREEN}✓ Ensured uploads directory exists${NC}"

# Check if cors.json exists
if [ ! -f "cors.json" ]; then
    echo -e "${YELLOW}Creating cors.json file for Firebase Storage...${NC}"
    cat > cors.json << EOF
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Authorization", "Content-Length", "User-Agent", "x-goog-resumable"]
  }
]
EOF
    echo -e "${GREEN}✓ Created cors.json file${NC}"
fi

# Start the backend server in a new terminal window
echo -e "${YELLOW}Starting backend server...${NC}"
osascript -e 'tell application "Terminal" to do script "cd '$PWD' && cd backend && npm start"' &

# Wait a moment for backend to start
sleep 2

# Start the frontend server in a new terminal window
echo -e "${YELLOW}Starting frontend server...${NC}"
osascript -e 'tell application "Terminal" to do script "cd '$PWD' && cd client && npm run dev"' &

echo -e "${GREEN}✓ Servers started in separate terminal windows${NC}"
echo -e "${GREEN}✓ Backend server should be running at http://localhost:8000${NC}"
echo -e "${GREEN}  (or http://localhost:8001 if port 8000 was already in use)${NC}"
echo -e "${GREEN}✓ Frontend server should be running at http://localhost:5173${NC}"
echo -e "${YELLOW}Note: Use the stop-servers.sh script to stop all servers when done${NC}"
echo -e "${BLUE}=== Check the terminal windows for actual server URLs ===${NC}"
