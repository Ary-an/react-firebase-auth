import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../redux/actions/authAction";

import { RootState } from "../../redux/index";
import Button from "../Ui/Button";

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  const logoutClickHandler = () => {
    dispatch(signOut);
  };

  return (
    <nav className="navbar is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={!authenticated ? "/" : "/dashboard"}
          >
            AppName
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-items">
            {!authenticated ? (
              <div className="buttons">
                <Button
                  text="Sign up"
                  onClick={() => history.push("/signup")}
                  className="is-primary"
                />
                <Button
                  text="Sign in"
                  className="is-primary"
                  onClick={() => history.push("/signin")}
                />
              </div>
            ) : (
              <Button
                className="is-primary"
                text="Sign out"
                onClick={logoutClickHandler}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
