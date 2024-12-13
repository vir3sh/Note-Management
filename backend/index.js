const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');

const app = express();

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/Book", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Routes
app.use('/api/user', userRoutes);

// Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
