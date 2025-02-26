
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const CompletedTasksChart = () => {
    const data = [
        { name: 'Apr', tasks: 50 },
        { name: 'May', tasks: 70 },
        { name: 'Jun', tasks: 300 },
        { name: 'Jul', tasks: 250 },
        { name: 'Aug', tasks: 300 },
        { name: 'Sep', tasks: 500 },
        { name: 'Oct', tasks: 300 },
        { name: 'Nov', tasks: 400 },
        { name: 'Dec', tasks: 500 },
    ];

    return (
        <div className="chart-container">
            <h3>Completed Tasks</h3>
            <p>Last year Performance</p>
            <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="tasks" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-footer">
                <span>just updated</span>
            </div>
        </div>
    );
};