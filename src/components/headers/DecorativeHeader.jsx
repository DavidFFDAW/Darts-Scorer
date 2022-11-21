import React from "react";

export function DecorativeHeader() {
    const image = {
        backgroundImage: 'url("/half-bullseye.png")',
    };
    return (
        <div className="decorative-header bullseye-image" style={image}></div>
    );
}

export function DecorativeHeaderSpace({ children }) {
    return <div className="decorative-header-space">{children}</div>;
}
