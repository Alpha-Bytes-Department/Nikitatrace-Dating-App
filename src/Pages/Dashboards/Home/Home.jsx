import DashboardCard from './DashboardCard';
import RecentUser from './RecentUser';

const Home = () => {
    return (
         <div>
            <h1 className='text-3xl font-bold mb-7'>Dashboard Overview</h1>
            <DashboardCard/>
            <RecentUser/>
        </div>
    );
};

export default Home;