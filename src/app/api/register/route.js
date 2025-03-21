import dbConnect from "@/library/db";
import User from "@/models/User";

export async function POST(request) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();
        const existinguser = await User.findOne({ email });

        if (existinguser) {
            return new Response(JSON.stringify({ message: "user already exists" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const user1 = new User({ name, email, password });
        await user1.save();

        return new Response(JSON.stringify({ message: 'user registered successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}