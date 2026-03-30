import GlobalPieChart from '@/components/global-components/PieChart';

interface CategoryPieChartProps {
    data: { name: string; value: number; color: string }[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
    return (
        <GlobalPieChart
            data={data}
            dataKey="value"
            nameKey="name"
            title="Category Distribution"
            subtitle="Sales by product group"
            compact
            innerRadius={50}
            outerRadius={75}
        />
    );
}
