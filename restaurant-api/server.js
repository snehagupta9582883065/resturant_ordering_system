const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json({ extended: false })); 

// Define Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/menu', require('./src/routes/menu'));
app.use('/api/orders', require('./src/routes/order'));
app.use('/api/admin', require('./src/routes/admin'));

// Basic route
app.get('/', (req, res) => res.send('Restaurant API Running!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));