let secretKey = ""; // Store the secret key in memory

export async function POST(request) {
  const { secretKey: newSecretKey } = await request.json();
  secretKey = newSecretKey; // Update the secret key
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ secretKey }), {
    headers: { "Content-Type": "application/json" },
  });
}