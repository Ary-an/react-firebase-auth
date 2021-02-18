import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../redux/actions/authAction";
import Message from "../Ui/Message";
import { RootState } from "../../redux/index";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector<
    RootState,
    RootState["auth"]
  >((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="section">
      <div className="container">
        {needVerification && (
          <Message type="success" msg="Please verify your email address" />
        )}
        <h1 className="is-size-1">Welcome</h1>
      </div>
    </section>
  );
};

export default Dashboard;
