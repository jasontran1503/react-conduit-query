import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { GenericErrorModel, NewUser } from 'src/common/models';
import appApi from '../shared/data-access/app.api';
import Auth from '../shared/ui/auth/Auth';
import ErrorsForm from '../shared/ui/errors-form/ErrorsForm';

const Register = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [errorsForm, setErrorsForm] = useState<Record<string, string[]>>({});

  const { mutate, isLoading } = useMutation({
    mutationFn: (newUser: NewUser) => appApi.register(newUser)
  });

  const { register, handleSubmit } = useForm<NewUser>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<NewUser> = (data) => {
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
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <Link to="/login">Have an account?</Link>
        </p>

        <ErrorsForm errors={errorsForm} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              {...register('username', { required: true })}
            />
          </fieldset>
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
            Sign up
          </button>
        </form>
      </>
    </Auth>
  );
};

export default Register;
