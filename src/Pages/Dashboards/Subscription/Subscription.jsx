import SubscribersCard from "./SubscribersCard";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
 
  return (
    <div>
      <h1 className='text-3xl font-bold mb-7'>Subscribers</h1>
      <SubscribersCard/>
      <SubscriptionCard/>
    </div>
  );
};

export default Subscription;
