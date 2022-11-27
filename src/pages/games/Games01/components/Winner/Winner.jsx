import { useNavigate } from 'react-router-dom';
import { OverlayBlock } from 'components/overlay/OverlayBlock';
import Pyro from 'components/Pyro/Pyro';
import useDarts from 'hooks/useDarts';
import { APP_ROUTES } from 'AppSetting';

export default function Winner({ darts }) {
    const navigate = useNavigate();
    const { deleteGame } = useDarts();

    const onReturnToHomeClick = ev => {
        ev.preventDefault();
        navigate(APP_ROUTES.HOME);
        deleteGame();
    };

    const styles = { zIndex: 100, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    const name = { textTransform: 'capitalize', fontSize: '2rem', fontWeight: 'bold' };

    return (
        <>
            <OverlayBlock />
            <div className="flex center column w100" style={styles}>
                <h1>
                    ¡Ha ganado <span style={name}>{darts.winner.name}</span>!
                </h1>

                <Pyro />

                <span className="btn" onClick={onReturnToHomeClick}>
                    Volver al menú
                </span>
            </div>
        </>
    );
}
