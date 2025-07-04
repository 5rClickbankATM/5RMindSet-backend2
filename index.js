const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const shopifyRouter = require('./routes/shopify');
const rebel = require('./routes/bots/rebel');
const nova = require('./routes/bots/nova');
const echo = require('./routes/bots/echo');
const atlas = require('./routes/bots/atlas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || '5r-secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/shopify', shopifyRouter);
app.get('/', (req, res) => res.send('5Rmindset Shopify Bot Backend Running'));

if (process.env.ENABLE_BOTS !== 'false') {
  rebel.schedule();
  nova.schedule();
  echo.schedule();
  atlas.schedule();
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
