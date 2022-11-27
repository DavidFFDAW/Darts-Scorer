import SingleScorer from './SingleScorer';

export default function Scorer({ scorer }) {
    const isCurrent = player => player.id === scorer.userId;

    return (
        <>
            <div className="flex around gap wrap down">
                {scorer.board.map((player, index) => {
                    return <SingleScorer key={index} score={player} active={isCurrent(player)} />;
                })}
            </div>
        </>
    );
}
