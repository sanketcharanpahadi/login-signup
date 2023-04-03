import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    );
    if (!data) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          alertText: "Invalid email or password",
          alertType: "danger",
        },
      });
    } else {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          token: data.token,
        },
      });
      localStorage.setItem("firstname", data.firstname);
      localStorage.setItem("lastname", data.lastname);
      localStorage.setItem("password", data.password);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isMember", true);
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: {
        alertText: error.message,
        alertType: "danger",
      },
    });
  }
};

export const signup =
  (firstname, lastname, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users/register`,
        {
          firstname,
          lastname,
          email,
          password,
        },
        config
      );

      if (!data) {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: {
            alertText: "Please fill all the values",
            alertType: "danger",
          },
        });
      } else {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            password: data.password,
            token: data.token,
          },
        });
        localStorage.setItem("firstname", data.firstname);
        localStorage.setItem("lastname", data.lastname);
        localStorage.setItem("password", data.password);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isMember", true);
      }
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: {
          alertText: error.response.data.message,
          alertType: "danger",
        },
      });
    }
  };
