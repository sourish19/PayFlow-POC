import BalanceCard from '@/components/BalanceCard';
import UserLists from '@/components/UserLists';
import DashboardHeader from '@/components/DashboardHeader';

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 text-white">
      <DashboardHeader />

      <div className="animate-in fade-in space-y-8 duration-500">
        <BalanceCard />
        <UserLists />
      </div>
    </div>
  );
};

export default Dashboard;
