const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});