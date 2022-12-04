export default function SingleScorer({ score, active, turn }) {
    const classes = 'flex start column single-score' + (active ? ' active' : ' inactive');
    return (
        <div className={classes}>
            <div className="flex center">
                <span>{score.name}</span>
            </div>
            <div className="flex center num-container">
                <span className="number pointer">{score.score}</span>
            </div>
            <div className="flex center combinations">
                <span style={{ fontSize: 12 }}>No combinations</span>
            </div>
            <div className="flex center">
                <span style={{ fontSize: 12 }}>{score.turn} / 3</span>
            </div>
        </div>
    );
}
