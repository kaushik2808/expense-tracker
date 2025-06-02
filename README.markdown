# Personal Expense Tracker

A web application to track personal expenses, built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, add expenses, and view their spending history with a chart.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (register, login, logout)
- Add, view, and delete expenses
- Visualize expenses with a chart
- Responsive design

## Technologies
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (MongoDB Atlas)
- **Other**: JWT for authentication, Mongoose for MongoDB interaction

## Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account (for the database)
- Git

## Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd expense-tracker-backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd expense-tracker-frontend
     npm install
     ```

3. **Set up environment variables**:
   - **Backend**: Copy `expense-tracker-backend/.env.example` to `expense-tracker-backend/.env` and fill in the values:
     ```bash
     cp expense-tracker-backend/.env.example expense-tracker-backend/.env
     ```
     - `MONGODB_URI`: Your MongoDB Atlas connection string.
     - `JWT_SECRET`: A secure key for JWT (generate using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
     - `PORT`: Backend port (default: 5000).
     - `FRONTEND_URL`: Frontend URL (default: `http://localhost:3000` for development).
   - **Frontend**: Copy `expense-tracker-frontend/.env.example` to `expense-tracker-frontend/.env` and fill in the values:
     ```bash
     cp expense-tracker-frontend/.env.example expense-tracker-frontend/.env
     ```
     - `REACT_APP_API_URL`: Backend URL (default: `http://localhost:5000` for development).

4. **Set up MongoDB Atlas**:
   - Create a MongoDB Atlas account and cluster.
   - Add a database user and whitelist your IP address (or allow access from anywhere for testing).
   - Update `MONGODB_URI` in `expense-tracker-backend/.env` with your Atlas connection string.

## Running the Application
1. **Start both servers** (from the root directory):
   ```bash
   npm start
   ```
   - This uses `concurrently` to run both the backend (`expense-tracker-backend`) and frontend (`expense-tracker-frontend`).
   - Backend runs on `http://localhost:5000`.
   - Frontend runs on `http://localhost:3000`.

2. **Access the app**:
   - Open `http://localhost:3000` in your browser.
   - Register a new user, log in, and start tracking expenses.

## Usage
- **Register/Login**: Create an account or log in to access the dashboard.
- **Add Expense**: Enter expense details (title, amount, category, date) to track spending.
- **View Expenses**: See a list of expenses and a chart visualizing your spending.
- **Delete Expense**: Remove expenses you no longer need.

## Project Structure
```
expense-tracker/
├── expense-tracker-backend/    # Backend (Node.js/Express)
│   ├── models/                 # Mongoose models (User, Expense)
│   ├── routes/                 # API routes (auth, expenses)
│   ├── server.js               # Backend entry point
│   ├── .env.example           # Template for backend environment variables
│   └── package.json
├── expense-tracker-frontend/   # Frontend (React)
│   ├── src/                    # React source code
│   │   ├── components/         # React components
│   │   ├── contexts/           # React context (AuthContext)
│   │   └── App.js
│   ├── public/                 # Static assets
│   ├── .env.example           # Template for frontend environment variables
│   └── package.json
├── .gitignore                  # Git ignore file
├── package.json                # Root package.json with scripts to run both servers
└── README.md                   # Project documentation
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Create a pull request.

## License
This project is licensed under the MIT License.