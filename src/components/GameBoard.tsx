import { Chessboard } from 'react-chessboard';

const GameBoard = ({ color, socket, chess, setChess }: { color: any, socket: WebSocket | null, chess: any, setChess: any }) => {

    function onDrop(sourceSquare: string, targetSquare: string) {
        socket?.send(JSON.stringify({
            type: "move",  
            move: {                
                from: sourceSquare,    
                to: targetSquare
            }
        }))
        return true;
    }   

    return (
        <Chessboard position={chess.fen()} boardOrientation={color} onPieceDrop={onDrop} />
    )
}

export default GameBoard
