#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Stopping all running servers...${NC}"

# Kill backend server (port 8000)
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Stopping backend server on port 8000...${NC}"
    kill -9 $(lsof -t -i:8000) 2>/dev/null
    # Wait a moment to ensure the process is terminated
    sleep 1
    # Check again and force kill if still running
    if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}Backend server still running. Force killing...${NC}"
        PID=$(lsof -Pi :8000 -sTCP:LISTEN -t)
        kill -9 $PID 2>/dev/null
        echo -e "${RED}Killed process with PID: $PID${NC}"
    fi
    echo -e "${GREEN}Backend server stopped.${NC}"
else
    echo -e "${GREEN}No backend server running on port 8000.${NC}"
fi

# Kill frontend server (port 5173 - typical for Vite)
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}Stopping frontend server on port 5173...${NC}"
    kill -9 $(lsof -t -i:5173) 2>/dev/null
    echo -e "${GREEN}Frontend server stopped.${NC}"
else
    echo -e "${GREEN}No frontend server running on port 5173.${NC}"
fi

# Kill any stray node processes related to this project
NODE_PROCESSES=$(ps aux | grep "[n]ode.*MERN-Travel-Tourism-App-main" | awk '{print $2}')
if [ -n "$NODE_PROCESSES" ]; then
    echo -e "${YELLOW}Stopping other Node.js processes related to this project...${NC}"
    echo $NODE_PROCESSES | xargs -n1 kill -9 2>/dev/null
    echo -e "${GREEN}All related Node.js processes stopped.${NC}"
fi

echo -e "${GREEN}All servers have been stopped.${NC}"
