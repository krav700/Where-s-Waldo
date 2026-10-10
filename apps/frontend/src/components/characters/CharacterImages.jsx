import { useState, useEffect } from "react";
import fetchApi from "../../api/api";

function CharacterImage({character, onClick}) {
    return (
        <>
            <div className={`p-2 rounded-sm ${character?.isActive ? 'outline-green-400 outline-5' : ''}`}>

            
                <div onClick={() => onClick()} className="rounded-sm cursor-pointer border-2 bg-white max-w-64 max-h-56 relative">
                    <div className="m-5 flex flex-col gap-2">
                        <img className="border-2 object-contain" src={character?.imgSrc} alt={character?.name} />
                        <h3>{character?.name}</h3>
                    </div>
                    <div className="absolute z-5 -bottom-6 right-2">
                        <h1>{character?.guessed ? '✅' : '❌'}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CharacterImage;
