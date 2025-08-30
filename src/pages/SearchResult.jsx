import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchCards } from "../api/cardApi";

export default function SearchResults() {
    const { search } = useLocation();
    const q = new URLSearchParams(search).get("q");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!q) return;
        (async () => {
            setLoading(true);
            try {
                const res = await searchCards(q);
                setResults(res.data);
            } finally {
                setLoading(false);
            }
        })();
    }, [q]);

    if (loading) return <div>Searching...</div>;
    return (
        <div className="p-4">
            <h2 className="text-lg mb-3">Search results for "{q}"</h2>
            <div className="space-y-2">
                {results.length === 0 && <div className="text-gray-500">No cards found</div>}
                {results.map(r => (
                    <div key={r._id} className="bg-white p-3 rounded shadow">{r.title || r.text}</div>
                ))}
            </div>
        </div>
    );
}
