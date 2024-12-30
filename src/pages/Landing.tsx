import { Chessboard } from "react-chessboard";

const Landing = () => { 
  return (
    <div className="bg-[#312E2A] h-screen">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center p-8">
                <img src="/chessboard.png" className="" />
            </div>
            <div className="p-8 bg-[#272523] w-[50%] mt-8">
                <h1 className="text-4xl font-bold text-white">
                    Play Chess Online
                </h1>
                <div className="mt-6">
                    <button className="bg-[#80B64D] w-full text-white h-16 font-bold text-2xl rounded-lg border-b-4 border-[#44753D] hover:bg-[#9BD45E] transition duration-200">
                        Play Online
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing
