import React from 'react'

const Moves = ({ moves }: { moves: string[] }) => {
    return (
        <div>
            {
                (() => {
                    const pairedMoves = [];
                    for (let i = 0; i < moves.length; i += 2) {
                        pairedMoves.push([moves[i], moves[i + 1]]);
                    }
                    return pairedMoves.map((pair, index) => (
                        <>
                            <div className="flex items-center space-x-2" key={index}>
                                <span
                                    className={`text-[#C3C2C1] font-bold px-2 py-1 ${index % 2 === 0 ? 'bg-transparent' : 'bg-[#2A2926]'
                                        }`}
                                >
                                    {index + 1}.
                                </span>
                                <div className={`text-sm font-extrabold text-[#C3C2C1] flex space-x-2 ${index % 2 === 0 ? 'bg-transparent' : 'bg-[#2a2926]'}`}>
                                    <span className="mr-2">{pair[0]}</span>
                                    <span>{pair[1]}</span>
                                </div>
                            </div>
                        </>

                    ));
                })()
            }
        </div>
    )
}

export default Moves
