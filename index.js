const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const axios = require('axios');
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

app.get('/test-shopify-api', async (req, res) => {
  try {
    const shop = process.env.SHOPIFY_STORE_URL;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;

    if (!shop || !token) {
      return res.status(400).json({ success: false, error: 'Missing SHOPIFY_STORE_URL or SHOPIFY_ADMIN_TOKEN in environment variables.' });
    }

    const response = await axios.get(`https://${shop}/admin/api/2023-10/products.json`, {
      headers: {
        'X-Shopify-Access-Token': token
      }
    });
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('Shopify API Test Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

if (process.env.ENABLE_BOTS !== 'false') {
  try {
    rebel.schedule();
    nova.schedule();
    echo.schedule();
    atlas.schedule();
  } catch (botError) {
    console.error('Error scheduling bots:', botError.message);
  }
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

