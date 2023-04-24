import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { GenericErrorModel, LoginUser } from 'src/common/models';
import Auth from '../shared/ui/auth/Auth';
import ErrorsForm from '../shared/ui/errors-form/ErrorsForm';
import appApi from '../shared/data-access/app.api';

const Login = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [errorsForm, setErrorsForm] = useState<Record<string, string[]>>({});

  const { mutate, isLoading } = useMutation({
    mutationFn: (loginUser: LoginUser) => appApi.login(loginUser)
  });

  const { register, handleSubmit } = useForm<LoginUser>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    setErrorsForm({});
    mutate(data, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['user'] });
        navigate('/');
      },
      onError: (error) => setErrorsForm((error as GenericErrorModel).errors)
    });
  };

  return (
    <Auth>
      <>
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <Link to="/register">Need an account?</Link>
        </p>

        <ErrorsForm errors={errorsForm} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
          </fieldset>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={isLoading}
          >
            Sign in
          </button>
        </form>
      </>
    </Auth>
  );
};

export default Login;
