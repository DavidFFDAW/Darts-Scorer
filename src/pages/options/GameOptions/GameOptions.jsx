import React from "react";
import { TitleIcon } from "../../../components/icon/Icon";
import {
    FlexBetween,
    FlexCenter,
    FormItem,
} from "../../../components/layouts/Layouts";
import Chip from "../components/Chip";
import useGameOptions from "../hooks/useGameOptions";

export default function GameOptions() {
    const {
        isValidGame,
        isValidPlayers,
        availableGames,
        availablePlayers,
        validTypes,
        game,
        players,
        onSubmit,
        onClickChip,
    } = useGameOptions();

    const isValidForm = isValidGame(game) && isValidPlayers(players);

    return (
        <div className="animate__animated animate__fadeInLeft flex center grow panel-down">
            <div className="flex between column panel">
                <form
                    method="GET"
                    action="/options/players/:num/game/:game"
                    onSubmit={onSubmit}
                    style={{ width: "100%" }}
                >
                    <FormItem>
                        <FlexBetween style={{ marginBottom: 25 }}>
                            <TitleIcon icon={"person"} />
                            <label style={{ width: "100%", marginLeft: 15 }}>
                                Jugadores
                            </label>
                        </FlexBetween>
                        <FlexCenter>
                            <div className="grid grid-three-column">
                                {availablePlayers.map((player) => (
                                    <Chip
                                        key={player}
                                        onClick={onClickChip}
                                        type={validTypes.players}
                                        value={player}
                                        current={players}
                                        css={false}
                                        style={{ fontSize: 14 }}
                                    />
                                ))}
                            </div>
                        </FlexCenter>
                    </FormItem>
                    <FormItem className="down">
                        <FlexBetween>
                            <TitleIcon icon={"sports_esports"} />
                            <label style={{ width: "100%", marginLeft: 15 }}>
                                Juego
                            </label>
                        </FlexBetween>
                        <FlexCenter>
                            <div className="grid grid-two-column down small">
                                {availableGames.map((gameN) => (
                                    <Chip
                                        key={gameN}
                                        value={gameN}
                                        type={validTypes.game}
                                        current={game}
                                        onClick={onClickChip}
                                    ></Chip>
                                ))}
                            </div>
                        </FlexCenter>
                    </FormItem>

                    <div className="flex end down">
                        <button
                            type="submit"
                            className="btn spec"
                            disabled={!isValidForm}
                        >
                            Siguiente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
