import {
  USER_CHANGE_EMAIL,
  USER_CHANGE_FIRSTNAME,
  USER_CHANGE_LASTNAME,
  USER_CHANGE_PASSWORD,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_TOGGLE_ISMEMBER,
} from "../constants/userConstant";

const initialState = {
  firstname: localStorage.getItem("firstname") || null,
  lastname: localStorage.getItem("lastname") || null,
  email: localStorage.getItem("email") || null,
  token: localStorage.getItem("token") || null,
  isMember: localStorage.getItem("isMember") || false,
  password: localStorage.getItem("password") || null,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, isLoading: true };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isMember: true,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        password: action.payload.password,
        token: action.payload.token,
      };

    case USER_SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        alertText: action.payload.alertText,
        alertType: action.payload.alertType,
        showAlert: true,
        isMember: false,
      };

    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        password: action.payload.password,
        token: action.payload.token,
        isLoading: false,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        alertText: action.payload.alertText,
        alertType: action.payload.alertType,
        showAlert: true,
      };

    case USER_CHANGE_EMAIL:
      return { ...state, email: action.payload };

    case USER_CHANGE_FIRSTNAME:
      return { ...state, firstname: action.payload };

    case USER_CHANGE_LASTNAME:
      return { ...state, lastname: action.payload };

    case USER_CHANGE_PASSWORD:
      return { ...state, password: action.payload };

    case USER_TOGGLE_ISMEMBER:
      return { ...state, isMember: !state.isMember };

    case USER_LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
