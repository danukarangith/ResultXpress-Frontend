
import { FaSignInAlt, FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="dashboard-header">
            <div className="breadcrumb">
                <span>Dashboard</span> / <span>Home</span>
            </div>
            <h2>Home</h2>
            <div className="header-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="header-icons">
                    <FaSignInAlt />
                    <FaBell />
                    <FaUser />
                </div>
            </div>
        </div>
    );
};

export default Header;