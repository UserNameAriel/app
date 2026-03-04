const Template = require('../models/Template');

async function getRawTemplateByTemplateId(templateId) {
  const doc = await Template.findOne({ templateId });

  if (!doc) {
    const err = new Error(`No template found for templateId: ${templateId}`);
    err.statusCode = 404;
    throw err;
  }

  if (doc.status === 'disabled') {
    const err = new Error(`Template ${templateId} is disabled`);
    err.statusCode = 403;
    throw err;
  }

  return {
    schemaVersion: doc.schemaVersion,
    rawTemplate:   doc.template,
  };
}

module.exports = { getRawTemplateByTemplateId };
