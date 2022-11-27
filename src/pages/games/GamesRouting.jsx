import { APP_ROUTES } from 'AppSetting';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import GamesGuard from './Games01/guards/GamesGuard';

const Games01 = lazy(() => import('./Games01/Games01'));

export default function GamesRouting() {
    const { GAMES } = APP_ROUTES;
    return (
        <Routes>
            <Route element={<GamesGuard />}>
                <Route path={GAMES.X01} element={<Games01 />} />
                <Route path={GAMES.CRICKET} element={<h1>Cricket</h1>} />
            </Route>
        </Routes>
    );
}
