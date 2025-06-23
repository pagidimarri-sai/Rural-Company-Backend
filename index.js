require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ✅ Allow frontend on Vercel
app.use(
  cors({
    origin: [
      "http://localhost:5173",             // local dev
      "https://rural-company.vercel.app",  // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Register routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/user', require('./routes/userRoutes')); // if used

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
