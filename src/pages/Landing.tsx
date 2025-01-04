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
import { LuPlus } from "react-icons/lu";
import { CiChat1 } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



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
    const [started, setStarted] = useState(true);
    const [messages, setMessages] = useState<string[]>([]);
    const [typedMessage, setTypedMessage] = useState<string>("");
    const [moves, setMoves] = useState<string[]>([])
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
                    {
                        started && (
                            <div className="absolute top-60 left-20 flex flex-col space-y-5">
                                <div className="flex flex-col rounded-md p-3 items-center hover:bg-[#303233]">
                                    <button><LuPlus className="text-white w-10 h-10" /></button>
                                    <span className="text-[#5c5a59]">New game</span>
                                </div>
                                <div className="flex flex-col items-center rounded-md hover:bg-[#303233] p-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><button><CiChat1 className="text-white w-10 h-10" /></button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-[#1a1a1d] w-96 h-64">
                                            <DropdownMenuLabel>{opponentName}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <div className="flex flex-col overflow-hidden">
                                                <div className="flex-1 p-4 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                                    {
                                                        moves.map((move, i) => (
                                                            <div key={i} className=" p-2 rounded-md text-white">{move}</div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="flex items-center p-4 fixed bottom-0 w-full">
                                                    <input type="text" value={typedMessage} onChange={(e) => { setTypedMessage(e.target.value) }} className="flex-1 p-2 " placeholder="Type a message..." />
                                                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400" onClick={() => {
                                                        socket?.send(JSON.stringify({
                                                            type: "message",
                                                            data: { typedMessage }
                                                        }))
                                                    }}>Send</button>
                                                </div>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>


                                    <span className="text-[#5c5a59]">Chat</span>
                                </div>

                            </div>
                        )
                    }
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
