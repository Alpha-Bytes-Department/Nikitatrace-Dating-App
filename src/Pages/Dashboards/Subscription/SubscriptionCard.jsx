import React from 'react';

const SubscriptionCard = () => {
    return (
        <div>
            <div className="p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h1 className="text-2xl font-semibold mb-5">Subscription Plans</h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xl">Basic Plan</p>
              <p className="text-lg text-gray-500">$12.00/month</p>
            </div>
            <div>
              <button className="bg-black rounded-lg py-2 px-5 text-white hover:scale-105 duration-300">
                1,545 subscribers
              </button>
            </div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xl">Premium Plan</p>
              <p className="text-lg text-gray-500">$50.00/month</p>
            </div>
            <div>
              <button className="bg-black rounded-lg py-2 px-5 text-white hover:scale-105 duration-300">
                545 subscribers
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default SubscriptionCard;