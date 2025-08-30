import { createContext, useContext, useState } from "react";
import uuid from "../Utils/uuid";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
    const [columns, setColumns] = useState({
        todo: {
            id: "todo",
            title: "To Do",
            cards: [
                { id: uuid(), text: "Setup project" },
                { id: uuid(), text: "Install dependencies" },
            ],
        },
        inprogress: {
            id: "inprogress",
            title: "In Progress",
            cards: [{ id: uuid(), text: "Build Kanban UI" }],
        },
        done: {
            id: "done",
            title: "Done",
            cards: [{ id: uuid(), text: "Initial commit" }],
        },
    });

    return (
        <BoardContext.Provider value={{ columns, setColumns }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => useContext(BoardContext);
