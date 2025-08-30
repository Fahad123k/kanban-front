import { useState } from "react";
import { useBoard } from "../../context/BoardContext";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import uuid from "../../Utils/uuid";

export default function AddCardForm({ columnId }) {
    const [text, setText] = useState("");
    const { columns, setColumns } = useBoard();

    const handleAdd = () => {
        if (!text.trim()) return;
        const newCard = { id: uuid(), text };
        const newCol = { ...columns[columnId] };
        newCol.cards = [...newCol.cards, newCard];
        setColumns({ ...columns, [columnId]: newCol });
        setText("");
    };

    return (
        <div className="mt-3 flex gap-2">
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new card..."
            />
            <Button onClick={handleAdd}>+</Button>
        </div>
    );
}
