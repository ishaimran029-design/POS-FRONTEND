import React from 'react';
import GlobalPieChart from '@/components/global-components/PieChart';
import BarChartLabelCustom from '@/components/global-components/BarChartLabelCustom';

interface ReportsChartsProps {
    charts?: {
        revenueByDate?: { date: string; revenue: number }[];
        paymentBreakdown?: { paymentMethod: string; revenue: number }[];
    };
}


const ReportsCharts: React.FC<ReportsChartsProps> = ({ charts = {} }) => {
    const dailyData = charts.revenueByDate?.map(d => ({
        name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: Math.round(d.revenue)
    })) || [];

    const paymentColors = ['#262255', '#24608F', '#508CBB', '#7CB8E7', '#A8D4F3'];
    const paymentData = charts.paymentBreakdown?.map((p, index) => ({
        name: p.paymentMethod || 'Other',
        value: Math.round(p.revenue),
        color: paymentColors[index % paymentColors.length]
    })) || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Daily Revenue Trend */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-[480px] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Daily Revenue Trend</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Past 7 Days performance</p>
                    </div>
                </div>
                
                <div className="flex-1 w-full mt-4">
                    <BarChartLabelCustom 
                        data={dailyData} 
                        dataKey="revenue" 
                        labelKey="name" 
                        noWrapper 
                        height="h-[350px]"
                        config={{
                            revenue: { label: "Revenue", color: "#262255" }
                        }}
                    />
                </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-[480px] hover:shadow-lg transition-all duration-300">
                <GlobalPieChart 
                    noWrapper 
                    data={paymentData} 
                    dataKey="value" 
                    nameKey="name" 
                    title="Payment Breakdown" 
                    subtitle="Method distribution Share" 
                    centerLabel="100%"
                    innerRadius={80}
                    outerRadius={110}
                    showLabels={false}
                />
            </div>
        </div>
    );
};

export default ReportsCharts;
