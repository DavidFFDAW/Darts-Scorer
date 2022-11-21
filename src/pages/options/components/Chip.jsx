import React from "react";

export default function Chip({
    style,
    value,
    onClick,
    type,
    current,
    css = true,
}) {
    return (
        <span
            className={
                "chip" +
                (css ? " number" : "") +
                (current === value ? " active" : "")
            }
            style={style}
            onClick={(_) => onClick(type, value)}
        >
            {value}
        </span>
    );
}
