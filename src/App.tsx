
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/student/Dashboard.tsx';
import './styles/Dashboard.css';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import NewResult from "./components/student/NewResult.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/new-result" element={<NewResult />} />
                {/* Add additional routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;