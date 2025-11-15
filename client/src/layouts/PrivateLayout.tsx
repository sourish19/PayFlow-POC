import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { getUserApi } from '@/api/auth/getUser';

const PrivateLayout = () => {
  const navigate = useNavigate();

  const { isPending, isError, isSuccess, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error.message);
      }
      navigate("/login", { replace: true });
    }
  }, [isError, error, navigate]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <Outlet />
      </div>
    );
  }

  return null;
};

export default PrivateLayout;
