import React from "react";
import ThemesSwitcher from "./Components/ThemeSwitcher/ThemesSwitcher";
import Faculties from "./pages/Faculties/Faculties";
import "./styles/main.scss";

function App() {
    return (
        <div className="background">
            <ThemesSwitcher />
            <Faculties />
        </div>
    );
}

export default App;
