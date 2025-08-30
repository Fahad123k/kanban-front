import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [q, setQ] = useState("");
    const nav = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        if (!q.trim()) return;
        nav(`/search?q=${encodeURIComponent(q)}`);
    };
    return (
        <form onSubmit={submit} className="flex items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cards..." className="px-3 py-2 border rounded" />
            <button className="px-3 py-2 bg-indigo-600 text-white rounded">Search</button>
        </form>
    );
}
