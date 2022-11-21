import { Route, Routes } from "react-router-dom";

export function GamesRouting() {
    return (
        <Routes>
            <Route path="/" element={<h1>Games</h1>} />
        </Routes>
    );
}
