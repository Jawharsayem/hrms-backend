// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectCosmosDB } = require('./config/cosmosClient');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const familyRoutes = require('./routes/familyRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectCosmosDB();
// Serve static files from /uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes)
app.use('/api/tasks', taskRoutes);
app.use('/api/salary-info', salaryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/family', familyRoutes);

// Error Handling
app.use(errorHandler);

// Server
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on http://0.0.0.0:5000");
});

