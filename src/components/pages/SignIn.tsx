import { FC, useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, Login } from "../../redux/actions/authAction";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import Message from "../Ui/Message";
import { RootState } from "../../redux/index";
import { Link } from "react-router-dom";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { error } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(Login({ email, password }, () => setIsLoading(false)));
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-center is-size-2 mb-3">Sign up</h2>
        <form className="form" onSubmit={handleSubmit}>
          {error && <Message type="danger" msg={error} />}

          <Input
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            label="First name"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <Input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            label="First name"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <p>
            <Link to="/forgot-password">Forget password</Link>
          </p>

          <Button
            text={isLoading ? "Loading..." : "Sign ip"}
            className="is-primary is-fullwidth mt-5"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default SignIn;
