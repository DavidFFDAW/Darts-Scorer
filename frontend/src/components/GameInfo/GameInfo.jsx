import { Fragment } from "react";

export default function GameInfo ({ user, round, shots, players, maxShots, maxRounds }) {

    return (<Fragment>
            <div className="flex between">
                <label className="dbug">Turno: { user }</label><br/>
                <label className="dbug">Ronda: { Math.floor(+round / +maxShots / +players.length) }/{ maxRounds }</label>
                <label className="dbug">Tiro: { shots }/{ maxShots }</label>
            </div>
        </Fragment>
    );
}