import React from "react";
import ImageOption from "./imageOption";

export default function QuizOption({ title, bgClass, isImage }) {
    return (
        <div className={"quiz-option p-1 mb-2 cursor-pointer " + bgClass}>
            {isImage ? <ImageOption imageUrl={title} /> :
                <h3 className="ms-2">{title}</h3>
            }
        </div>
    );
}
