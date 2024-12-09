import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../shared/styles/main.scss";
import Header from "../features/Header/ui/Header";
import LoginPage from "../pages/LoginPage/ui/LoginPage";
import HomePage from "../pages/HomePage/ui/HomePage";
import NotFound from "../pages/NotFound/ui/NotFound";
import DisciplinesPage from "../pages/DisciplinesPage/DisicplinesPage";
import Roadmap from "../pages/Roadmap/Roadmap";

function App() {
    return (
        <Router>
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route
                        path="/home/:faculty/:direction"
                        element={<DisciplinesPage />}
                    />
                    <Route path="/:roadmap" />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
