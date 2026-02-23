const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

require('./config/passport');

const authRoutes = require('./routes/auth');
const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');
const suggestsRoutes = require('./routes/suggests');
const suggestNewRoutes = require('./routes/suggest-new');
const submissionsRoutes = require('./routes/submissions');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
if (process.env.NODE_ENV !== 'production') {
  app.use('/auth', require('./routes/auth-test'));
}
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/suggest-edit', suggestsRoutes);
app.use('/api/suggest-new', suggestNewRoutes);
app.use('/api/submissions', submissionsRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
