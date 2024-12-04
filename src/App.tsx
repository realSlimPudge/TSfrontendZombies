import React from "react";
import ThemesSwitcher from "./Components/ThemeSwitcher/ThemesSwitcher";
import "./styles/main.scss";

function App() {
    return (
        <div className="background">
            <ThemesSwitcher />
            <div className="test-dark-theme">Test Dark Theme</div>
        </div>
    );
}

export default App;
