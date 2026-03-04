const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const actionMap = {
  saveUser: async (payload) => {
    const res = await fetch(`${API_BASE}/action/saveUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: Date.now(), ...payload }),
    });
    if (!res.ok) throw new Error('saveUser failed');
    return res.json();
  },

  openUrl: async (payload) => {
    const url = payload?.url;
    if (!url) throw new Error('openUrl: no url in payload');
    window.open(url, '_blank', 'noopener,noreferrer');
  },
};

export async function executeAction(actionName, payload = {}) {
  const handler = actionMap[actionName];
  if (!handler) {
    console.warn(`[ActionMap] Unknown action: "${actionName}"`);
    return;
  }
  try {
    const result = await handler(payload);
    console.log(`[ActionMap] "${actionName}" done`, result);
    return result;
  } catch (err) {
    console.error(`[ActionMap] "${actionName}" failed:`, err.message);
    throw err;
  }
}
