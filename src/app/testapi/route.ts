export async function GET() {
    const data = [];

    for (let _ = 0; _ < Math.pow(10, 5); _++) {
        data.push(Math.random());
    }

    return Response.json({
        message: 'Hello From Next.js 🐢',
        data: data,
    });
}