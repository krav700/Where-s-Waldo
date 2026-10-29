import { useState, useEffect } from "react";
import fetchApi from "../../api/api";

function CharacterImage({character, onClick}) {
    return (
        <>
            <div className={`p-2 rounded-sm flex justify-center ${character?.isActive ? 'outline-green-400 outline-5' : ''}`}>
            
                <div onClick={() => onClick()} className="flex justify-center rounded-sm cursor-pointer border-2 bg-white max-w-64 max-h-56 relative">
                    <div className="m-5 flex flex-col gap-2">
                        <img className="border-2 object-contain h-full md:h-40 lg:h-40 w-60" src={character?.imgSrc} alt={character?.name} />
                        <h3 className="text-black">{character?.name}</h3>
                    </div>
                    <div className="absolute z-5 -bottom-4 md:-bottom-4 right-2">
                        <h1 className="text-2xl md:text-4xl lg:text-4xl">{character?.guessed ? '✅' : '❌'}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CharacterImage;
