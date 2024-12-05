const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const app = express();

connectDB();

app.use(bodyParser.json());

// Routess
app.use('/api', recipeRoutes);


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
