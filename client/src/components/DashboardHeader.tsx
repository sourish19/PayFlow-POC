import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getUserApi } from '@/api/auth/getUser';

const DashboardHeader = () => {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    staleTime: 2 * 60 * 1000,
  });

  const navigate = useNavigate();

  if (isError) navigate('/login');

  if (isSuccess)
    return (
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-6 py-5 backdrop-blur supports-backdrop-filter:bg-neutral-900/60">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          PayFlow
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            Hello, {data?.data.fullName}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700 font-semibold text-white">
            {data?.data.fullName.at(0)?.toUpperCase()}
          </div>
        </div>
      </div>
    );
};

export default DashboardHeader;
