import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentDashboard from './components/student/StudentDashboard.tsx';
import './styles/Dashboard.css';
import NewResult from "./components/student/NewResult.tsx";
import PreviousResult from "./components/student/PreviousResult.tsx";
import DownloadReport from "./components/student/DownloadReport.tsx";
import ProfileSettings from "./components/student/ProfileSetting.tsx";
import LoginPage from "./pages/SignIn.tsx";
import AdminDashboard from "./components/admin/AdminDashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ResultManage from "./components/admin/ResultManage.tsx";
import ExcelUpload from "./components/admin/ExcelUpload.tsx";
import StudentManage from "./components/admin/StudentManage.tsx";
import AdminManage from "./components/admin/AdminManage.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Student Protected Routes */}
                <Route path="/student-dashboard" element={<ProtectedRoute element={<StudentDashboard />} allowedRole="STUDENT" />} />
                <Route path="/new-result" element={<ProtectedRoute element={<NewResult />} allowedRole="STUDENT" />} />
                <Route path="/previous-results" element={<ProtectedRoute element={<PreviousResult />} allowedRole="STUDENT" />} />
                <Route path="/download-report" element={<ProtectedRoute element={<DownloadReport />} allowedRole="STUDENT" />} />
                <Route path="/profile-settings" element={<ProtectedRoute element={<ProfileSettings />} allowedRole="STUDENT" />} />

                {/* Admin Protected Routes */}
                <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRole="ADMIN" />} />
                <Route path="/result" element={<ProtectedRoute element={<ResultManage/>} allowedRole="ADMIN" />} />
                <Route path="/excel" element={<ProtectedRoute element={<ExcelUpload/>} allowedRole="ADMIN" />} />
                <Route path="/Students" element={<ProtectedRoute element={<StudentManage/>} allowedRole="ADMIN" />} />
                <Route path="/admin" element={<ProtectedRoute element={<AdminManage/>} allowedRole="ADMIN" />} />



                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
