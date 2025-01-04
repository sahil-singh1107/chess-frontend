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
import useClock from "@/hooks/useClock";

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
    const [moves, setMoves] = useState<string[]>(["e4", "e4", "e4"])
    const { time, isRunning, toggleClock } = useClock()



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
                    if (message.payload.color === "white") {
                        toggleClock();
                    }
                    setChess(new Chess());
                    break;
                case "opponent":
                    setOpponentName(message.payload.opponent);
                    game_start_audio.play();
                    break
                case "move":
                    console.log(message.payload);
                    chess.move(message.payload.move);
                    setChess(new Chess(chess.fen()));
                    setMoves((prev) => [...prev, message.payload.move.to]);
                    toggleClock();
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
        <div className="h-screen w-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-black relative">
            <div className="absolute m-11 z-10 top-0 left-0 right-0 bottom-0 flex">
                <div className="w-full flex flex-col items-center ">
                    <div className="flex justify-between w-full">
                        <PlayerCard username={opponentName} time={600} />
                    </div>
                    <div className="absolute top-0 left-0">
                        <p className="text-white">sss</p>
                    </div>
                    <div>
                        <GameBoard color={color} socket={socket} chess={chess} setChess={setChess} started={started} />
                    </div>

                    <div className="flex justify-between w-full">
                        <PlayerCard username={name} time={time} />
                    </div>
                </div>

                <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-[20%]">
                    {!started ? (
                        <button
                            className="px-4 py-2 w-full bg-[#fedf32] rounded-md font-bold"
                            onClick={() => {
                                socket?.send(
                                    JSON.stringify({
                                        type: "init_game",
                                    })
                                );
                            }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 group-hover:translate-x-full transform transition-transform duration-500 ease-in-out"></span>
                            <span className="relative z-10">Play Online</span>
                        </button>
                    ) : (
                        <>
                            <div className="w-full h-full">
                                <Moves moves={moves} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Landing
