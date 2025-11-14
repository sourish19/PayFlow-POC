import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

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

import type { SignupSchema } from '@/validations/authValidation';
import type { FieldConfig } from '@/components/auth/AuthForm';

const SignupPage = () => {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const fields: FieldConfig<SignupSchema>[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
    },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'jhondoe@example.com',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '********',
    },
  ];

  const onSubmit = (data: SignupSchema) => {};

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
              onSubmit={(values: SignupSchema) => console.log(values)}
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
