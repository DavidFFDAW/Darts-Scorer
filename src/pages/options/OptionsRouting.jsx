import { APP_ROUTES } from 'AppSetting';
import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from '../../components/routes/RouteWithNotfound';
import OptionsHeader from './components/OptionsHeader';

const GameOptions = lazy(() => import('./GameOptions/GameOptions'));
const GamePlayersOptions = lazy(() => import('./PlayerOptions/PlayersOptions'));

export default function OptionsRouting() {
    const { OPTIONS } = APP_ROUTES;
    return (
        <>
            <OptionsHeader />
            <RoutesWithNotFound>
                <Route path="/" element={<Navigate to={OPTIONS.GAME.NAVIGATION} replace />} />
                <Route path={OPTIONS.GAME.ROUTE} element={<GameOptions />} />
                <Route path={OPTIONS.PLAYERS} element={<GamePlayersOptions />} />
            </RoutesWithNotFound>
        </>
    );
}
