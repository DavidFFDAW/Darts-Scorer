import { APP_ROUTES } from 'AppSetting';
import { DartsContextProvider } from 'context/DartsContext';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RoutesWithNotFound from './components/routes/RouteWithNotfound';
import { Spinner } from './components/spinner/Spinner';

const Home = lazy(() => import('./pages/home/HomePage'));
const GamesRouting = lazy(() => import('./pages/games/GamesRouting'));
const OptionsRouting = lazy(() => import('./pages/options/OptionsRouting'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const Changelog = lazy(() => import('./pages/changelog/ChangelogPage'));

export function AppRouting() {
    return (
        <DartsContextProvider>
            <Suspense fallback={<Spinner />}>
                <BrowserRouter>
                    <RoutesWithNotFound>
                        <Route path={APP_ROUTES.HOME} element={<Home />} />
                        <Route path={APP_ROUTES.ABOUT} element={<h1>About</h1>} />
                        <Route path={APP_ROUTES.CHANGELOG} element={<Changelog />} />
                        <Route path={APP_ROUTES.CONTACT} element={<ContactPage />} />
                        <Route path={APP_ROUTES.OPTIONS.PARENT} element={<OptionsRouting />} />
                        <Route path={APP_ROUTES.GAMES.PARENT} element={<GamesRouting />} />
                    </RoutesWithNotFound>
                </BrowserRouter>
            </Suspense>
        </DartsContextProvider>
    );
}
