import DashboardCard from './DashboardCard';
import RecentUser from './RecentUser';

import useFetch from '../../../lib/useFetch';
import { dashboardUrl } from '../../../../endpoints';

const Home = () => {

    const {data, loading, error} = useFetch(dashboardUrl);

    if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <svg
            className="animate-spin h-14 w-14 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            />
            <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
        </div>
    );
    }

    return (
         <div>
            <h1 className='text-3xl font-bold mb-7'>Dashboard Overview</h1>
            <DashboardCard data={data} />
            <RecentUser user_list={data.user_list} />
        </div>
    );
};

export default Home;