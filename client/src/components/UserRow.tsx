import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { transferMoney } from "@/api/payments/transferMoney"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type UserProps = {
  id: string;
  email: string;
  fullName: string;
};

const UserRow: React.FC<UserProps> = (data: UserProps) => {
  const [amount,setAmount] = useState<number>(0)

  const mutation = useMutation({
    mutationFn: (receverId:string)=>{
      return transferMoney(receverId,amount)
    }
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setAmount(parseInt(e.target.value))
  }

  const handleClick = (receverId:string) =>{
    mutation.mutate(receverId)
  }

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

  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="rounded-xl bg-neutral-700 px-5 text-white shadow-sm transition hover:bg-neutral-600 hover:shadow-md">Send Money</Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[420px]">
      <DialogHeader>
        <DialogTitle>Send Money</DialogTitle>
        <DialogDescription>
          Send money to <span className="font-medium">{data.fullName}</span>
        </DialogDescription>
      </DialogHeader>

      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            min={1}
            required
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="note">Note (optional)</Label>
          <Input
            id="note"
            name="note"
            placeholder="Add a message"
          />
        </div>

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={()=>handleClick(data.id)} type="submit">Send</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</div>
  );
};

export default UserRow;
