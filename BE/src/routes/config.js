const express = require('express');
const router = express.Router();
const { getTemplateIdByAppId }      = require('../services/mappingService');
const { getRawTemplateByTemplateId } = require('../services/templateService');
const { sanitizeSchema }             = require('../services/sanitizeSchema');

router.get('/config', async (req, res, next) => {
  try {
    const appId = Number(req.query.appId || process.env.APP_ID);

    if (!appId || isNaN(appId)) {
      return res.status(400).json({ error: 'BAD_REQUEST', message: 'appId is required and must be a number' });
    }

    const templateId                    = await getTemplateIdByAppId(appId);
    const { rawTemplate, schemaVersion } = await getRawTemplateByTemplateId(templateId);
    const safeSchema                     = sanitizeSchema({ rawTemplate, schemaVersion });

    return res.json({ appId, templateId, safeSchema });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
