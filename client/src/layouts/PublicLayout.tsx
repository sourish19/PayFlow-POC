import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
