
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const WebsiteViewChart = () => {
    const data = [
        { name: 'M', views: 45 },
        { name: 'T', views: 20 },
        { name: 'W', views: 10 },
        { name: 'T', views: 20 },
        { name: 'F', views: 40 },
        { name: 'S', views: 10 },
        { name: 'S', views: 35 }
    ];

    return (
        <div className="chart-container">
            <h3>Website View</h3>
            <p>Last Campaign Performance</p>
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
                <span>campaign sent 2 days ago</span>
            </div>
        </div>
    );
};