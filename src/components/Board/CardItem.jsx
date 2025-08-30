export default function CardItem({ card }) {
    return (
        <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-sm font-medium">{card.title || card.text}</div>
            {card.description && <div className="text-xs text-gray-500 mt-1">{card.description}</div>}
        </div>
    );
}
