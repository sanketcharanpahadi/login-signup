import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  // const dispatch = useDispatch();
  const { alertType, alertText } = useSelector((state) => state.userReducer);
  return (
    <div
      className={`${
        alertType === "danger" ? "bg-red-400" : "bg-green-400"
      } text-white font-semibold text-center rounded py-2 mb-4`}
    >
      {alertText}
    </div>
  );
};

export default Alert;
