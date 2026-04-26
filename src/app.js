require('dotenv').config();

const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const authRoutes    = require('./routes/auth');
const heroRoutes    = require('./routes/hero');
const aboutRoutes   = require('./routes/about');
const projectRoutes = require('./routes/projects');
const mediaRoutes   = require('./routes/media');
const skillRoutes   = require('./routes/skills');
const contactRoutes = require('./routes/contact');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

// ─── Security headers ────────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Rate limiting ────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, slow down.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts.' },
});

app.use(globalLimiter);

// ─── Body parser (10kb cap — blocks oversized payloads) ──────────────────────
app.use(express.json({ limit: '10kb' }));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth',     authLimiter, authRoutes);
app.use('/api/hero',     heroRoutes);
app.use('/api/about',    aboutRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media',    mediaRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/contact',  contactRoutes);

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

// ─── Global error handler ─────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
