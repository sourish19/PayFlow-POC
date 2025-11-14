import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { loginSchema } from '@/validations/authValidation';

import type { LoginSchema } from '@/validations/authValidation';
import type { FieldConfig } from '@/components/auth/AuthForm';

const LoginPage = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const fields: FieldConfig<LoginSchema>[] = [
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

  // const onSubmit = () => {};

  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader className="gap-6">
          <div>
            <CardTitle className="mb-1.5 text-2xl">
              Sign in to PayFlow
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
              onSubmit={(values: LoginSchema) => console.log(values)}
            />

            <p className="text-muted-foreground text-center">
              New on our platform?{' '}
              <Link
                to={'/signup'}
                className="text-card-foreground hover:underline"
              >
                Create an account
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

export default LoginPage;
