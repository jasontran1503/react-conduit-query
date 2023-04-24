import { NavLink } from 'react-router-dom';
import { User } from 'src/common/models';
import { useGetQueryData } from 'src/hooks';

const Header = () => {
  const user = useGetQueryData<User>(['user']);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/profile/${user.username}`}>
                  {user.username}
                </NavLink>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;