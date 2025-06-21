# Starting and Stopping the Application

This guide explains how to properly start and stop the Travel & Tourism App.

## Starting the Application

To start both the backend and frontend servers, run:

```bash
./start-app.sh
```

This will:
1. Stop any previously running servers to avoid port conflicts
2. Create the necessary directories and configuration files
3. Start the backend server in a new terminal window
4. Start the frontend server in another terminal window

The backend server will typically run on port 8000, but it will automatically use port 8001 if 8000 is already in use.
The frontend server will typically run on port 5173 (Vite's default port).

## Stopping the Application

When you're done using the application, stop all servers by running:

```bash
./stop-servers.sh
```

This will:
1. Stop any processes using port 8000 (backend)
2. Stop any processes using port 5173 (frontend)
3. Kill any other Node.js processes related to this project

## Troubleshooting Port Issues

If you encounter port-in-use errors:

1. First, try running the stop script:
   ```bash
   ./stop-servers.sh
   ```

2. If that doesn't work, you can manually check and kill the process:
   ```bash
   lsof -i :8000    # Check what's using port 8000
   kill -9 <PID>    # Kill the process by its PID
   ```

3. Restart the application:
   ```bash
   ./start-app.sh
   ```

## Demo Payment System

The application includes a demo payment system on the booking page that allows you to:
- Enter credit card details (Visa/MasterCard format)
- Process a simulated payment
- See a confirmation message when booking is complete

No actual payments are processed - this is just a demo!
