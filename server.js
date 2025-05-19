const express = require('express');
const mongodb = require('./data/database');
const app = express();

const PORT = process.env.PORT || 8080;

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/', require('./routes')); // Mounts routes/index.js, which includes /contacts

app.use(express.json());

// Connect to MongoDB
mongodb.intDb((error) => {
  if (error) {
    console.log('❌ Failed to connect to the database:', error.message);
    // Start server anyway for testing
    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT} (without database)`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Database connected and server is running at http://localhost:${PORT}`);
    });
  }
});


app.get('/professional', (req, res) => {
  res.json(data);
});
