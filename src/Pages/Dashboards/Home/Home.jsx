import RecentUser from './RecentUser';
import DashboardCard from './DashboardCard';
import Loading from '../../../components/Common/Loading';
import useFetch from '../../../lib/useFetch';
import { dashboardUrl } from '../../../../endpoints';

const Home = () => {
  const { data, loading } = useFetch(dashboardUrl);

  if (loading) return <Loading />;

  return (
    <div className=" min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      <DashboardCard data={data || {}} />
      <RecentUser user_list={data?.user_list || []} />
    </div>
  );
};

export default Home;