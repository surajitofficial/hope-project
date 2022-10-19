import baseService from "../../services/baseService";
const initState = {
  isLogin: localStorage.getItem("authToken") ? true : false,
  token: localStorage.getItem("authToken") || "",
  time: localStorage.getItem("time") || "",
  id: localStorage.getItem("id") || "",
  firstname: localStorage.getItem("firstname") || "",
  lastname: localStorage.getItem("lastname") || "",
  usertype: localStorage.getItem("usertype") || "",
  version: "2.0.7.4   06/01/2022",
  subversion: "8",
  liveFlag: 0,
  step: 0,
  fstep: 0,
  profileDatas: {},
  churchDatas: {},
  volunteerApplicationDatas: {},
  childDatas: {},
  profileValues: {},
  breadCrumb: false
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "USER_LOGOUT":
      localStorage.clear();
      baseService.removeAuthToken();
      return {
        ...state,
        isLogin: false,
        step: 0
      };
    case "USER_LOGIN":
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("time", action.payload.time);
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("firstname", action.payload.firstName);
      localStorage.setItem("lastname", action.payload.lastName);
      localStorage.setItem("usertype", action.payload.usertype);
      localStorage.setItem("firstname", action.payload.name);
      baseService.addAuthToken();
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
        time: action.payload.time,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        usertype: action.payload.usertype
      };
    case "USER_LOGIN_TEST":
      return {
        ...state,
        isLogin: true
      };
    case "USER_2WAY_AUTH":
      return {
        ...state,
        step: 1,
        ...action.payload
      };
    case "USER_OTP_SENT":
      return {
        ...state,
        step: 2,
        ...action.payload
      };
    case "PROFILE_DATAS":
      return {
        ...state,
        profileDatas: action.payload.volunteerProfile[0],
        //churchDatas: action.payload.church[0],
        volunteerApplicationDatas: action.payload.volunteerApplication,
        profileValues: Object.assign(
          action.payload.volunteerProfile[0],
          action.payload.volunteerApplication[0]
        ),
        childDatas: action.payload.child
      };
    case "SET_BREADCRUMB":
      return {
        ...state,
        breadCrumb: action.payload
      };
    case "USER_2WAY_AUTH_FORGOT":
      return {
        ...state,
        fstep: 1,
        ...action.payload
      };
    case "FORGOT_OTP_SENT":
      return {
        ...state,
        fstep: 2,
        ...action.payload
      };
    case "RESET_PASSWORD":
      return {
        ...state,
        fstep: 3,
        ...action.payload
      };
    case "RESET_PASSWORD_DONE":
      return {
        ...state,
        fstep: 0
      };

    default:
      return state;
  }
}
