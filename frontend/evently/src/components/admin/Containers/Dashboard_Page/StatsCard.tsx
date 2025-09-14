interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const StatsCard: React.FC<StatCardProps> = ({ title, value, icon }) => {

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
        </div>
    );
};

export default StatsCard;