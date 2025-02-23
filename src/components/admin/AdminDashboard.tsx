import React from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import { FaMoneyBill, FaUsers, FaUserTie, FaChartLine } from 'react-icons/fa';
import { WebsiteViewChart } from './charts/ WebsiteViewChart.tsx';
import { DailySalesChart } from './charts/DailySalesChart.tsx';
import { CompletedTasksChart } from './charts/CompletedTasksChart.tsx';
import Projects from './Projects.tsx';
import OrdersOverview from './OrdersOverview.tsx';
import '../../styles/Dashboard.css';

// Stat Card Component
interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: string;
    period: string;
    changeType: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, period, changeType }) => {
    return (
        <div className="stat-card">
            <div className="stat-card-icon">{icon}</div>
            <div className="stat-card-content">
                <h3>{title}</h3>
                <h2>{value}</h2>
                <p className={`stat-change ${changeType}`}>
                    {change} than {period}
                </p>
            </div>
        </div>
    );
};

// Main AdminDashboard Component
const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header />

                <div className="stats-row">
                    <StatCard
                        title="Today's admin"
                        value="$53k"
                        icon={<FaMoneyBill />}
                        change="+55%"
                        period="last week"
                        changeType="positive"
                    />
                    <StatCard
                        title="Today's Users"
                        value="2,300"
                        icon={<FaUsers />}
                        change="+3%"
                        period="last month"
                        changeType="positive"
                    />
                    <StatCard
                        title="New Clients"
                        value="3,462"
                        icon={<FaUserTie />}
                        change="-2%"
                        period="yesterday"
                        changeType="negative"
                    />
                    <StatCard
                        title="Sales"
                        value="$103,430"
                        icon={<FaChartLine />}
                        change="+5%"
                        period="yesterday"
                        changeType="positive"
                    />
                </div>

                <div className="charts-row">
                    <WebsiteViewChart />
                    <DailySalesChart />
                    <CompletedTasksChart />
                </div>

                <div className="bottom-row">
                    <Projects />
                    <OrdersOverview />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;