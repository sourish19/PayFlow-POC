import { Button } from './ui/button';

type UserProps = {
   id: string;
    email: string;
    fullName: string;
}

const UserRow: React.FC<UserProps> = (data:UserProps) => { 
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-800 p-4 text-white shadow-sm transition hover:bg-neutral-800">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-xs font-bold text-white">
          {data.fullName.at(0)?.toUpperCase()}
        </div>
        <span className="text-[15px] font-medium tracking-tight text-neutral-200">
          {data.fullName}
        </span>
      </div>

      <Button
        size="sm"
        className="rounded-xl bg-neutral-700 px-5 text-white shadow-sm transition hover:bg-neutral-600 hover:shadow-md"
      >
        Send Money
      </Button>
    </div>
  );
};

export default UserRow;
