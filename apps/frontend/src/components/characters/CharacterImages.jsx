import { useState, useEffect } from "react";
import fetchApi from "../../api/api";

function CharacterImage({image, name, onClick}) {
    return (
        <>
            <div onClick={() => onClick()} className="cursor-pointer border-2 bg-white max-w-64 max-h-56">
                <div className="m-5 flex flex-col gap-2">
                    <img className="border-2 object-contain" src={image} alt={name} />
                    <h3>{name}</h3>
                </div>
            </div>
        </>
    );
}

export default CharacterImage;
