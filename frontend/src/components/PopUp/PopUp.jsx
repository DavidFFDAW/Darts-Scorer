import { Fragment } from "react";

export default function PopUp ({ toggled, toggler, content, stat, additionalCallback }) {
    
    const setThePopUp = _ => {
        return stat ? toggler({ stat: false }) : toggler(false);
    }


    return (<Fragment>
            { toggled && <div className="absolute action-block"></div> }
            { toggled && <div className="box popup flex center vertical form">
                    <h4>{ content || '' }</h4>

                <button className="btn btn-close red" onClick={ _ => setThePopUp() }>&times;</button>
            </div> }
        </Fragment>
    );
}