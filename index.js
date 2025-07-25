// New index.js
require('dotenv').config();

console.log("ENV VARS CHECK");
console.log("SHOPIFY_STORE_URL =", process.env.SHOPIFY_STORE_URL);
console.log("SHOPIFY_ADMIN_TOKEN is set =", !!process.env.SHOPIFY_ADMIN_TOKEN);

const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: true
}));

app.get('/test-shopify-api', async (req, res) => {
  const storeUrl = "nyrepd-gh.myshopify.com"; // Hardcoded for test
  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;

  console.log("Calling Shopify API with storeUrl =", storeUrl);
  console.log("Available ENV Vars:", process.env);

  try {
    const response = await axios.get(`https://${storeUrl}/admin/api/2023-07/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json'
      }
    });
    res.json({ success: true, shop: response.data });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message, details: error.response?.data });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
