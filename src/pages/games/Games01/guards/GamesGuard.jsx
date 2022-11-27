import useDarts from 'hooks/useDarts';
import { Navigate, Outlet } from 'react-router-dom';

const doesNotHaveGameStored = <Navigate replace to={'/'} />;
const hasGameStored = <Outlet />;

export default function GamesGuard() {
    const { darts } = useDarts();

    return Object.keys(darts).length === 0 ? doesNotHaveGameStored : hasGameStored;
}
