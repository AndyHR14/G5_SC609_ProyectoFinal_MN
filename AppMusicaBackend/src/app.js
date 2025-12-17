const express = require('express');  
const bodyParser = require('body-parser');  
const connectDB = require('./config/db');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Conectar a la base de datos  
connectDB();

// Middleware  
app.use(bodyParser.json());
app.use(cors());

// Rutas  
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));