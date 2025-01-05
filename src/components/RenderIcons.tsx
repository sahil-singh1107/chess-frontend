import { LiaChessPawnSolid } from "react-icons/lia";
import { LiaChessRookSolid } from "react-icons/lia";
import { LiaChessKnightSolid } from "react-icons/lia";
import { LiaChessBishopSolid } from "react-icons/lia";
import { LiaChessKingSolid } from "react-icons/lia";
import { LiaChessQueenSolid } from "react-icons/lia";

const RenderIcons = ({ type }: { type: string }) => {
    switch (type) {
        case "wP":
            return <LiaChessPawnSolid className="text-white" />

        case "wR":
            return <LiaChessRookSolid className="text-white" />

        case "wN":
            return <LiaChessKnightSolid className="text-white" />

        case "wB":
            return <LiaChessBishopSolid className="text-white" />

        case "wQ":
            return <LiaChessQueenSolid className="text-white" />

        case "wK":
            return <LiaChessKingSolid className="text-white" />

        case "bP":
            return <LiaChessPawnSolid className="text-black" />
            break;
        case "bR":
            return <LiaChessRookSolid className="text-black" />
            break
        case "bN":
            return <LiaChessKnightSolid className="text-black" />
            break
        case "bB":
            return <LiaChessBishopSolid className="text-black" />
            break
        case "bQ":
            return <LiaChessQueenSolid className="text-black" />
            break
        case "bK":
            return <LiaChessKingSolid className="text-black" />
            break
        default:
            break;
    }
}

export default RenderIcons
