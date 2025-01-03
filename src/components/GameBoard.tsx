import { Chessboard } from 'react-chessboard';
import move_self from "../assets/move-self.mp3"
import illegal_move from "../assets/illegal.mp3"

const GameBoard = ({ color, socket, chess, setChess }: { color: any, socket: WebSocket | null, chess: any, setChess: any }) => {

    const move_audio = new Audio(move_self);
    const illegal_audio = new Audio(illegal_move);

    function onDrop(sourceSquare: string, targetSquare: string) {

        try {
            socket?.send(JSON.stringify({
                type: "move",  
                move: {                
                    from: sourceSquare,    
                    to: targetSquare
                }
            }))
            move_audio.play();
            return true;
        } catch (error) {
            illegal_audio.play();
            return false;
        }

        
    }   

    return (
        <Chessboard position={chess.fen()} boardOrientation={color} onPieceDrop={onDrop} boardWidth={500} />
    )
}

export default GameBoard
