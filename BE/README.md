# Config Server

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your MONGO_URL
npm run dev
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Server + DB status |
| GET | /config?appId=600 | Get sanitized config schema |

## /config Response

```json
{
  "appId": 600,
  "templateId": 1,
  "safeSchema": {
    "schemaVersion": 1,
    "theme": { "primaryColor": "#fff" },
    "header": { "title": "My App" },
    "body": [
      { "type": "header", "title": "Welcome" },
      { "type": "button", "label": "Click me", "action": "submit", "variant": "primary" }
    ]
  }
}
```

## Sanitizer Rules

The `sanitizeSchema` function filters `rawSchema` so only safe, known fields pass through:

| Type | Allowed fields |
|------|---------------|
| `header` | title |
| `text` | value |
| `button` | label, action, variant |
| `table` | columns (string[]), data (array[]) |

Unknown component types are dropped. Unknown fields within allowed types are dropped.

## Folder Structure

```
src/
  db/
    connect.js          # Mongoose connection
  middleware/
    errorHandler.js     # Global error handler
  models/
    AppMapping.js       # app_mapping collection
    Template.js         # templates collection
  routes/
    health.js           # GET /health
    config.js           # GET /config
  services/
    mappingService.js   # getTemplateIdByAppId()
    templateService.js  # getRawSchemaByTemplateId()
    sanitizeSchema.js   # sanitizeSchema()
  server.js             # Entry point
```
