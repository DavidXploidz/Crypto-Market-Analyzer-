import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';

interface HistoryChartProps {
    data: {
        time: string;
        price: number;
    }[];
}

const HistoryChart = ({ data }: HistoryChartProps) => {
    return (
        <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis
                        dataKey="time"
                        hide
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        orientation="right"
                        tick={{ fill: 'white' }}
                        tickFormatter={(number) => `$${number.toLocaleString()}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value: number | undefined) => [`$${value?.toLocaleString() ?? '0'}`, 'Price']}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistoryChart;
