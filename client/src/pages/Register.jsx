import FormField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../actions/userAction";
import {
  USER_CHANGE_EMAIL,
  USER_CHANGE_FIRSTNAME,
  USER_CHANGE_LASTNAME,
  USER_CHANGE_PASSWORD,
  USER_TOGGLE_ISMEMBER,
} from "../constants/userConstant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, isMember, firstname, lastname, token } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (token && email && password && firstname && lastname) {
      navigate("/user/profile");
    } else {
      localStorage.clear();
    }
  }, [token, email, password, firstname, lastname]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isMember) {
      dispatch(login(email, password));
    } else {
      dispatch(signup(firstname, lastname, email, password));
    }
  };

  const toggleMemberHandler = () => {
    dispatch({ type: USER_TOGGLE_ISMEMBER });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-200">
      <Alert />
      <form
        className="flex flex-col gap-4 px-6 py-8 bg-white rounded w-80"
        onSubmit={submitHandler}
      >
        <FormField
          name="email"
          type="email"
          label="Email"
          value={email || ""}
          onChangeHandler={(e) =>
            dispatch({ type: USER_CHANGE_EMAIL, payload: e.target.value })
          }
        />
        {!isMember && (
          <FormField
            name="firstname"
            type="text"
            label="First Name"
            value={firstname || ""}
            onChangeHandler={(e) =>
              dispatch({ type: USER_CHANGE_FIRSTNAME, payload: e.target.value })
            }
          />
        )}
        {!isMember && (
          <FormField
            name="lastname"
            type="text"
            label="Last Name"
            value={lastname || ""}
            onChangeHandler={(e) =>
              dispatch({ type: USER_CHANGE_LASTNAME, payload: e.target.value })
            }
          />
        )}
        <FormField
          name="password"
          type="password"
          label="Password"
          value={password || ""}
          onChangeHandler={(e) =>
            dispatch({ type: USER_CHANGE_PASSWORD, payload: e.target.value })
          }
        />
        <button
          type="submit"
          className="py-2 text-white bg-blue-500 rounded-sm"
        >
          {isMember ? "Login" : "Create Account"}
        </button>
        <div className="text-center">
          {isMember ? "Not a member? " : "Already a member? "}
          <button
            type="button"
            className="text-cyan-600"
            onClick={toggleMemberHandler}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
