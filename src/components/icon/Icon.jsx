import React from "react";

export function Icon({ css, icon }) {
    if (css) {
        return (
            <span className={`${css} mat-icons material-symbols-outlined`}>
                {icon}
            </span>
        );
    }
    return <span className="mat-icons material-symbols-outlined">{icon}</span>;
}

export function TitleIcon({ icon }) {
    return (
        <span className="special-icon mat-icons material-symbols-outlined">
            {icon}
        </span>
    );
}
