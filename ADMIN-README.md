# Admin Management Scripts

These scripts help you manage admin users in the Travel & Tourism application.

## Prerequisites

1. Make sure Node.js is installed
2. Make sure the MongoDB connection is properly configured in your `.env` file

## Available Scripts

### 1. List All Users

This script shows all users in the database along with their roles.

```bash
node backend/list-users.js
```

Example output:
```
MongoDB connected successfully
List of users:
--------------------------------------------------
| Username         | Email                | Role |
--------------------------------------------------
| johndoe          | john@example.com     | User |
| sarahsmith       | sarah@example.com    | Admin|
--------------------------------------------------
Total users: 2
```

### 2. Promote a User to Admin

This script changes a user's role to admin.

```bash
node backend/make-admin.js user@example.com
```

Replace `user@example.com` with the email of the user you want to promote.

Example output:
```
MongoDB connected successfully
User john@example.com has been promoted to admin (user_role: 1)
Operation completed successfully
```

## How to Log in as Admin

1. First, create a regular user account using the signup page
2. Use the `make-admin.js` script to promote the user to admin
3. Log in with the user's email and password
4. You'll now have access to the admin dashboard and features

## Admin Features

- Access to the admin dashboard
- Manage all users
- Manage all bookings
- Add/edit/delete travel packages
- View ratings and reviews
- Access payment information
