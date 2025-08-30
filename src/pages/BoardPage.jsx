import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards, createBoard } from "../api/boardApi";
import BoardView from "../components/board/BoardView";
import { useAuth } from "../context/AuthContext";

export default function BoardPage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {

        // console.log("User in BoardPage:", user); // Debugging line
        if (!user) {
            nav("/login");
            return;
        }
        (async () => {
            try {
                const res = await getBoards();
                setBoards(res.data);
            } catch (e) {
                if (e.response?.status === 401) {
                    logout(); // clear invalid token
                    nav("/login");
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [user]);

    const addBoard = async () => {
        const title = prompt("Board title");
        if (!title) return;
        const res = await createBoard({ title });
        setBoards((prev) => [...prev, res.data]);
    };

    if (loading) return <div className="p-4">Loading...</div>;

    if (!boards.length)
        return (
            <div className="p-4">
                <h2>No boards yet</h2>
                <button
                    onClick={addBoard}
                    className="mt-4 px-3 py-2 bg-indigo-600 text-white rounded"
                >
                    Create board
                </button>
            </div>
        );

    return (
        <div>
            <button
                onClick={logout}
                className="px-3 py-2 bg-red-600 text-white rounded mb-4"
            >
                Logout
            </button>
            <BoardView board={boards[0]} addBoard={addBoard} boards={boards} />
        </div>
    );
}
