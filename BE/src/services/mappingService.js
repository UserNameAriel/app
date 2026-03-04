const AppMapping = require('../models/AppMapping');

async function getTemplateIdByAppId(appId) {
  const mapping = await AppMapping.findOne({ appId });

  if (!mapping) {
    const err = new Error(`No mapping found for appId: ${appId}`);
    err.statusCode = 404;
    throw err;
  }

  if (!mapping.isActive) {
    const err = new Error(`Mapping for appId ${appId} is inactive`);
    err.statusCode = 403;
    throw err;
  }

  return mapping.templateId;
}

module.exports = { getTemplateIdByAppId };
