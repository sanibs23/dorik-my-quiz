import React from "react";

export default function ImageOption({ imageUrl }) {
    return (
        <>
            <div className="imgOption" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        </>
    );
}
