import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
};

export default function QuestionItemCard({
    idx,
    title,
    question,
    index,
    changeOrder,
}) {
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: "question",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        drop(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Time to actually perform the action
            changeOrder(item.id, question.id, question.order);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "question",
        item: () => {
            return { idx, index, ...question };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <>
            <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
                <span> {title}</span>
            </div>
        </>
    );
}
