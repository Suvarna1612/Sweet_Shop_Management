# 🍬 Sweet Shop Management System

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)

> Full-stack web application for managing sweet shop inventory with authentication, stock tracking, and admin dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/Suvarna1612/Sweet_Shop_Management.git
cd Sweet_Shop_Management

# Backend setup
cd backend
npm install
# Create .env file with: PORT, MONGODB_URI, JWT_SECRET
npm start

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

**Access:** Frontend at `http://localhost:5173` | Backend at `http://localhost:5000`

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
**Frontend:** React 19, Vite, React Router, Axios, Context API  
**Testing:** Jest, Supertest, MongoDB Memory Server

## ✨ Features

- 🔐 JWT authentication with role-based access (User/Admin)
- 🛒 Browse, search, and purchase sweets
- 📊 Admin dashboard for inventory management
- 📦 Real-time stock tracking
- 📱 Responsive design

## 📁 Project Structure

```
Sweet_Shop_Management/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   └── config/         # Database config
│   └── tests/              # Unit & integration tests
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── context/        # Auth context
│       └── services/       # API service layer
```

## 🧪 Testing

```bash
cd backend
npm test              # Run all tests
npm run test:coverage # Coverage report
```

## 📚 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/sweets` | Get all sweets | Required |
| POST | `/api/sweets` | Create sweet | Admin |
| PUT | `/api/sweets/:id` | Update sweet | Admin |
| DELETE | `/api/sweets/:id` | Delete sweet | Admin |
| POST | `/api/sweets/:id/purchase` | Purchase sweet | Required |
| GET | `/health` | Health check | Public |

**Sweet Categories:** Bengali Sweets, Dry Fruit Sweets, Milk Sweets, Pure Ghee Sweets, Sugarless Sweets, Chocolates

## 🤖 AI Usage Disclosure

### AI Tools Used
I used **ChatGPT**, **GitHub Copilot**, and **Kiro** as learning and development aids while building this system.

### How I Used AI

**Backend Development:**
- ChatGPT helped me understand **Test-Driven Development (TDD)** and write Jest tests
- Used AI to debug test failures and understand authentication flows
- Guidance on password hashing, JWT implementation, and API error handling
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
- Full-stack JavaScript proficiency
- Test-Driven Development experience
- Authentication/authorization implementation
- Debugging and problem-solving skills
- Frontend-backend integration expertise

**Note:** AI tools were used for learning assistance. All code was reviewed, understood, and modified to meet project requirements.

## 📄 License

MIT License © 2025 - See [LICENSE](LICENSE) file for details

## 👥 Author

