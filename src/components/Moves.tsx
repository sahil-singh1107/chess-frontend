import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

interface Move {
    to: string;
    type: string;
}

const Moves = ({ moves }: { moves: Move[] }) => {
    // Create paired moves with type safety
    const pairedMoves: Array<[Move | string, Move | string]> = [];

    for (let i = 0; i < moves.length; i += 2) {
        pairedMoves.push([moves[i] || "--", moves[i + 1] || "--"]);
    }

    // Ensure the table has exactly 10 rows
    while (pairedMoves.length < 10) {
        pairedMoves.push(["--", "--"]);
    }

    return (
        <div className="mt-20 max-h-96 overflow-y-auto no-scrollbar">
            <Table>
                <TableBody>
                    {pairedMoves.map((movePair, index) => (
                        <TableRow key={index} className="hover:bg-gray-700">
                            <TableCell className="text-[#A1A0AB] border text-center">
                                {index + 1}
                            </TableCell>
                            <TableCell className="text-[#A1A0AB] border text-center">
                                {typeof movePair[0] === "string" ? movePair[0] : `${movePair[0].type} ${movePair[0].to}`}
                            </TableCell>
                            <TableCell className="text-[#A1A0AB] border text-center">
                                {typeof movePair[1] === "string" ? movePair[1] : `${movePair[1].type} ${movePair[1].to}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Moves;
