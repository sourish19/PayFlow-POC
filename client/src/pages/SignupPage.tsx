import { Link } from 'react-router-dom';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import AuthForm from '@/components/auth/AuthForm';
import { signupSchema } from '@/validations/authValidation';

import type { FieldConfig } from '@/components/auth/AuthForm';

export type SignupFormProps = {
  type: 'signup';
  form: UseFormReturn<z.infer<typeof signupSchema>>;
  onSubmit: (values: z.infer<typeof signupSchema>) => void;
};

const SignupPage = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const fields: FieldConfig<z.infer<typeof signupSchema>>[] = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  //   const onSubmit = (data: z.infer<typeof signupSchema>) => {};

  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader className="gap-6">
          <div>
            <CardTitle className="mb-1.5 text-2xl">
              Sign up to PayFlow
            </CardTitle>
            <CardDescription className="text-base">
              POC for end-to-end Payment
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Login Form */}
          <div className="space-y-4">
            <AuthForm
              fields={fields}
              form={form}
              onSubmit={(values: z.infer<typeof signupSchema>) =>
                console.log(values)
              }
            />

            <p className="text-muted-foreground text-center">
              Already have an account?{' '}
              <Link
                to={'/login'}
                className="text-card-foreground hover:underline"
              >
                Sign in
              </Link>
            </p>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <p>or</p>
              <Separator className="flex-1" />
            </div>

            <Button variant="ghost" className="w-full" asChild>
              <a href="#">Sign in with google</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
