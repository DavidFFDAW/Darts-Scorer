import React from "react";

export function FlexCenter({ children }) {
    return <div className="flex center">{children}</div>;
}

export function FlexCenterGrow({ children }) {
    return <div className="flex center grow">{children}</div>;
}

export function FlexColumn({ children }) {
    return <div className="flex column center">{children}</div>;
}

export function FlexEnd({ children }) {
    return <div className="flex end">{children}</div>;
}

export function FlexBetween({ children }) {
    return <div className="flex between">{children}</div>;
}

export function FormItem({ className, children }) {
    return (
        <div className={"form-item" + (className ? " " + className : "")}>
            {children}
        </div>
    );
}
