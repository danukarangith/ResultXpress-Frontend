
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const DailySalesChart = () => {
    const data = [
        { name: 'Apr', sales: 65 },
        { name: 'May', sales: 125 },
        { name: 'Jun', sales: 290 },
        { name: 'Jul', sales: 290 },
        { name: 'Aug', sales: 450 },
        { name: 'Sep', sales: 350 },
        { name: 'Oct', sales: 240 },
        { name: 'Nov', sales: 280 },
        { name: 'Dec', sales: 450 },
    ];

    return (
        <div className="chart-container">
            <h3>Daily Sales</h3>
            <p>15% increase in today sales</p>
            <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-footer">
                <span>updated 4 min ago</span>
            </div>
        </div>
    );
};