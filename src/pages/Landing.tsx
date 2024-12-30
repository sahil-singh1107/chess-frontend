import { Chessboard } from "react-chessboard";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";

const Landing = () => {

    const socket = useSocket();


    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            console.log(message);

            switch (message.type) {
                case "init_game":
                    console.log("game initialised")
                    break;
                case "move":
                    console.log("move made")
                    break;
                case "game_over":
                    console.log("game over");
                    break;
                default:
                    break;
            }
        }
    }, [socket])


    return (
        <div className="bg-[#312E2A] h-screen flex">
            <div className="w-1/2 flex justify-center items-center">
                <div className="p-4 overflow-hidden w-full h-full flex justify-center items-center">
                    <Chessboard />
                </div>
            </div>
            <div className="w-1/3 m-4 bg-[#272523] p-4">
                <div className="flex justify-between">
                    <p>player 1</p>
                    <p>player 2</p>
                </div>
                <div className="mt-10">
                    <button className="bg-[#80B64D] w-full text-white h-16 font-bold text-2xl rounded-lg border-b-4 border-[#44753D] hover:bg-[#9BD45E] hover:border-[#5B8F49] transition duration-200" onClick={() => {
                        socket?.send(JSON.stringify({
                            type : "init_game"
                        }))
                    }}>
                        Play Online
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Landing
