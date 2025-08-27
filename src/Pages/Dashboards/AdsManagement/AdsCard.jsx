import { DollarSignIcon, Eye, Users } from 'lucide-react';

const AdsCard = () => {
    return (
        <div>
      <div className="grid grid-cols-3 gap-10 mb-8">
        <div className="p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium opacity-80">Total Ads</p>
            <Users className="w-5 h-5 text-[#B8860B]" />
          </div>
          <p className="text-3xl font-medium mt-4 ">523</p>
          <p className="text-lg text-gray-500">+12% from last month</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium opacity-80">Total Click</p>
            <DollarSignIcon className="w-5 h-5 text-[#019701]" />
          </div>
          <p className="text-3xl font-medium mt-4 text-[#019701]">$12,123</p>
          <p className="text-lg text-gray-500">+12% from last month</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium opacity-80">Total View</p>
            <Eye className="w-5 h-5 text-[#B8860B]" />
          </div>
          <p className="text-3xl font-medium mt-4 ">123</p>
          <p className="text-lg text-gray-500">+12% from last month</p>
        </div>
      </div>
    </div>
    );
};

export default AdsCard;