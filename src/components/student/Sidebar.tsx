import { Link } from 'react-router-dom';
import { FaHome,  FaTable,  FaSignInAlt, FaUserPlus, FaCog, FaDownload, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>Student Manage System</h2>
            </div>
            <div className="menu-items">
                <Link to="/dashboard" className="menu-item active">
                    <FaHome className="icon" />
                    <span>Dashboard</span>
                </Link>
                <Link to="/new-result" className="menu-item">
                    <FaClipboardList className="icon" />
                    <span>New Result</span>
                </Link>
                <Link to="/previous-results" className="menu-item">
                    <FaTable className="icon" />
                    <span>Previous Results</span>
                </Link>
                <Link to="/download-report" className="menu-item">
                    <FaDownload className="icon" />
                    <span>Download Report</span>
                </Link>
                <Link to="/profile-settings" className="menu-item">
                    <FaCog className="icon" />
                    <span>Profile Settings</span>
                </Link>

                <div className="auth-section">
                    <h3>AUTH PAGES</h3>
                    <Link to="/sign-in" className="menu-item">
                        <FaSignInAlt className="icon" />
                        <span>Sign In</span>
                    </Link>
                    <Link to="/sign-up" className="menu-item">
                        <FaUserPlus className="icon" />
                        <span>Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
