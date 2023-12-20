import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layouts from "./Layouts"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Layouts />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
