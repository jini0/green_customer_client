// 7.18
import { combineReducers } from "redux";
import customers from "./customers";
// 💕8.3
import logincheck from "./logincheck";
// 🧡8.5
import gallery from "./gallery";

const rootReducer = combineReducers({ customers, logincheck, gallery })      // 지금은 하나지만 합칠게 더 많아질 수 있으니...!!! / 8.3 logincheck 추가하기 / 8.5 gallery 추가하기
export default rootReducer;