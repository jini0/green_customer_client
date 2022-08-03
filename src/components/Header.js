import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogout } from '../modules/logincheck';
import { getCookie, removeCookie } from '../util/cookie';

const Header = () => {
    //https://kihyeoksong.tistory.com/101 getCookie / setCookie
    const uname = getCookie('username');    //쿠키이름이 username인 애에 접근(쿠키에 있는 값은 uname에 담음)
    //스토어에 있는거는 다 useSelector로 접근함
    const isLogin = useSelector(state=>state.logincheck.isLogin);
    const dispatch = useDispatch();     
    const logoutClick = () => {
        removeCookie('username');
        removeCookie('usermail');
        dispatch(setLogout());
    }
    useEffect(()=>{},[isLogin])
    return (
        <div id="header">
            <h1>그린고객센터</h1>
            <ul>
                <li><Link to="/">고객리스트보기</Link></li>
                <li><Link to="/write">신규 고객 등록하기</Link></li>
                {/* 💕8.3 로그인 회원가입 추가하기 */}
                { isLogin &&            // &&앤드라서 --> isLogin이 false면 그 뒤에까지 가지 않음 / 그래서 &&를 쓰면 isLogin이 true면-> <></>프리그먼트안에꺼가 실행된다는 거!
                    <>
                        <li>{uname}님 환영!</li>
                        <li onClick={logoutClick}>로그아웃</li>
                        <li><Link to="/join">회원정보수정</Link></li>
                    </>
                }
                { isLogin ||            // || or이라서 --> isLogin이 false라도 뒤에가 실행됨(or이라서)
                    <>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/join">회원가입</Link></li>
                    </>
                }
                <li>고객 검색</li>
            </ul>
        </div>
    );
};

export default Header;