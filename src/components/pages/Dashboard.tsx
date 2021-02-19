import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../redux/actions/authAction";
import Message from "../Ui/Message";
import { RootState } from "../../redux/index";
import { User } from "../../redux/types";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );

  const [currentUser, setCurrentUser] = useState<User>();

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
        <h1 className="is-size-1">Welcome {currentUser?.firstName} </h1>
      </div>
    </section>
  );
};

export default Dashboard;
