import React from "react";
import { Link } from "react-router-dom";
import {
    DecorativeHeader,
    DecorativeHeaderSpace,
} from "../../components/headers/DecorativeHeader";

function UnfinishedGameLink() {
    const position = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    };
    return (
        <div
            style={position}
            className="animate__animated animate__fadeInRight animate__delay-1s flex center"
        >
            <div className="flex center column panel alternate unfinished-game-div">
                <span>Hay una partida sin terminar guardada.</span>
                <Link
                    to="/unfinished-game"
                    className="btn w100 center alternate"
                >
                    Continuar partida
                </Link>
            </div>
        </div>
    );
}

export default function HomePage() {
    const hasUnfinishedGame = false;

    return (
        <>
            <DecorativeHeader></DecorativeHeader>

            {hasUnfinishedGame ? <UnfinishedGameLink /> : null}

            <DecorativeHeaderSpace extraSpace={hasUnfinishedGame}>
                <div className="animate__animated animate__fadeInUp flex center grow">
                    <div className="flex center column panel">
                        <Link to={"/options"} className="w100 btn center">
                            Jugar
                        </Link>
                        <Link to={"/about"} className="w100 btn center">
                            Sobre la app
                        </Link>
                        <Link to={"/contact"} className="w100 btn center">
                            Contacto
                        </Link>
                    </div>
                </div>
            </DecorativeHeaderSpace>
        </>
    );
}
