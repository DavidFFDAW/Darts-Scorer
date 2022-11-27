import { Icon } from 'components/icon/Icon';
import Scorer from './components/scorer/Scorer';
import useGames01Type from './hooks/useGames01Type';
import { FlexCenter } from 'components/layouts/Layouts';
import ButtonGrid from './components/buttons/ButtonGrid';
import { GeneralHeaderWithNoRound } from 'components/headers/GeneralHeader';
import Winner from './components/Winner/Winner';

export default function Games01() {
    const { darts, onButtonClick, deleteGame } = useGames01Type();

    if (darts.finished && darts.winner) {
        return <Winner darts={darts} />;
    }

    const onClickHandler = e => {
        const { dataset } = e.target;
        const buttonValue = dataset.value;
        console.log(buttonValue);
        onButtonClick(Number(buttonValue));
    };

    const currentRound = Math.floor(darts.round / darts.players.length);
    const currentMaxRound = darts.maxRound / darts.players.length / 3;

    return (
        <>
            <GeneralHeaderWithNoRound>
                <div></div>
                <span>{darts.game}</span>
                <span onClick={deleteGame}>
                    <Icon icon={'close'} css={'red'}></Icon>
                </span>
            </GeneralHeaderWithNoRound>

            <div style={{ marginTop: 20 }}>
                <FlexCenter className="w90">
                    <div>
                        Ronda: {currentRound} / {currentMaxRound}
                    </div>
                </FlexCenter>
            </div>

            <Scorer scorer={darts.scorer} />

            <div className="flex center column w100 buttons-grid">
                <ButtonGrid onClick={onButtonClick} />
                <div className="grid btn-grid grid-2">
                    <button className="btn empty">0</button>
                    <button className="btn" data-value={0} onClick={onClickHandler}>
                        Out
                    </button>
                    <button className="btn empty">0</button>
                </div>
            </div>
        </>
    );
}
