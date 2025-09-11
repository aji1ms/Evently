import { Star } from 'lucide-react';

const RatingDistribution = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h2>
            <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-20">
                        <span className="text-sm font-medium">10</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${10}%` }}
                        ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                        2(33%)
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RatingDistribution;
