import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UpdateUser, User } from 'src/common/models';
import { setToken } from 'src/utils/token';
import appApi from '../shared/data-access/app.api';

const Settings = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const client = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (updateUser: UpdateUser) => appApi.updateUser(updateUser)
  });

  const { register, handleSubmit } = useForm<UpdateUser>({
    mode: 'onChange',
    values: user ? user : {}
  });

  const onSubmit: SubmitHandler<UpdateUser> = (formData) => {
    mutate(formData, {
      onSuccess: (data) => {
        client.setQueryData(['user'], data);
        navigate('/');
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('api_token');
    client.setQueryData(['user'], null);
    setToken(null);
    navigate('/');
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    {...register('image')}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    {...register('username', { required: true })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    {...register('bio')}
                  ></textarea>
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
                    {...register('password')}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" disabled={isLoading}>
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />

            <button className="btn btn-outline-danger" onClick={() => logout()}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
