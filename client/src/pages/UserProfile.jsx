import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_LOGOUT } from "../constants/userConstant";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, firstname, lastname, token } = useSelector(
    (state) => state.userReducer
  );
  useEffect(() => {
    console.log(email, password, firstname, lastname, token);
    if (!email || !password || !firstname || !lastname || !token) {
      localStorage.clear();
      navigate("/register");
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch({ type: USER_LOGOUT });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-200">
      <div>FirstName: {firstname}</div>
      <div>LastName: {lastname}</div>
      <div>Email: {email}</div>
      <button
        type="button"
        className="px-2 py-2 text-white bg-blue-500 rounded-sm"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
