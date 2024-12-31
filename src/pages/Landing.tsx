import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { Chess } from "chess.js";

const Landing = () => {

    const socket = useSocket();

    const [color, setColor] = useState<string>('white');
    const [chess, setChess] = useState(new Chess())
    const [started, setStarted] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [typedMessage, setTypedMessage] = useState<string>("");

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            console.log(message);

            switch (message.type) {
                case "init_game":
                    setColor(message.payload.color);
                    setStarted(true);
                    setChess(new Chess());
                    break;
                case "move":
                    chess.move(message.payload);
                    setChess(new Chess(chess.fen()));
                    break;
                case "game_over":
                    console.log("game over");
                    break;
                case "message":
                    console.log(message.payload);
                    setMessages((prev) => [...prev, message.payload])
                    break;
                default:
                    break;
            }
        }
    }, [socket]);


    return (
        <div className="bg-[#312E2A] h-screen">
            <div className="w-full flex">
                <div className="w-1/2 flex justify-center items-center">
                    <div className="p-4 overflow-hidden w-full h-full flex justify-center items-center">
                        <GameBoard color={color} socket={socket} chess={chess} setChess={setChess} />
                    </div>
                </div>
                <div className="w-1/3 m-4 bg-[#272523] p-4">
                    <div className="flex justify-between h-16">
                        <p>player 1</p>
                        <p>player 2</p>
                    </div>
                    {/* <div className="mt-10 h-[550px] w-full">
                        {!started && (
                            <button
                                className="bg-[#80B64D] w-full text-white h-16 font-bold text-2xl rounded-lg border-b-4 border-[#44753D] hover:bg-[#9BD45E] hover:border-[#5B8F49] transition duration-200"
                                onClick={() => {
                                    socket?.send(
                                        JSON.stringify({
                                            type: "init_game",
                                        })
                                    );
                                }}
                            >
                                Play Online
                            </button>
                        )}
                        {started && (
                            <div className="flex flex-col justify-between h-[90%]">
                                <div className="flex-1 bg-slate-300 p-4 overflow-y-auto">
                                    <h3 className="text-lg font-bold mb-2">Moves</h3>
                                    <ul>
                                        {chess.history().map((move, index) => (
                                            <li key={index} className="text-sm">
                                                {index + 1}. {move}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="h-1/3 flex flex-col bg-slate-200">
                                    <div className="flex-1 overflow-y-auto p-2">
                                        {messages.map((message, i) => (
                                            <p key={i} className="text-sm">
                                                {message}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="p-2 mt-auto flex gap-2">
                                        <input
                                            value={typedMessage}
                                            onChange={(e) => setTypedMessage(e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded"
                                            placeholder="Type your message..."
                                        />
                                        <button
                                            disabled={!typedMessage}
                                            onClick={() => {
                                                socket?.send(
                                                    JSON.stringify({
                                                        type: "message",
                                                        data: typedMessage,
                                                    })
                                                );
                                                setTypedMessage("");
                                            }}
                                            className="bg-[#80B64D] text-white px-4 py-2 rounded hover:bg-[#9BD45E] disabled:bg-gray-400"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );

}

export default Landing
