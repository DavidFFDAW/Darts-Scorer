export default function CricketBoard ({ players, scoreboard, addPoints, cricketService }) {
    return (
        <div className="down">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        { players.map((it,index) => <th key={ index }>{ it }</th>)}
                    </tr>
                </thead>
                <tbody>
                {
                    cricketService.getScorePoints(scoreboard).map(([key,value],ind) => {
                        return (
                            <tr key={ind}>
                                <td>
                                    <button onClick={ _ => addPoints(key) } className="pt-btn">{ key }</button>
                                    <button onClick={ _ => addPoints(key, 2) } className="pt-btn double">D{ key }</button>
                                    { key !== '25' && <button onClick={ _ => addPoints(key,3) } className="pt-btn triple">T{ key }</button> }
                                </td>
                                { value.map((pt,ix) => <td key={ ix }>{ pt }</td>) }
                            </tr>
                        );
                    })
                }
                <tr>
                    <td colSpan={ players.length + 1 }>
                        <button onClick={ _ => addPoints(0) } className="pt-btn">0</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}