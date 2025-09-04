export async function handler(event, context) {
  const endpoint = event.path.replace('/api', ''); // Strip /api prefix
  const apiUrl = `https://projectapi.gerasim.in${endpoint}`;

  try {
    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: undefined, // remove Netlify host
      },
      body: event.body,
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}