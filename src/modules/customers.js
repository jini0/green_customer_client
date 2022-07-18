// 7.18
import axios from "axios";
// 선생님은 heroku서버에 올리셔서 API_URL따로 만드셔서 import도 해주심 / 우리는 서버에 안올려서 그냥 local주소로 해주면 된다!
// import { API_URL } from '../config/apiurl';

// 리덕스 액션타입, 초기값, 액션생성함수, 리듀서
// ✔액션 타입지정
const GET_CUSTOMERS = "GET_CUSOMERS";
const GET_CUSTOMERS_ERROR = "GET_CUSOMERS_ERROR";
const GET_CUSTOMERS_SUCCESS = "GET_CUSOMERS_SUCCESS";
const SET_INPUT = "SET_INPUT";
const SET_RESET = "SET_RESET";

// ✔초깃값 설정
const initialState = {
    customers: {
        loading: false,
        data: null,
        error: null
    },
    addCustomer: {
        c_name: "",
        c_phone: "",
        c_birth: "",
        c_gender: "",
        c_add: "",
        c_adddetail: ""
    }
}

// ✔액션 생성 함수
export const setInput = (e) => {                   
    const { name, value } = e.target;           // 💜setInput이 호출되면 event(e)를 받아옴 -> target을 불러옴..?
    return {                                    // 💜주소가 바뀌면 target이 없음 -> 그래서 CreateCustomer2.js에서 target을 만들어줌
        type: SET_INPUT,
        name,
        value
    }
}

// 홈으로 이동 함수
// -CreateCustomer(신규고객등록) 때, 등록 후 홈으로 가게 하도록!!!
export const goToHome = (navigate) => ()=>{
    navigate('/')
}


// thunk함수를 사용해서 액션객체 디스패치 하기      --> 이렇게 해주려고 redux-thunk / redux-middleware 써주는 거임!
// dispatch를 thunk가 불러옴..
// 얘가 없으면 비동기 전송 자체를 못함
// 리듀서가 바로 호출되어서! --> 그래서 꼭 thunk 해줘야함!
export const getCustomers = () => async dispatch => {       // 리듀서를 바로 호출하는게 아니고 중간에 함수를 먼저 실행시킴!!!
    dispatch({ type: GET_CUSTOMERS })   //요청시작
    try {
        const response = await axios.get('http://localhost:3001/customers')             // 선생님은 API_URL넣으셔서 axios.get(`${API_URL}/customers`) 이렇게 넣어주심!
        const customers = response.data;
        dispatch({ type: GET_CUSTOMERS_SUCCESS, customers })       //customers:
    }
    catch(e){
        dispatch({ type: GET_CUSTOMERS_ERROR, error: e})
    }
}

export const setSubmit = () => async (dispatch, getState) => {
    const formdata = getState().customers.addCustomer;
    try {
        const response = await axios.post('http://localhost:3001/addCustomer', formdata)    // 선생님은 API_URL넣으셔서 axios.post(`${API_URL}/addCustomer`, formdata) 이렇게 넣어주심!
        dispatch({type: SET_RESET})
    }
    catch(e){
        dispatch({type: SET_RESET})
    }
}

// ✔리듀서 만들기
// useAsync로 해주던걸 리듀서 리덕스로 상태관리 해주겠다!!!
export default function customers(state = initialState, action){
    switch(action.type){
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: {
                    loading: true,
                    data: null,
                    error: null
                }
            }
        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: {
                    loading: false,
                    data: action.customers,
                    error: null
                }
            }
        case GET_CUSTOMERS_ERROR:
            return {
                ...state,
                customers: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
        case SET_INPUT:
            return {
                ...state,
                addCustomer: {
                    ...state.addCustomer,
                    [action.name]: action.value
                }
            }
        case SET_RESET:
            return {
                ...state,
                addCustomer: {
                    ...state.addCustomer,
                    c_name: "",
                    c_phone: "",
                    c_birth: "",
                    c_gender: "",
                    c_add: "",
                    c_adddetail: ""
                }
            }
        default:
            return state;
    }
}