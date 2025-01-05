import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import RenderIcons from "./RenderIcons";

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
        <div className="mt-10 max-h-96 overflow-y-auto no-scrollbar shadow-lg border border-gray-700 rounded-md">
            <Table className="w-full table-fixed border-collapse">
                <TableBody>
                    {pairedMoves.map((movePair, index) => (
                        <TableRow
                            key={index}
                            className="hover:bg-gray-700 transition duration-200 ease-in-out">
                            <TableCell
                                className="text-[#A1A0AB] border border-gray-600 text-center py-2 font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell
                                className="text-[#A1A0AB] border border-gray-600 text-center py-2 font-medium">
                                {typeof movePair[0] === "string" ? (
                                    <span>{movePair[0]}</span>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <RenderIcons type={movePair[0].type} />
                                        <span>{movePair[0].to}</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell
                                className="text-[#A1A0AB] border border-gray-600 text-center py-2 font-medium">
                                {typeof movePair[1] === "string" ? (
                                    <span>{movePair[1]}</span>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <RenderIcons type={movePair[1].type} />
                                        <span>{movePair[1].to}</span>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Moves;


