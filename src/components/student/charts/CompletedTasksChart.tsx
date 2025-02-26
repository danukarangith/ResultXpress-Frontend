
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export const CompletedTasksChart = () => {
    const data = [

        { name: 'Jul', result: 35 },
        { name: 'Aug', result: 90 },
        { name: 'Sep', result: 85 },
        { name: 'Oct', result: 65 },
        { name: 'Nov', result: 40 },
        { name: 'Dec', result: 90 },
        { name: 'jan', result:55},
        { name: 'feb', result:78}


    ];

    return (
        <div className="chart-container">
            <h3>Month Wise Result</h3>
            <p>Month result performance</p>
            <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="result" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-footer">
                <span>just updated</span>
            </div>
        </div>
    );
};