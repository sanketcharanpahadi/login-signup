import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
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
  return <div>UserProfile</div>;
};

export default UserProfile;
