function CricketIcons({ value }) {

    if (!value) return null;
    if (value <= 0) return null;
    if (value === 1) return '/';
    if (value === 2) return 'X';
    if (value >= 3) return 'XO';
}

function Points({ point, players }) {
    const [key, value] = point;

    return (
        <tr className="normal-row">
            <td className="number" align="start" style={{ width: 100}}>
                {key}
            </td>
            {players.map((player, inx) => (
                <td key={inx}>
                    <CricketIcons value={value[player.id]}/>
                </td>
            ))}
        </tr>
    );
}

export default function CricketScoresTable({ darts }) {
    const userPoints = Object.entries(darts.scorer.board.reduce((previous, current) => {
        const points = Object.entries(current.valid_points);
        points.forEach(([key, _]) => {
            previous[key] = {
                ...previous[key.toString()],
                [current.id]: current.valid_points[key],
            };
        });

        return previous;
    }, []));

    return (
        <>
            <div className="table-container">
                <table className="table" align="center" width={'100%'}>
                    <thead>
                        <tr>
                            <th style={{ width: 100}}></th>
                            {darts.players.map((player, indx) => {
                                return <th key={indx}>{player.name}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {userPoints.map((point, index) => <Points point={point} players={darts.players} key={index} />)}
                    </tbody>
                </table>
            </div>
        </>
    );
}
