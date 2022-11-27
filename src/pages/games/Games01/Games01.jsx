import Scorer from './components/scorer/Scorer';
import useGames01Type from './hooks/useGames01Type';
import ButtonGrid from './components/buttons/ButtonGrid';
import { OverlayBlock } from 'components/overlay/OverlayBlock';
import { Link } from 'react-router-dom';
import { FlexBetween, FlexCenter } from 'components/layouts/Layouts';

export default function Games01() {
    const { darts, onButtonClick } = useGames01Type();

    if (darts.finished && darts.winner) {
        const styles = { zIndex: 100, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

        return (
            <>
                <OverlayBlock />
                <div className="flex center column w100" style={styles}>
                    <h1>{darts.winner.name} won!</h1>
                    <Link to={'/'} className="btn">
                        Volver al menú
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <FlexCenter className="w90">
                <div>
                    {darts.round - 1} / {darts.maxRound / darts.players.length / 3}
                </div>
            </FlexCenter>

            <Scorer scorer={darts.scorer} />

            <div className="flex center column w100">
                <ButtonGrid onClick={onButtonClick} />
            </div>
        </>
    );
}
