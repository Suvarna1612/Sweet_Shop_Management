# 🍬 Sweet Shop Management System

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, full-stack web application for managing sweet shop inventory with robust authentication, real-time stock tracking, and an intuitive admin dashboard.

## ✨ Features

### 👤 User Features
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

### Frontend Testing

```bash
# Navigate to frontend directory
cd frontend

# Run linting
npm run lint

# Run component tests (if configured)
npm test
```

### Manual API Testing

You can use tools like **Postman**, **Insomnia**, or **curl** to test the API:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'

# Get all sweets (requires authentication)
curl -X GET http://localhost:5000/api/sweets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

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

## 🍭 Sweet Categories

The application supports the following authentic Indian sweet categories:

| Category | Description | Examples |
|----------|-------------|----------|
| 🥮 **Bengali Sweets** | Traditional Bengali delicacies | Rasgulla, Sandesh, Mishti Doi |
| 🌰 **Dry Fruit Sweets** | Sweets made with nuts | Kaju Katli, Badam Barfi |
| 🥛 **Milk Sweets** | Milk-based traditional sweets | Kalakand, Peda, Burfi |
| 🧈 **Pure Ghee Sweets** | Sweets made with clarified butter | Ghee Mysore Pak, Ghee Ladoo |
| 🍬 **Sugarless Sweets** | Diabetic-friendly options | Sugar-free Barfi, Ladoo |
| 🍫 **Chocolates** | Modern chocolate treats | Chocolate Barfi, Truffles |

## 🔐 Authentication & Authorization

### Security Features

- **Password Security:**
  - Passwords hashed using bcrypt with salt rounds
  - Minimum password length: 6 characters
  - Secure password validation on registration

- **JWT Authentication:**
  - Token-based authentication
  - Secure token storage in localStorage
  - Token expiration: 7 days (configurable)
  - Protected routes requiring valid tokens

- **Role-Based Access Control (RBAC):**
  - **User Role:** Browse, purchase sweets
  - **Admin Role:** Full CRUD operations, inventory management

- **Input Validation:**
  - Email format validation
  - Required field validation
  - Data type validation
  - SQL injection prevention
  - XSS protection

### Default Admin Credentials

After seeding the database:
```
Email: admin@sweetshop.com
Password: Admin@123
```

**⚠️ Important:** Change these credentials in production!

## 🎨 User Interface

### Design Highlights

- **Modern & Clean:** Gradient backgrounds, card-based layouts
- **Responsive:** Mobile-first design, works on all screen sizes
- **Color Palette:**
  - Primary: Pink (#ff6b9d)
  - Secondary: Yellow (#ffeaa7)
  - Accent: Blue (#74b9ff)
  - Success: Mint (#55efc4)
  - Danger: Red (#ff7675)

- **Components:**
  - Sticky navigation bar with user menu
  - Product cards with hover effects
  - Modal dialogs for forms
  - Toast notifications for feedback
  - Search and filter interface
  - Loading states and error handling

## 🚀 Deployment

### Backend Deployment

#### Deploy to Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_production_secret
   heroku config:set JWT_EXPIRE=7d
   ```

4. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   # or
   cd backend
   git init
   heroku git:remote -a your-app-name
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

#### Deploy to Railway/Render

1. Connect your GitHub repository
2. Set root directory to `backend`
3. Add environment variables in dashboard
4. Deploy automatically on push

### Frontend Deployment

#### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment:**
   - Add `VITE_API_URL` in Vercel dashboard
   - Set to your backend URL

#### Deploy to Netlify

1. **Build the Project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or via Dashboard:**
   - Drag and drop the `dist` folder
   - Configure `VITE_API_URL` in environment variables

#### Manual Deployment

```bash
cd frontend
npm run build

# The dist folder contains production-ready files
# Upload to any static hosting service:
# - GitHub Pages
# - AWS S3 + CloudFront
# - Azure Static Web Apps
# - DigitalOcean App Platform
```

### Production Checklist

- [ ] Change default admin credentials
- [ ] Update JWT_SECRET to a strong random string
- [ ] Configure MongoDB Atlas with IP whitelist
- [ ] Enable CORS for your production domain
- [ ] Set NODE_ENV to "production"
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure proper logging
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Enable rate limiting
- [ ] Configure backup strategy for database
- [ ] Review and update security headers

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues

**Problem: MongoDB connection failed**
```
Solution:
- Check if MongoDB is running: `mongod --version`
- Verify MONGODB_URI in .env
- For Atlas: Check network access and IP whitelist
- Ensure database name is correct
```

**Problem: JWT authentication errors**
```
Solution:
- Verify JWT_SECRET is set in .env
- Check token expiration
- Ensure Authorization header format: "Bearer <token>"
```

**Problem: Tests failing**
```
Solution:
- Clear test cache: `npm test -- --clearCache`
- Ensure MongoDB Memory Server is installed
- Check Node.js version compatibility
```

#### Frontend Issues

**Problem: API calls failing (CORS errors)**
```
Solution:
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Ensure CORS is configured in backend
- Use proxy in vite.config.js for development
```

**Problem: Build errors**
```
Solution:
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`
```

**Problem: Environment variables not loading**
```
Solution:
- Restart dev server after .env changes
- Verify variables start with VITE_ prefix
- Check .env file location (must be in frontend root)
```

### Getting Help

- 📧 **Email:** support@sweetshop.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/Suvarna1612/Sweet_Shop_Management/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Suvarna1612/Sweet_Shop_Management/discussions)

## 🤝 Contributing

We welcome contributions to the Sweet Shop Management System! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Sweet_Shop_Management.git
   cd Sweet_Shop_Management
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

4. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test Your Changes**
   ```bash
   # Backend
   cd backend
   npm test

   # Frontend
   cd frontend
   npm run lint
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # or
   git commit -m "fix: resolve bug in sweet creation"
   ```

   **Commit Message Convention:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

7. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Submit for review

### Contribution Guidelines

- **Code Quality:**
  - Follow ESLint rules
  - Write meaningful variable names
  - Keep functions small and focused
  - Add JSDoc comments for functions

- **Testing:**
  - Write tests for new features
  - Ensure existing tests pass
  - Aim for good test coverage

- **Documentation:**
  - Update README if needed
  - Add inline comments
  - Document API changes
  - Update examples

- **Pull Request Guidelines:**
  - One feature/fix per PR
  - Clear PR title and description
  - Reference related issues
  - Update CHANGELOG if applicable

### Development Setup

```bash
# Install dependencies
npm install

# Backend dev mode with auto-reload
cd backend
npm run dev

# Frontend dev mode with hot reload
cd frontend
npm run dev

# Run tests in watch mode
npm run test:watch
```

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage improvements
- 🌐 Internationalization (i18n)
- ♿ Accessibility improvements

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Sweet Shop Management System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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