'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('')
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name,email,password})
        });
        const data = await res.json();
        if(res.ok){
            router.push('/login')
        }else{
            setError(data.message);
            
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-5">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
{error}
                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-left font-semibold text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-left font-semibold text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>


               
                <div className="mb-4">
                    <label className="block text-left font-semibold text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}