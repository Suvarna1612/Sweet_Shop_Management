#  Sweet Shop Management System

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)

> Full-stack web application for managing sweet shop inventory with authentication, stock tracking, and admin dashboard.

##  Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm

### Installation

**1. Clone Repository**
```bash
git clone https://github.com/Suvarna1612/Sweet_Shop_Management.git
cd Sweet_Shop_Management
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
```

**3. Frontend Setup**
```bash
cd ../frontend
npm install
```

**4. Run Application**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access:** 
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Health Check: `http://localhost:5000/health`

##  Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
**Frontend:** React 19, Vite, React Router, Axios, Context API  
**Testing:** Jest, Supertest, MongoDB Memory Server

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT-based registration and login with bcrypt password hashing
- 🛒 **Browse & Search** - Filter sweets by category, name, and price range
- 📦 **Purchase System** - Buy sweets with automatic stock validation and updates
- 👤 **User Profile** - Manage account information
- 📱 **Responsive UI** - Works seamlessly on desktop, tablet, and mobile devices

### Admin Features
- ➕ **Inventory Management** - Full CRUD operations for sweet products
- 📊 **Dashboard** - Overview of inventory, stock levels, and user activity
- 🔄 **Restock Control** - Add inventory with restock functionality
- 🏷️ **Category Organization** - Manage 6 traditional sweet categories
- 👥 **User Management** - View registered users and their activities

##  Project Structure

```
Sweet_Shop_Management/
 backend/
    src/
       controllers/    # Business logic
       models/         # MongoDB schemas
       routes/         # API routes
       middleware/     # Auth & validation
       config/         # Database config
    tests/              # Unit & integration tests
 frontend/
    src/
        components/     # Reusable UI components
        pages/          # Page components
        context/        # Auth context
        services/       # API service layer
```

##  Testing

```bash
cd backend
npm test              # Run all tests
npm run test:coverage # Coverage report
```
### For Admin login 
username: admin@sksweets.com
password: Admin@123

**Sweet Categories:** Bengali Sweets, Dry Fruit Sweets, Milk Sweets, Pure Ghee Sweets, Sugarless Sweets, Chocolates



## 🤖 AI Usage Disclosure

### AI Tools Used
I used **ChatGPT**, **GitHub Copilot**, and **Kiro** as learning and development aids while building this system.

### How I Used AI

**Backend Development:**
- ChatGPT helped me understand **Test-Driven Development (TDD)** and write Jest tests
- Used AI to debug test failures and understand authentication flows

- Final logic was written and adjusted manually

**Frontend Development:**
- GitHub Copilot accelerated React component and JSX development
- Kiro helped debug frontend-backend integration issues
- All generated code was reviewed and modified to meet requirements

**Testing:**
- ChatGPT explained test design patterns and edge case handling
- Learned Jest, Supertest, and Express testing through AI guidance
- Manually refined tests to align with application logic

### Learning Outcomes
Through AI-assisted development, I gained:

- Test-Driven Development experience
- Authentication/authorization Debugging efficiently


**Note:** AI tools were used for learning assistance. All code was reviewed, understood, and modified to meet project requirements.



## 👥 Author

**Suvarna** - [@Suvarna1612](https://github.com/Suvarna1612)


</div>
