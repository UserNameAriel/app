/**
 * Validates and normalizes a single HTML block.
 * Returns null if the block should be dropped.
 */
function normalizeBlock(raw) {
  if (!raw || typeof raw !== 'object')           return null;
  if (raw.type !== 'html')                        return null;
  if (!raw.id   || typeof raw.id   !== 'string') return null;
  if (!raw.html || typeof raw.html !== 'string') return null;

  return { id: raw.id, type: 'html', html: raw.html };
}

/**
 * Sanitizes the optional theme object.
 * Only allows known color fields.
 */
function sanitizeTheme(theme) {
  if (!theme || typeof theme !== 'object' || Array.isArray(theme)) return undefined;

  const result = {};
  if (theme.primaryColor)    result.primaryColor    = theme.primaryColor;
  if (theme.backgroundColor) result.backgroundColor = theme.backgroundColor;
  if (theme.textColor)       result.textColor       = theme.textColor;

  return Object.keys(result).length ? result : undefined;
}

/**
 * Main sanitizer — HTML block flow.
 *
 * @param {{ rawTemplate: { theme?: object, blocks: object[] }, schemaVersion: number }} input
 * @returns {{ schemaVersion: number, theme?: object, body: object[] }}
 */
function sanitizeSchema({ rawTemplate, schemaVersion }) {
  if (!rawTemplate || typeof rawTemplate !== 'object') {
    throw new Error('Invalid template: must be an object');
  }

  // Step 1 — Build components[] from rawTemplate.blocks
  const rawBlocks = Array.isArray(rawTemplate.blocks) ? rawTemplate.blocks : [];
  const components = rawBlocks.map(normalizeBlock).filter(Boolean);

  // Step 2 — Build safeSchema
  const safeSchema = {
    schemaVersion: schemaVersion || 1,
    body: components,
  };

  const theme = sanitizeTheme(rawTemplate.theme);
  if (theme !== undefined) safeSchema.theme = theme;

  return safeSchema;
}

module.exports = { sanitizeSchema };
