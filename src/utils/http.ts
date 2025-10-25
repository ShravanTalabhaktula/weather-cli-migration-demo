const https = require('https') as typeof import('https');

function httpGet(
  url: string,
  headers: Record<string, string> = {},
  timeoutMs = 10_000
): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      const code = res.statusCode ?? 0;
      if (code >= 400) {
        res.resume();
        return reject(new Error(`HTTP ${code} for ${url}`));
      }
      res.setEncoding('utf8');
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });

    req.on('error', reject);
    req.setTimeout(timeoutMs, () =>
      req.destroy(new Error('Request timed out'))
    );
  });
}

async function getJson<T>(
  url: string,
  headers: Record<string, string> = {},
  timeoutMs = 10_000
): Promise<T> {
  const text = await httpGet(url, headers, timeoutMs);
  return JSON.parse(text) as T;
}

export = { httpGet, getJson };
