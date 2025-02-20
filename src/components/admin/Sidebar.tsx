
import { Link } from 'react-router-dom';
import {FaHome, FaUser, FaTable, FaBell, FaSignInAlt, FaUserPlus, FaCheckCircle} from 'react-icons/fa';

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
                <Link to="/profile" className="menu-item">
                    <FaUser className="icon" />
                    <span>Profile</span>
                </Link>
                <Link to="/tables" className="menu-item">
                    <FaTable className="icon" />
                    <span>Tables</span>
                </Link>

                <Link to="/notifications" className="menu-item">
                    <FaBell className="icon" />
                    <span>Notifications</span>
                </Link>
                <Link to="/result-check" className="menu-item">
                    <FaCheckCircle className="icon" />
                    <span>Result Check</span>
                </Link>

                <div className="auth-section">
                    <h3>AUTH PAGES</h3>
                    <Link to="/Signin" className="menu-item">
                        <FaSignInAlt className="icon" />
                        <span>Sign In</span>
                    </Link>
                    <Link to="/Signup" className="menu-item">
                        <FaUserPlus className="icon" />
                        <span>Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;