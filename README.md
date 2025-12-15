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

##  API Endpoints

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

### Example API Requests

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Test@123"}'
```

**Create Sweet (Admin):**
```bash
curl -X POST http://localhost:5000/api/sweets \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Rasgulla","category":"Bengali Sweets","price":150,"quantity":50,"description":"Soft spongy sweet"}'
```

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Set environment variables (PORT, MONGODB_URI, JWT_SECRET)
2. Connect MongoDB Atlas for production database
3. Deploy backend code

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` to backend URL

## 🔧 Troubleshooting

**MongoDB Connection Failed:**
- Ensure MongoDB is running: `mongod --version`
- Check MONGODB_URI in .env file
- For Atlas: Verify IP whitelist and credentials

**CORS Errors:**
- Verify backend is running on port 5000
- Check if frontend API URL is correct
- Ensure CORS is enabled in backend

**Tests Failing:**
- Clear cache: `npm test -- --clearCache`
- Reinstall dependencies: `rm -rf node_modules && npm install`

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

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Author

**Suvarna** - [@Suvarna1612](https://github.com/Suvarna1612)

## 🙏 Acknowledgments

- Inspired by traditional Indian sweet shops
- Built with modern web technologies
- Special thanks to the open-source community

---

<div align="center">

**Made with ❤️ and 🍬**

[⬆ Back to Top](#-sweet-shop-management-system)

</div>