**Suvarna** - [@Suvarna1612](https://github.com/Suvarna1612)

---

<div align="center">Made with ❤️ and 🍬</div>
- 🔐 **Secure Authentication** - JWT-based user registration and login
- 🛒 **Browse Catalog** - Explore sweets by category with search and filters
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔍 **Product Details** - View comprehensive sweet information with images
- 📦 **Purchase Management** - Buy sweets with real-time stock validation
- 👨‍💼 **User Profile** - Manage account information securely

### 🛡️ Admin Features
- ➕ **Inventory Management** - Add, edit, and delete sweets
- 📊 **Dashboard Analytics** - Track inventory and sales metrics
- 🎯 **Stock Control** - Monitor quantity levels and restock alerts
- 🏷️ **Category Management** - Organize products by sweet types
- 👥 **User Management** - View and manage registered users
- 📈 **Real-time Updates** - Instant inventory synchronization

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** + **Express.js** | Server framework |
| **MongoDB** + **Mongoose** | Database and ODM |
| **JWT** | Secure authentication |
| **bcrypt.js** | Password hashing |
| **express-validator** | Input validation |
| **Jest** + **Supertest** | Testing framework |
| **MongoDB Memory Server** | In-memory testing database |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library with modern hooks |
| **Vite** | Fast build tool and dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Context API** | State management |
| **ESLint** | Code quality and linting |

## 📁 Project Structure

```
Sweet_Shop_Management/
├── 📂 backend/
│   ├── 📂 src/
│   │   ├── 📂 config/
│   │   │   └── database.js          # MongoDB connection config
│   │   ├── 📂 controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── sweetController.js   # Sweet CRUD operations
│   │   ├── 📂 middleware/
│   │   │   ├── auth.js              # JWT verification middleware
│   │   │   └── validation.js        # Input validation rules
│   │   ├── 📂 models/
│   │   │   ├── User.js              # User schema
│   │   │   └── Sweet.js             # Sweet schema
│   │   ├── 📂 routes/
│   │   │   ├── auth.js              # Auth routes
│   │   │   └── sweet.js             # Sweet routes
│   │   ├── 📂 utils/
│   │   │   ├── auth.js              # Auth helpers
│   │   │   └── seedAdmin.js         # Admin seeder
│   │   ├── app.js                   # Express app config
│   │   └── server.js                # Server entry point
│   ├── 📂 tests/
│   │   ├── auth.test.js             # Auth unit tests
│   │   ├── auth_int.test.js         # Auth integration tests
│   │   ├── Sweet.model.test.js      # Sweet model tests
│   │   ├── User.model.test.js       # User model tests
│   │   └── setup.js                 # Test configuration
│   ├── check-admin.js               # Admin verification script
│   ├── hash-password.js             # Password hashing utility
│   └── package.json
│
├── 📂 frontend/
│   ├── 📂 public/                   # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Header.jsx           # App header
│   │   │   ├── Modal.jsx            # Modal component
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── PrivateRoute.jsx     # Protected route wrapper
│   │   │   ├── SearchFilter.jsx     # Search & filter UI
│   │   │   ├── SweetCard.jsx        # Product card
│   │   │   └── SweetForm.jsx        # Sweet create/edit form
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── 📂 pages/
│   │   │   ├── AdminPanel.jsx       # Admin dashboard
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   └── Register.jsx         # Registration page
│   │   ├── 📂 services/
│   │   │   └── api.js               # API service layer
│   │   ├── 📂 tests/                # Frontend tests
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md                        # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Suvarna1612/Sweet_Shop_Management.git
cd Sweet_Shop_Management
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env or create manually
```

Create a `backend/.env` file with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/sweetshop
# For MongoDB Atlas use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweetshop

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Admin Configuration (Optional)
ADMIN_EMAIL=admin@sweetshop.com
ADMIN_PASSWORD=Admin@123
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create environment file (optional)
```

Create a `frontend/.env` file (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# On Windows:
net start MongoDB

# On macOS/Linux:
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**Option B: MongoDB Atlas**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env`

#### 5. Seed Initial Data (Optional)

```bash
# Navigate to backend directory
cd backend

# Create an admin user
node hash-password.js

# Check admin user
node check-admin.js

# Or use the seeding utility
node src/utils/seedAdmin.js
```

### Running the Application

#### Development Mode

Open **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
# or for auto-reload with nodemon:
npm run dev
```

The backend API will be available at `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Verify Installation

1. **Check Backend Health:**
   - Visit: `http://localhost:5000/health`
   - Expected response: `{"success": true, "message": "Server is running"}`

2. **Check Frontend:**
   - Visit: `http://localhost:5173`
   - You should see the Sweet Shop landing page

3. **Test API:**
   ```bash
   curl http://localhost:5000/health
   ```
## 🧪 Testing

### Backend Testing

The backend uses **Jest** and **Supertest** for unit and integration testing with MongoDB Memory Server.

```bash
# Navigate to backend directory
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- auth.test.js
npm test -- auth_int.test.js
npm test -- Sweet.model.test.js
```

**Test Coverage:**
- ✅ User authentication (register, login)
- ✅ Password hashing and validation
- ✅ JWT token generation
- ✅ Sweet model CRUD operations
- ✅ Purchase and restock functionality
- ✅ Input validation and error handling
- ✅ API integration tests




## � API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Sweet Management Endpoints

#### Get All Sweets
```http
GET /api/sweets
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

#### Get Sweet by ID
```http
GET /api/sweets/:id
Authorization: Bearer <token>
```

#### Search Sweets
```http
GET /api/sweets/search?name=rasgulla&category=Bengali%20Sweets&maxPrice=200
Authorization: Bearer <token>
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Rasgulla",
  "category": "Bengali Sweets",
  "price": 150,
  "quantity": 50,
  "description": "Soft and spongy Bengali delicacy",
  "image": "https://example.com/rasgulla.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Sweet created successfully",
  "data": {...}
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 180,
  "quantity": 75
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <admin_token>
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 20
}
```

### Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-15T10:30:00.000Z"
}
```








## 👥 Authors & Contributors

- **Suvarna** - *Initial work* - [@Suvarna1612](https://github.com/Suvarna1612)

See also the list of [contributors](https://github.com/Suvarna1612/Sweet_Shop_Management/contributors) who participated in this project.

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by traditional Indian sweet shops
- Built with love for the sweet community 🍬
## 🤖 AI Usage Disclosure

### AI Tools Used

I used AI tools such as **ChatGPT**, **GitHub Copilot**, and **Kiro** as learning and development aids while building the Sweet Shop Management System.

### How I Used AI

#### Backend Development
- 📚 Used ChatGPT and online resources to understand **Test-Driven Development (TDD)** concepts and how to apply them in a real backend project
- 🧪 ChatGPT helped me learn how to write **Jest tests**, understand test structure, and design both unit and integration tests
- 🐛 Used AI assistance to debug failing tests, interpret error messages, and resolve issues related to request handling, validations, and authentication logic
- 🔐 AI was used as a guidance tool while implementing password hashing, authentication flows, and API error handling, but the final logic was written and adjusted manually

#### Frontend Development
- ⚡ Used **GitHub Copilot** to speed up writing React components, JSX structures, and repetitive UI-related code
- 🔌 **Kiro** was used to help debug integration issues between frontend and backend, such as API response handling and authentication flows
- ✅ All generated frontend code was reviewed and modified manually to match project requirements and ensure correctness

#### Testing Strategy
- 📖 ChatGPT was primarily used to learn how to design meaningful test cases, especially for edge cases like validation failures and authentication errors
- 💡 AI helped explain why certain tests were failing and how to fix them, which improved my understanding of Jest, Supertest, and Express request handling
- 🎯 I manually refined the tests to ensure they aligned with the application logic and followed proper TDD principles

### Learning Outcomes

Through this project with AI assistance, I gained:
- Deep understanding of full-stack JavaScript development
- Practical experience with Test-Driven Development
- Knowledge of authentication and authorization patterns
- Skills in debugging and problem-solving
- Ability to integrate frontend and backend systems

**Note:** While AI tools were used for learning and development assistance, all code was reviewed, understood, and modified to meet project requirements.





---

<div align="center">

### Made with ❤️ and 🍬

**Sweet Shop Management System** © 2025

[⬆ Back to Top](#-sweet-shop-management-system)

</div>