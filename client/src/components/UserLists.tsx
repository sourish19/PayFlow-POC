import { Input } from './ui/input';
import UserRow from './UserRow';

const MOCK_USERS = [
  { id: 1, name: 'User 1', avatarInitial: 'U1' },
  { id: 2, name: 'User 2', avatarInitial: 'U2' },
  { id: 3, name: 'User 3', avatarInitial: 'U3' },
];

const UserLists = () => {
  return (
    <div className="mt-8 text-white">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
        Users
        <span className="text-xs text-neutral-500">({MOCK_USERS.length})</span>
      </h2>

      <Input
        placeholder="Search users..."
        className="mb-5 h-11 rounded-xl border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500"
      />

      <div className="flex flex-col gap-4">
        {MOCK_USERS.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserLists;
