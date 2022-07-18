// 7.18
import { combineReducers } from "redux";
import customers from "./customers";

const rootReducer = combineReducers({ customers })      // 지금은 하나지만 합칠게 더 많아질 수 있으니...!!!
export default rootReducer;