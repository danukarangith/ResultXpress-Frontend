
import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaTable,
    FaSignInAlt,
    FaUserPlus,

    FaClipboardList,
    FaUserGraduate, FaUserCog
} from 'react-icons/fa';
import '../../styles/sidebar.css';
import {useState} from "react";  // Import the Sidebar CSS file

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState<string>('');  // Track active menu item

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);  // Update active menu
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <h2>Student Manage System</h2>
            </div>
            <div className="menu-items">
                <NavLink
                    to="/admin-dashboard"
                    className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('dashboard')}
                >
                    <FaHome className="icon" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/result"
                    className={`menu-item ${activeMenu === 'new-result' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('new-result')}
                >
                    <FaClipboardList className="icon" />
                    <span> Results Manage</span>
                </NavLink>
                <NavLink
                    to="/excel"
                    className={`menu-item ${activeMenu === 'previous-results' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('previous-results')}
                >
                    <FaTable className="icon" />
                    <span>Excel Sheet Result</span>
                </NavLink>
                <NavLink
                    to="/Students"
                    className={`menu-item ${activeMenu === 'download-report' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('download-report')}
                >
                    <FaUserGraduate className="icon" />
                    <span>Students Manage</span>
                </NavLink>
                <NavLink
                    to="/admin"
                    className={`menu-item ${activeMenu === 'profile-settings' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('profile-settings')}
                >
                    <FaUserCog className="icon" />
                    <span>Admins Manage</span>
                </NavLink>

                <div className="auth-section">
                    <h3>AUTH PAGES</h3>
                    <NavLink
                        to="/sign-in"
                        className={`menu-item ${activeMenu === 'sign-in' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('sign-in')}
                    >
                        <FaSignInAlt className="icon" />
                        <span>Sign In</span>
                    </NavLink>
                    <NavLink
                        to="/sign-up"
                        className={`menu-item ${activeMenu === 'sign-up' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('sign-up')}
                    >
                        <FaUserPlus className="icon" />
                        <span>Sign Up</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
