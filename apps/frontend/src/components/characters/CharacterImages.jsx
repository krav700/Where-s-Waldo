import { useState, useEffect } from "react";
import fetchApi from "../../api/api";

function CharacterImage({image, color, name, setColor}) {
    return (
        <>
            <div className="cursor-pointer border-2 bg-white max-w-64 max-h-56" onClick={() => {setColor(color);}}>
                <div className="m-5 flex flex-col gap-2">
                    <img className="border-2 object-contain" src={image} alt={name} />
                    <h3>{name}</h3>
                </div>
            </div>
        </>
    );
}

export default CharacterImage;
