import { FC, useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  passwordReset,
  setSuccess,
} from "../../redux/actions/authAction";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import Message from "../Ui/Message";
import { RootState } from "../../redux/index";

const ForgetPassword: FC = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { error, success } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [error, dispatch, success]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await dispatch(passwordReset(email, "Email sent!"));
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-center is-size-2 mb-3">Sign up</h2>
        <form className="form" onSubmit={handleSubmit}>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}

          <Input
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            label="First name"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <Button
            text={isLoading ? "Loading..." : "Send password reset email"}
            className="is-primary is-fullwidth mt-5"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
