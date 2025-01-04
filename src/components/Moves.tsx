import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const Moves = ({ moves }: { moves: string[] }) => {

    const pairedMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
        pairedMoves.push([moves[i], moves[i + 1]]);
    }

    return <Table className="mt-20">
        {
            pairedMoves.map((moves,i) => (
                <TableRow key={i} className="border hover:text-white">
                    <TableCell className="text-[#A1A0AB] border text-center">{i+1}</TableCell>
                    <TableCell className="text-[#A1A0AB] border text-center">{moves[0]}</TableCell>
                    <TableCell className="text-[#A1A0AB] text-center">{moves[1]}</TableCell>
                </TableRow>
            ))
        }
    </Table>
}

export default Moves
