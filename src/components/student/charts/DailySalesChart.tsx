
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const DailySalesChart = () => {
    const data = [
        { name: 'Apr', gpa: 90 },
        { name: 'May', gpa: 60 },
        { name: 'Jun', gpa: 70 },
        { name: 'Jul', gpa: 63 },
        { name: 'Aug', gpa: 55 },
        { name: 'Sep', gpa: 65 },
        { name: 'Oct', gpa: 60 },
        { name: 'Nov', gpa: 70 },
        { name: 'Dec', gpa: 55 },
    ];

    return (
        <div className="chart-container">
            <h3>GPA Chart</h3>
            <p>15% increase in today sales</p>
            <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="gpa" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-footer">
                <span>updated 4 min ago</span>
            </div>
        </div>
    );
};