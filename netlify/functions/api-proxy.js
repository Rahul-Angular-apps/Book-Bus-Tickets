export async function handler(event) {
  const endpoint = event.path.replace('/.netlify/functions/api-proxy', '');
  const apiUrl = `https://projectapi.gerasim.in${endpoint}`;

  try {
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: { ...event.headers, host: undefined },
      body: event.body,
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: text,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}