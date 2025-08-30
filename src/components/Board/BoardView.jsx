import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { getLists } from "../../api/listApi";
import { getCardsByBoard, updateCard, createCard } from "../../api/cardApi";
import Column from "./Column";

export default function BoardView({ board }) {
    const [lists, setLists] = useState([]); // array of lists (with id, title, order)
    const [cards, setCards] = useState([]); // flat array of cards
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!board) return;
        (async () => {
            try {
                const [L, C] = await Promise.all([getLists(board._id), getCardsByBoard(board._id)]);
                setLists(L.data); // expects arrays from backend
                setCards(C.data);
            } catch (e) {
                console.error(e);
            } finally { setLoading(false); }
        })();
    }, [board]);

    const cardsByList = (listId) => cards.filter(c => c.list === listId).sort((a, b) => a.order - b.order);

    // Helper: update local cards state and optionally persist change
    const moveCardLocal = (cardId, destListId, destIndex) => {
        setCards(prev => {
            // remove
            const removed = prev.filter(c => c._id !== cardId);
            const card = prev.find(c => c._id === cardId);
            if (!card) return prev;
            const updatedCard = { ...card, list: destListId, order: destIndex };
            // insert in correct spot: rebuild array with updated order for cards of affected lists
            const result = [...removed, updatedCard];
            // after change, re-normalize order within each list
            const groups = {};
            for (const c of result) {
                groups[c.list] = groups[c.list] || [];
                groups[c.list].push(c);
            }
            const normalized = [];
            for (const lid of Object.keys(groups)) {
                groups[lid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                groups[lid].forEach((it, idx) => { it.order = idx; normalized.push(it); });
            }
            return normalized;
        });
    };

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        // if same spot
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Optimistic local move
        moveCardLocal(draggableId, destination.droppableId, destination.index);

        // Persist: update card list & order in backend
        try {
            await updateCard(draggableId, { list: destination.droppableId, order: destination.index });
        } catch (e) {
            console.error("persist failed", e);
            // Optionally: re-fetch from server to resync
            const C = await getCardsByBoard(board._id);
            setCards(C.data);
        }
    };

    const handleAddCard = async (listId) => {
        const title = prompt("Card title");
        if (!title) return;
        // order is length of cards in that list
        const order = cardsByList(listId).length;
        const res = await createCard({ board: board._id, list: listId, title, order });
        setCards(prev => [...prev, res.data]);
    };

    if (loading) return <div>Loading board...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">{board.title}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 overflow-x-auto">
                    {lists.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(list => (
                        <Droppable droppableId={list._id} key={list._id}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-3 rounded-xl w-80 flex-shrink-0">
                                    <Column
                                        list={list}
                                        cards={cardsByList(list._id)}
                                        onAddCard={() => handleAddCard(list._id)}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
