import user_image from "../assets/user-image.svg"

const PlayerCard = ({ username }: { username: string | null }) => {
    return (
        <div className="flex items-center space-x-2">
            <img src={user_image} alt="User Avatar" width="40" height="40" />
            <span className="text-white font-bold">{username || "Opponent"}</span>
        </div>
    )
}

export default PlayerCard
