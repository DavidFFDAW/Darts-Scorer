import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../components/routes/RouteWithNotfound";
import OptionsHeader from "./components/OptionsHeader";

const GameOptions = lazy(() => import("./GameOptions/GameOptions"));
const GamePlayersOptions = lazy(() => import("./PlayerOptions/PlayersOptions"));

export default function OptionsRouting() {
    return (
        <>
            <OptionsHeader />
            <RoutesWithNotFound>
                <Route
                    path="/"
                    element={<Navigate to={"/options/game"} replace />}
                />
                <Route path="game" element={<GameOptions />} />
                <Route
                    path="players/:num/game/:game"
                    element={<GamePlayersOptions />}
                />
            </RoutesWithNotFound>
        </>
    );
}
