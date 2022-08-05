// 🧡8.5 이미지 게시판 만들기 - '이미지 보기' 하려고
// 액션타입, 액션 생성 함수, 초기값, 리듀서

import { API_URL } from "../config/apiurl";
import axios from 'axios';

//액션타입
const GET_GALLERY = "GET_GALLERY";
const GET_GALLERY_SUCCESS = "GET_GALLERY_SUCCESS";
const GET_GALLERY_ERROR = "GET_GALLERY_ERROR";

//초기값
const initialState = {
    data: null,
    loading: false,
    error: null
}

//액션 생성함수
//thunk 함수 사용
export const getGallery = () => async dispatch => {
    dispatch({ type: GET_GALLERY }) //요청시작
    try{
        const response = await axios.get(`${API_URL}/gallery`)
        const gallerydata = response.data;
        dispatch({ type: GET_GALLERY_SUCCESS, payload: gallerydata})
    }
    catch(e) {
        dispatch({ type: GET_GALLERY_ERROR, payload: e})
    }
}
//리듀서
export default function gallery(state=initialState, action){
    switch(action.type){
        case GET_GALLERY:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_GALLERY_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case GET_GALLERY_ERROR:
            return {
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state;
    }
}

// 다 하고 rootReducer에 넣어주면 됨 --> 같은 modules 폴더의 index.js의 rootReducer에서!!!!