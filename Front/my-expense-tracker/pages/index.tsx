
import TransactionHistory from '@/components/TransactionHistory';
import Balance from '../components/Balance';
import BalanceChart from '../components/BalanceChart';
import TransactionForm from '../components/TransactionForm';

const HomePage = () => {
  return (
    <div>
      <Balance />
      <BalanceChart />
      <TransactionHistory />
      <TransactionForm />

    </div>
  );
};

export default HomePage;
