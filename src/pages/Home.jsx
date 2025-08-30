import { Link } from "react-router-dom";
import Button from "../UI/Button";


export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Kanban Board</h1>
            <p className="text-gray-600">Organize your tasks efficiently</p>
            <Link to="/board">
                <Button>Go to Board</Button>
            </Link>
        </div>
    );
}
