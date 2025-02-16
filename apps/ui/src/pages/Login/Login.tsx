import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../shared/ui/Button/Button';
import { Form } from '../../shared/ui/Form/Form';
import { Input } from '../../shared/ui/Input/Input';
import { Label } from '../../shared/ui/Label/Label';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Handle login logic here
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <Label>
                <Input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  rounded="top"
                  placeholder="Email address"
                  {...register('email')}
                />
              </Label>
              {errors.email && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div>
              <Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  rounded="bottom"
                  placeholder="Password"
                  {...register('password')}
                />
              </Label>
              {errors.password && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div>
            <Button color="primary" className="w-full">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
