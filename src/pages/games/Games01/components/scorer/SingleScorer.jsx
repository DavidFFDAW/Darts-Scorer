export default function SingleScorer({ score, active }) {
    const classes = 'flex start column single-score' + (active ? ' active' : ' inactive');
    return (
        <div className={classes}>
            <div className="flex center">
                <span>{score.name}</span>
            </div>
            <div className="flex center num-container">
                <span className="number">{score.score}</span>
            </div>
            <div className="flex center combinations">
                <span>combinations</span>
            </div>
        </div>
    );
}
