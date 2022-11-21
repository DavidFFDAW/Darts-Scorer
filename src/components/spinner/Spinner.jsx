import { OverlayBlock } from "../overlay/OverlayBlock";
import "./spinner.css";

export function Spinner() {
    return (
        <>
            <OverlayBlock />
            <div className="spinner">
                <div className="spinner__circle spinner__circle--1"></div>
                <div className="spinner__circle spinner__circle--2"></div>
                <div className="spinner__circle spinner__circle--3"></div>
            </div>
        </>
    );
}
