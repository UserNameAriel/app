const express = require('express');
const router = express.Router();

/**
 * POST /action/saveUser
 * Body: { time: number, ...payload }
 */
router.post('/action/saveUser', (req, res) => {
  const { time, ...rest } = req.body;
  console.log('[saveUser] called at', new Date(time).toISOString(), rest);
  return res.json({ ok: true, receivedAt: time });
});

module.exports = router;
