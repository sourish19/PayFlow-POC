import { useState } from 'react';

import { EyeOffIcon,EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FieldValues, UseFormReturn, Path } from 'react-hook-form';

export type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
};

type AuthFormProps<T extends FieldValues> = {
  fields: FieldConfig<T>[];
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
};

function AuthForm<T extends FieldValues>({
  fields,
  form,
  onSubmit,
}: AuthFormProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in fade-in-50 space-y-6"
      >
        {/* Form Fields */}
        <div className="space-y-5">
          {fields.map((f) => (
            <FormField
              key={f.name}
              control={form.control}
              name={f.name}
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-muted-foreground text-sm font-medium">
                    {f.label}
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={
                          f.type === 'password'
                            ? showPassword
                              ? 'text'
                              : 'password'
                            : f.type
                        }
                        placeholder={f.placeholder}
                        className="border-input bg-background/60 h-11 rounded-xl backdrop-blur-md transition-all focus-visible:ring-2"
                      />

                      {f.type === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 flex items-center transition"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 h-11 w-full rounded-xl text-base font-medium shadow-sm transition-all"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AuthForm;
