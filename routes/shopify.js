const express = require('express');
const router = express.Router();

// TODO: Add Shopify OAuth + webhook logic
router.get('/auth', (req, res) => {
  res.send('Shopify OAuth endpoint placeholder');
});

module.exports = router;
