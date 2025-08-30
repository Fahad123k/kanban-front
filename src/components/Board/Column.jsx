import { Draggable } from "@hello-pangea/dnd";
import CardItem from "./CardItem";

export default function Column({ list, cards = [], onAddCard }) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">{list.title}</h3>
                <button onClick={onAddCard} className="text-sm px-2 py-1 bg-indigo-600 text-white rounded">+ Card</button>
            </div>

            <div className="space-y-2">
                {cards.map((card, idx) => (
                    <Draggable key={card._id} draggableId={card._id} index={idx}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <CardItem card={card} />
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
        </div>
    );
}
