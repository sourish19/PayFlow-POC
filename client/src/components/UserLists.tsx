import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '@/api/auth/searchUser';
import { getUserApi } from '@/api/auth/getUser';

import UserRow from './UserRow';
import { Input } from './ui/input';

const UserLists = () => {
  const [keyword, setKeyword] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['searchedUsers', keyword],
    queryFn: () => searchUsers(keyword),
    staleTime: 30 * 1000,
  });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    staleTime: 2 * 60 * 1000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const filteredUsers =
    data?.data.filter((user) => user.id !== userData?.data.id) ?? [];

  return (
    <div className="mt-8 text-white">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
        Users
        <span className="text-xs text-neutral-500">
          ({filteredUsers.length})
        </span>
      </h2>

      <Input
        placeholder="Search users..."
        className="mb-5 h-11 rounded-xl border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500"
        onChange={handleChange}
      />

      <div className="flex flex-col gap-4">
        {filteredUsers.map((user) => (
          <UserRow
            key={user.id}
            id={user.id}
            email={user.email}
            fullName={user.fullName}
          />
        ))}
      </div>
    </div>
  );
};

export default UserLists;
