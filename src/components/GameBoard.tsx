import { Chessboard } from 'react-chessboard';
import move_self from "../assets/move-self.mp3"
import illegal_move from "../assets/illegal.mp3"

const GameBoard = ({ color, socket, chess, setChess,  started, isGameOver }: { color: any, socket: WebSocket | null, chess: any, setChess: any, started: boolean, isGameOver : boolean }) => {

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
        <Chessboard position={chess.fen()} boardOrientation={color} onPieceDrop={onDrop} boardWidth={500} customDarkSquareStyle={{backgroundColor: '#90877c'}} customLightSquareStyle={{backgroundColor: "#aca296"}} customBoardStyle={{boxShadow:`${started && "0 0 15px 5px rgba(169, 169, 169, 0.7)"} `}} areArrowsAllowed={true} customArrowColor='#f9f1e4' arePiecesDraggable={!isGameOver} />
    )
}

export default GameBoard
