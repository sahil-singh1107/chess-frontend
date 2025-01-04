import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { Chess } from "chess.js";
import Moves from "../components/Moves";
import { useNavigate } from "react-router-dom";
import game_start from "../assets/game-start.mp3"
import move_self from "../assets/move-self.mp3"
import illegal_move from "../assets/illegal.mp3"
import PlayerCard from "@/components/PlayerCard";

const Landing = () => {

    const [name, setName] = useState<string | null>(localStorage.getItem("username"));
    const [opponentName, setOpponentName] = useState<string | null>("");

    useEffect(() => {
        if (!localStorage.getItem("username")) {
            navigate("/signin");
        }
    }, [])

    let navigate = useNavigate();
    const socket = useSocket(name);
    const game_start_audio = new Audio(game_start);
    const move_audio = new Audio(move_self);
    const illegal_audio = new Audio(illegal_move);
    const [color, setColor] = useState<string>('white');
    const [chess, setChess] = useState(new Chess())
    const [started, setStarted] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [typedMessage, setTypedMessage] = useState<string>("");
    const [moves, setMoves] = useState<string[]>([])

    useEffect(() => {
        if (!socket) {
            return;
        }
        if (!name) {
            navigate("/signin")
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
                case "opponent":
                    setOpponentName(message.payload.opponent);
                    game_start_audio.play();
                    break
                case "move":
                    console.log(message.payload);
                    chess.move(message.payload);
                    setChess(new Chess(chess.fen()));
                    setMoves((prev) => [...prev, message.payload.to])
                    move_audio.play();
                    break;
                case "illegal_move":
                    illegal_audio.play()
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

        <div className="h-screen w-screen bg-[#312E2A] relative">
            <div className="w-[8%] bg-[#272523]">

            </div>
            <div className="absolute m-11 z-10 top-0 left-0 right-0 bottom-0 flex">
                <div className="w-1/2 flex flex-col items-center justify-between">
                    {/* Chess Board */}
                    <div>
                        <PlayerCard username={opponentName} />
                    </div>

                    <div>
                        <GameBoard color={color} socket={socket} chess={chess} setChess={setChess} />
                    </div>

                    <div>
                        <PlayerCard username={name} />
                    </div>
                </div>

                <div className="w-1/2 bg-[#272422] rounded-2xl">
                    {!started ? (
                        <div className="flex flex-col space-y-10 items-center justify-center flex-grow">
                            <span className="text-white font-bold text-4xl mt-8">Play Chess Online</span>
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
                        </div>
                    ) : (
                        <div className="relative flex flex-col flex-grow h-full">
                            <div className="flex justify-between m-6">
                                <span>player 1</span>
                                <span>player 2</span>
                            </div>
                            <div className="border border-[#312e2a]"></div>

                            {/* Display move history */}
                            <div className="p-4 rounded-lg mb-4 overflow-auto flex-grow h-2/3 w-full">
                                <h4 className="text-white font-semibold mb-2 text-center">Moves:</h4>
                                <Moves moves={moves} />

                            </div>
                            <div className="border border-[#312e2a]"></div>
                            {/* Chat and input */}
                            <div className="flex flex-col justify-between mt-4 flex-shrink-0 h-1/3">
                                <div className="flex flex-col overflow-auto m-4">
                                    {messages.map((message, i) => (
                                        <p key={i} className="text-sm text-white">{message}</p>
                                    ))}
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <input
                                        value={typedMessage}
                                        onChange={(e) => setTypedMessage(e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded bg-[#272422] border-none focus:border-[#272422] text-white"
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
                </div>
            </div>
        </div>
    );

}

export default Landing
