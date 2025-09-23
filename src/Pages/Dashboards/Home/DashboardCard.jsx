import { DollarSignIcon, Eye, Users } from "lucide-react";
import SubscriptionCard from "../Subscription/SubscriptionCard";

const DashboardCard = ({data}) => {

  const {
    earning,
    subscription_count,
    subscription_plans,
    user_count
  } = data;

  return (
    <>
      <div className="grid grid-cols-3 gap-10 mb-8">
        <div className="p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium opacity-80">Total User</p>
            <Users className="w-5 h-5 text-[#B8860B]" />
          </div>
          <p className="text-3xl font-medium mt-4 ">{user_count}</p>
          {/* <p className="text-lg text-gray-500">+12% from last month</p> */}
        </div>
        <div className="p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium opacity-80">Total Earning</p>
            <DollarSignIcon className="w-5 h-5 text-[#019701]" />
          </div>
          <p className="text-3xl font-medium mt-4 text-[#019701]">${earning}</p>
          {/* <p className="text-lg text-gray-500">+12% from last month</p> */}
        </div>
        <div className="p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium opacity-80">Total Subscriber</p>
            <Eye className="w-5 h-5 text-[#B8860B]" />
          </div>
          <p className="text-3xl font-medium mt-4 ">{subscription_count}</p>
          {/* <p className="text-lg text-gray-500">+12% from last month</p> */}
        </div>
      </div>
      <SubscriptionCard plan={subscription_plans} />
    </>
  );
};

export default DashboardCard;
