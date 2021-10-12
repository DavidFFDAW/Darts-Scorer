import { Fragment } from "react";

export default function Scorer ({ scoreboard, lastShot, average }) {

    return (<Fragment>
            <div className="flex between wrap">
                { scoreboard.map((item, index) => {
                    return (<div className="scorer score" key={ index }>
                        <label className="title">{ item.name }</label>
                        <h4 className="point">{ item.score }</h4>
                        { lastShot && <label>Last: { item.last || 'None' }</label> }
                        { average && <label>Pr: { item.average || '0' }</label> }
                    </div>
                    );
                }) }
            </div>
        </Fragment>
    );
}