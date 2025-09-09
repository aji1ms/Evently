import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
}

const StatsCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    change,
    changeType = 'neutral',
}) => {
    const changeColorClass = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-600'
    }[changeType];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        {icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {(change) && (
                <div className="mt-4 flex items-center justify-between">
                    {change && (
                        <div className={`flex items-center space-x-1 ${changeColorClass}`}>
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">{change}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatsCard;