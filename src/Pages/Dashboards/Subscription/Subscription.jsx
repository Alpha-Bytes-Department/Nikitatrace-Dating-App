import SubscriberList from "./SubscriberList";
import SubscribersCard from "./SubscribersCard";
import SubscriptionCard from "./SubscriptionCard";
import Loading from "../../../components/Common/Loading";

import useFetch from "../../../lib/useFetch";
import {subscriptionUrl} from "../../../../endpoints"

const Subscription = () => {
  const {data, loading } = useFetch(subscriptionUrl);

  return (
    loading
    ?
    <Loading />
    : 
    <div>
      <h1 className='text-3xl font-bold mb-7'>Subscribers</h1>
      <SubscribersCard data = {data}/>
      <SubscriptionCard plan={data.subscription_plans}/>
      <SubscriberList subscribers={data.subscribers}/>
    </div>
    )
  };

export default Subscription;
