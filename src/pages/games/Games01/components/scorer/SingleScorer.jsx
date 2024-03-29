export default function SingleScorer({ score, active, turn, combinations = true }) {
    const classes = 'flex start column single-score' + (active ? ' active' : ' inactive');
    const innerCombinations = score.combinations && score.combinations.length > 0 ? score.combinations.join(' - ') : 'No combinations';

    return (
        <div className={classes}>
            <div className="flex center">
                <span>{score.name}</span>
            </div>
            <div className="flex center num-container">
                <span className="number pointer">{score.score}</span>
            </div>
            {combinations ? (
                <div className="flex center column combinations">
                    <span style={{ display: 'block' }}>Combinación ganadora: </span>
                    <span className="combination-span" style={{ display: 'block' }}>
                        [ {innerCombinations} ]
                    </span>
                </div>
            ) : (
                <div style={{ height: 20 }}></div>
            )}

            <div className="flex center">
                <span style={{ fontSize: 12 }}>Turno: {score.turn} / 3</span>
            </div>
        </div>
    );
}
