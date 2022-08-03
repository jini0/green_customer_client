// 💕8.3 쿠키 만들어줄거임
// 쿠키설치 npm install react-cookie        or      yarn add react-cookie
import { Cookies } from "react-cookie";

const cookies = new Cookies();       //new Cookies()하면 쿠키 만들 수 있음

// - 밖에서도 사용할 수 있게 다 export해주기
//쿠키생성함수
export const setCookie = (name,value,options) => {
    return cookies.set(name, value, {...options});
}

//쿠키접근함수
export const getCookie = (name) => {
    return cookies.get(name);
}

//쿠키삭제함수
export const removeCookie = (name) => {
    return cookies.remove(name);
}