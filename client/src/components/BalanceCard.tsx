import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from './ui/card';

import { getUserAccBalance } from '@/api/payments/getUserBalance';

const BalanceCard = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['balance'],
    queryFn: getUserAccBalance,
  });

  return (
    <Card className="rounded-2xl border border-neutral-800 bg-neutral-900 text-white shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-neutral-400">Your Balance</p>
          <p className="text-3xl font-semibold tracking-tight text-white">
            ${isSuccess ? data.balance : '0.00'}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-neutral-700 to-neutral-600 text-lg font-bold text-white">
          💰
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
