export default function CricketScoresTable({ darts }) {
    const validPoints = Object.keys(darts.scorer.board[0].valid_points);

    const datas = {
        points: validPoints,
        scorer: darts.scorer.board,
    };

    console.log({ darts, validPoints });

    return (
        <>
            <div className="table-container">
                <table class="table" align="center" width={'100%'}>
                    <thead>
                        <th></th>
                        {darts.players.map((player, indx) => {
                            return <th key={indx}>{player.name}</th>;
                        })}
                    </thead>
                    <tbody>
                        {validPoints.map((score, indx) => {
                            return (
                                <tr className="normal-row" key={indx}>
                                    <td className="number" align="center">
                                        {score}
                                    </td>
                                    <td align="center">asdaaad</td>
                                    <td align="center">asdaaad</td>
                                    <td align="center">asdaaad</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
