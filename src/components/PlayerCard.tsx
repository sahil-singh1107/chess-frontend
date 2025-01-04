import user_image from "../assets/user-image.svg"

const PlayerCard = ({ username, time }: { username: string | null, time: number }) => {


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center space-x-4 p-4 mt-2 mb-2">
            <img src={user_image} alt="User Avatar" className="rounded-full w-10 h-10" />

            <span className="text-white text-2xl font-bold">{formatTime(time)}</span>

            <div className="flex flex-col items-center">
                <span className="text-white">{username || "Opponent"}</span>
                <span className="text-white">1000</span>
            </div>
        </div>
    )
}

export default PlayerCard
