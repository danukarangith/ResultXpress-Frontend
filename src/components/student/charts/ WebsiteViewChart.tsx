
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const WebsiteViewChart = () => {
    const data = [
        { name: 'PRF', views: 90 },
        { name: 'OOP', views: 76 },
        { name: 'ORM', views: 87 },
        { name: 'REACT', views: 20 },
        { name: 'DBMS', views: 55 },
        { name: 'AAD', views: 78 },
        { name: 'SE', views: 35 }
    ];

    return (
        <div className="chart-container">
            <h3>Result View</h3>
            <p>Last Exams Performances</p>
            <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#4caf50" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-footer">
                <span>updated  2 days ago</span>
            </div>
        </div>
    );
};