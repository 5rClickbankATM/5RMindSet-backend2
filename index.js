const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

// Route and bot imports
const shopifyRouter = require('./routes/shopify');
const atlas = require('./routes/bots/atlas');
const echo = require('./routes/bots/echo');
const nova = require('./routes/bots/nova');
const rebel = require('./routes/bots/rebel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || '5r-secret',
  resave: false,
  saveUninitialized: true,
}));

// Register routes
app.use('/shopify', shopifyRouter);

// Default health check
app.get('/', (req, res) => res.send('5Rmindset Shopify Bot Backend Running'));

// Activate bots if enabled
if (process.env.ENABLE_BOTS !== 'false') {
  atlas.schedule();
  echo.schedule();
  nova.schedule();
  rebel.schedule();
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
