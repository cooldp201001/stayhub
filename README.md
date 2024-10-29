# Hotel Management System

A web-based hotel management system built using **Node.js**, **Express**, **MongoDB**, **EJS**, and various middleware tools. It offers an efficient way to manage hotels, users, and bookings through features like user authentication, booking management, and an admin dashboard.

---

## Features

### User Side
- **User Registration and Login**:  
  Secure sign-up and login using **bcrypt** for password hashing and **jsonwebtoken** for session management.
- **Hotel Search and Booking**:  
  Users can search hotels, view detailed information, and book rooms.
- **Manage Personal Bookings**:  
  Users can view, update, or cancel their bookings from their profile.
- **Profile Management**:  
  Users can update their profile information and view booking history.

### Admin Panel
- **Admin Authentication**:  
  Admin login ensures only authorized access to management functionalities.
- **Manage Users**:  
  Admins can view, update, and delete users.
- **Manage Hotels**:  
  Add, update, or remove hotels from the system.
- **Manage Bookings**:  
  View and manage all user bookings.

---

## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing users, hotels, and bookings.
- **Mongoose**: Object modeling for MongoDB in Node.js.

### Frontend:
- **EJS**: Template engine for dynamic HTML rendering.

### Authentication & Security:
- **bcrypt**: Password hashing.
- **jsonwebtoken**: Token-based authentication.
- **express-session**: Session management.
- **connect-flash**: Flash messages for displaying notifications.

### Middleware & Utilities:
- **body-parser**: Parses incoming request bodies.
- **cookie-parser**: Parses cookies.
- **cors**: Enables cross-origin requests.
- **dotenv**: Loads environment variables.
- **axios**: HTTP client for making API requests.

---

## Installation & Setup

### 1. Clone the Repository:
```bash
git clone <repository-url>
cd hotel-management-system
```
### 2. Install Dependencies:
```bash
npm install
```

