import RecentUser from './RecentUser';
import DashboardCard from './DashboardCard';
import Loading from "../../../components/Common/Loading"

import useFetch from '../../../lib/useFetch';
import { dashboardUrl } from '../../../../endpoints';

const Home = () => {

    const {data, loading, error} = useFetch(dashboardUrl);

    if (loading) {return (<Loading />)}

    return (
         <div>
            <h1 className='text-3xl font-bold mb-7'>Dashboard Overview</h1>
            <DashboardCard data={data} />
            <RecentUser user_list={data.user_list} />
        </div>
    );
};

export default Home;