import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check login state on mount + whenever storage changes
    useEffect(() => {
        const checkUser = () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));

                setUser(storedUser || null);
            } catch {
                setUser(null);
            }
        };


        checkUser();
        window.addEventListener("storage", checkUser);

        return () => {
            window.removeEventListener("storage", checkUser);
        };
    }, []);


    console.log("user value: ", user);


    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
                Kanban
            </Link>

            <div className="space-x-4 flex items-center">
                <Link to="/" className="text-gray-600 hover:text-indigo-600">
                    Home
                </Link>
                <Link to="/board" className="text-gray-600 hover:text-indigo-600">
                    Board
                </Link>

                {user ? (
                    <>
                        <span className="text-gray-700 font-semibold">
                            Hello, {user?.name || "User"}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                            Login
                        </Link>
                        <Link to="/register" className="text-gray-600 hover:text-indigo-600">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
