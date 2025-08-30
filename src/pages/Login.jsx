import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi } from "../api/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        setErr("");

        try {
            const res = await loginApi({ email: email.trim(), password });
            const { token, user } = res.data;

            // Store user + token in context & localStorage
            login(user, token);

            toast.success("Login successful!");
            navigate("/board");
        } catch (e) {
            const errorMsg = e.response?.data?.message || "Login failed";
            setErr(errorMsg);
            toast.error(errorMsg);
            console.error("Login error:", e.response || e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid place-items-center p-6 bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
            >
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                {err && <div className="text-red-600 text-sm mb-2">{err}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded disabled:bg-indigo-400"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div className="text-center mt-3">
                    <Link to="/register" className="text-sm text-indigo-600 hover:underline">
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </div>
    );
}
