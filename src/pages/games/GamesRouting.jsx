import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import GamesGuard from './Games01/guards/GamesGuard';

const Games01 = lazy(() => import('./Games01/Games01'));

export default function GamesRouting() {
    return (
        <Routes>
            <Route element={<GamesGuard />}>
                <Route path="/type/301/game/:game/board" element={<Games01 />} />
                <Route path="/type/cricket/game/board" element={<h1>Cricket</h1>} />
            </Route>
        </Routes>
    );
}
