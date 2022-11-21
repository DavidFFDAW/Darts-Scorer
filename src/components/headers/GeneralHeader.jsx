import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../icon/Icon";

export function GeneralHeader({ children }) {
    const childrenOrNull = children || null;
    return (
        <>
            <div className="general-header flex between">
                {childrenOrNull}
                <div className="general-header round-back"></div>
            </div>
        </>
    );
}

export function DefaultGeneralHeader({ text, animation = false }) {
    const animationClass = animation
        ? "animate__animated animate__pulse animate__fast animate__delay-2s animate__infinite"
        : "";

    return (
        <>
            <div className="general-header flex between">
                <Link to={"/"}>
                    <Icon icon={"home"}></Icon>
                </Link>
                <span className={animationClass}>{text}</span>
                <Link to={"/settings"}>
                    <Icon icon={"settings"}></Icon>
                </Link>
                <div className="general-header round-back"></div>{" "}
            </div>
        </>
    );
}
