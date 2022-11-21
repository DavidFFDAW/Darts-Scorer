import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RoutesWithNotFound from "./components/routes/RouteWithNotfound";
import { Spinner } from "./components/spinner/Spinner";

const Home = lazy(() => import("./pages/home/HomePage"));
const GamesRouting = lazy(() => import("./pages/games/GamesRouting"));
const OptionsRouting = lazy(() => import("./pages/options/OptionsRouting"));

export function AppRouting() {
    return (
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <RoutesWithNotFound>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/options/*" element={<OptionsRouting />} />
                    <Route path="/games/*" element={<GamesRouting />} />
                </RoutesWithNotFound>
            </BrowserRouter>
        </Suspense>
    );
}
