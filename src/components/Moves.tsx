import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Moves = ({ moves }: { moves: string[] }) => {
    const pairedMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
        pairedMoves.push([moves[i], moves[i + 1]]);
    }

   
    while (pairedMoves.length < 10) {
        pairedMoves.push(["--", "--"]);
    }

    return (
        <div className="mt-20 max-h-96 overflow-y-auto no-scrollbar">
            <Table>
                <TableBody>
                    {pairedMoves.map((moves, i) => (
                        <TableRow key={i} className="hover:bg-gray-700">
                            <TableCell className="text-[#A1A0AB] border text-center">{i + 1}</TableCell>
                            <TableCell className="text-[#A1A0AB] border text-center">{moves[0]}</TableCell>
                            <TableCell className="text-[#A1A0AB] border text-center">{moves[1]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Moves;
