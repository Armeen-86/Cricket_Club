const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const clubRoutes = require('./routes/clubRoutes');
app.use('/api/clubs', clubRoutes);
const playerRoutes = require('./routes/playerRoutes');
app.use('/api/players', playerRoutes);
const tournamentRoutes = require('./routes/tournamentRoutes');
app.use('/api/tournaments', tournamentRoutes);
const matchRoutes = require('./routes/matchRoutes');
app.use('/api/matches', matchRoutes);
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);




// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB Error: ${err}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
