import isMobile from "../../utilities/isMobile";

function CharacterImage({ characters, character, onClick }) {
    return (
        <div
            className={`md:p-2 lg:rounded-sm ${character?.isActive ? "outline-green-400 outline-5" : ""}`}
        >
            <div
                onClick={() => onClick()}
                className="min-w-0 min-h-0 h-full p-4 rounded-sm cursor-pointer border-2 bg-white max-w-64 max-h-56 relative"
            >
                <div
                    className={
                        characters.length > 3 && !isMobile()
                            ? "flex items-center gap-2 min-w-0 max-w-full min-h-0 h-full max-h-full"
                            : "grid grid-rows-[9fr_1fr] gap-2 min-w-0 max-w-full min-h-0 h-full max-h-full"
                    }
                >
                    <div className="h-full min-h-0 min-w-0 w-full">
                        <img
                            className="border-2 object-contain h-full w-full min-h-0 min-w-0 justify-self-center"
                            src={character?.imgSrc}
                            alt={character?.name}
                        />
                    </div>
                    <h3 className="text-black">{character?.name}</h3>
                </div>
                <div className="absolute z-5 -bottom-4 md:-bottom-4 right-2">
                    <h1 className="text-2xl md:text-4xl lg:text-4xl">
                        {character?.guessed ? "✅" : "❌"}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default CharacterImage;
