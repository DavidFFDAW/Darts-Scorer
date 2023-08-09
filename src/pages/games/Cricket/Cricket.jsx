import { GeneralHeaderWithNoRound } from 'components/headers/GeneralHeader';
import { Icon } from 'components/icon/Icon';
import { FlexCenter } from 'components/layouts/Layouts';
import ButtonGrid from '../Games01/components/buttons/ButtonGrid';
import Scorer from '../Games01/components/scorer/Scorer';
import Nullable from 'components/loaders/Nullable';
import useTabs from './components/Tabs/useTabs';
import Tab from './components/Tabs/Tab';
import CricketScoresTable from './components/Boards/CricketScoresTable';
import useCricket from './hooks/useCricket';

export default function Cricket() {
    const { tabs, activeTab, setTab } = useTabs();
    const { darts, deleteGame, onButtonClick } = useCricket();

    const onClickHandler = e => {
        const { dataset } = e.target;
        const buttonValue = dataset.value;

        onButtonClick(Number(buttonValue), {
            label: e.target.textContent,
            value: Number(buttonValue),
        });
    };

    const currentRound = Math.floor(darts.round / darts.players.length);
    const currentMaxRound = darts.maxRound / darts.players.length / 3; // 3 turns

    return (
        <section className="cricket-game">
            <GeneralHeaderWithNoRound>
                <div></div>
                <span style={{ textTransform: 'capitalize' }}>{darts.game}</span>
                <span onClick={deleteGame} style={{ cursor: 'pointer' }}>
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

            <Scorer scorer={darts.scorer} combinations={false} />

            <div className="w100 flex center">
                <div className="w90 flex start" style={{ gap: 2 }}>
                    <Tab text={'Puntos'} active={activeTab === tabs.points} click={_ => setTab(tabs.points)} />
                    <Tab text={'Tabla'} active={activeTab === tabs.board} click={_ => setTab(tabs.board)} />
                </div>
            </div>
            <div className="tab-content">
                <Nullable condition={activeTab === tabs.points}>
                    <div className="flex center column w100 buttons-grid animate__animated animate__fadeIn">
                        <ButtonGrid onClick={onButtonClick} />
                        <div className="grid btn-grid grid-2">
                            <button className="btn empty">0</button>
                            <button className="btn out" data-value={0} onClick={onClickHandler}>
                                Out
                            </button>
                            <button className="btn empty">0</button>
                        </div>
                    </div>
                </Nullable>

                <Nullable condition={activeTab === tabs.board}>
                    <div className="flex center column w100 buttons-grid animate__animated animate__fadeIn">
                        <CricketScoresTable darts={darts} />
                    </div>
                </Nullable>
            </div>
        </section>
    );
}
