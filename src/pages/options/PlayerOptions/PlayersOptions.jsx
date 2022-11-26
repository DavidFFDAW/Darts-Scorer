import { TitleIcon } from '../../../components/icon/Icon';
import { FlexBetween, FlexEnd, FormItem } from '../../../components/layouts/Layouts';
import usePlayersOptions from './hooks/usePlayersOptions';

export default function PlayersOptions() {
    const { curriedOnChange, players, validatePlayers, onSubmit } = usePlayersOptions();

    const isFormValid = validatePlayers(players.map(it => it.name));

    return (
        <div className="animate__animated animate__fadeInLeft flex center grow panel-down">
            <div className="flex between column panel">
                <form onSubmit={onSubmit} style={{ width: '100%' }}>
                    {players.map(player => (
                        <FormItem key={player.index}>
                            <FlexBetween>
                                <TitleIcon icon={'person'} />
                                <label style={{ width: '100%', marginLeft: 15 }}>Jugador {player.index}</label>
                            </FlexBetween>

                            <input type="text" maxLength={3} onChange={curriedOnChange(player.index)} value={player.name} />
                        </FormItem>
                    ))}

                    <FlexEnd>
                        <button type="submit" className="btn spec" disabled={!isFormValid}>
                            ¡Jugar!
                        </button>
                    </FlexEnd>
                </form>
            </div>
        </div>
    );
}
