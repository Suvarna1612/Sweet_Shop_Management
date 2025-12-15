# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication, product management, and administrative features.

## 🍬 Project Overview

This application provides a comprehensive solution for sweet shop management, featuring:
- User registration and authentication
- Product catalog with categories (Bengali Sweets, Dry Fruit Sweets, Milk Sweets, etc.)
- Inventory management with stock tracking
- Administrative dashboard for shop owners
- Responsive React frontend with modern UI

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Jest** for testing with MongoDB Memory Server

### Frontend
- **React 19** with modern hooks
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **ESLint** for code quality

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Database configuration
│   │   └── utils/          # Utility functions
│   ├── tests/              # Test files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── services/       # API services
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sweet-shop-management
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Environment Configuration

1. **Backend Environment** (`backend/.env`)
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

2. **Frontend Environment** (`frontend/.env`)
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

### Frontend Tests
```bash
cd frontend
npm run lint           # Run ESLint
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Sweet Management
- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Create new sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet

## 🍭 Sweet Categories

The application supports the following sweet categories:
- Bengali Sweets
- Dry Fruit Sweets
- Milk Sweets
- Pure Ghee Sweets
- Sugarless Sweets
- Chocolates

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes for administrative functions
- Secure password hashing with bcrypt

## 📱 Features

### User Features
- Browse sweet catalog by category
- View detailed product information
- Purchase sweets (with stock validation)
- User account management

### Admin Features
- Add, edit, and delete sweets
- Manage inventory and stock levels
- View sales and user data
- Administrative dashboard

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred platform (Heroku, AWS, etc.)
3. Ensure MongoDB connection is configured for production

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

## My AI Usage

### AI Tools Used
I utilized **Kiro AI Assistant** extensively throughout the development of this Sweet Shop Management System project.

### How I Used AI

**Backend Development:**
- I used Kiro to help structure the Express.js application architecture, including setting up proper MVC patterns with controllers, models, and routes
- Kiro assisted in creating the MongoDB schemas, particularly the Sweet model with its validation rules, virtual properties, and instance methods for purchase/restock functionality
- I leveraged AI to implement JWT authentication middleware and bcrypt password hashing with proper security practices
- Kiro helped generate comprehensive Jest test suites, including unit tests for models and integration tests for API endpoints using MongoDB Memory Server

**Frontend Development:**
- I used Kiro to set up the React application structure with modern React 19 features and hooks
- AI assisted in creating reusable components and implementing React Router for navigation
- Kiro helped establish the authentication context and protected route patterns
- I utilized AI to implement responsive design patterns and user interface components

**Database Design:**
- Kiro assisted in designing the MongoDB schema with proper indexing strategies for efficient searching
- AI helped implement data validation rules and business logic methods within the Mongoose models
- I used Kiro to create database seeding scripts for initial admin user setup

**Testing Strategy:**
- AI helped establish a comprehensive testing framework using Jest with proper setup and teardown procedures
- Kiro assisted in writing both unit tests for individual components and integration tests for API endpoints
- I leveraged AI to implement test coverage reporting and continuous integration practices

**Documentation and Code Quality:**
- Kiro helped maintain consistent code formatting and ESLint configuration
- AI assisted in writing comprehensive API documentation and inline code comments
- I used Kiro to create this detailed README with proper project structure and setup instructions

### Reflection on AI Impact

**Positive Impacts:**
- **Accelerated Development:** AI significantly reduced development time by providing boilerplate code and suggesting best practices, allowing me to focus on business logic rather than setup
- **Code Quality:** Kiro helped maintain consistent coding standards and suggested improvements for security, performance, and maintainability
- **Learning Enhancement:** Working with AI exposed me to modern development patterns and best practices I might not have discovered independently
- **Testing Coverage:** AI assistance enabled me to create more comprehensive test suites than I would have written manually, improving code reliability

**Workflow Integration:**
- I found AI most valuable during the initial setup phases and when implementing complex features like authentication and database relationships
- The iterative nature of working with Kiro allowed me to refine implementations and explore different approaches quickly
- AI helped bridge knowledge gaps, particularly in areas like JWT implementation and MongoDB optimization techniques

**Areas for Human Oversight:**
- While AI provided excellent starting points, I needed to review and customize the generated code to match specific project requirements
- Business logic and user experience decisions still required human judgment and domain expertise
- Final testing and debugging required manual verification to ensure all edge cases were properly handled

Overall, AI served as an invaluable development partner, enhancing productivity while maintaining code quality and helping me learn new technologies and patterns along the way.