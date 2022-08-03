// 💕8.3 로그인 컴포넌트
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/apiurl';
import { setCookie } from '../util/cookie';
import { useDispatch } from 'react-redux';
import { setLogin } from '../modules/logincheck';
import { goToHome } from '../modules/customers';

const Login = (props) => {
    const dispatch = useDispatch();     //dispatch 할거라서 만들어주고!
    const navigate = useNavigate();
    const [ loginData, setLoginData ] = useState({
        usermail:"",
        userpass:""
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();        //원래 있는 event 제거
        if(loginData.usermail === '' || loginData.userpass === ''){     //loginData.usermail과 loginData.userpass가 공백이면(빈값이면)
            alert('이메일과 비밀번호를 입력해주세요');
        }else {
            axios.post(`${API_URL}/login`, loginData)   //loginData도 같이 보낼거다!
            //로그인 되었을때,
            .then(result=>{
                let { usermail, username } = result.data;   //이렇게 구조분해할당으로 한번에 줄 수도 있음
                console.log(result);
                // let usermail = result.data.usermail;
                // let username = result.data.username;
                
                //usermail에 값이 있을 때
                if(usermail !== null && usermail !== '' && usermail !== undefined){
                    alert('로그인되었습니다.');
                    //expires 쿠키의 지속시간
                    //new =Date(): 현재시간 객체를 생성 -> Date객체!✨   / 시간에서 쓸 수 있는 객체들 setMinutes / getMinutes
                    let expires = new Date();
                    //60분 더한 값으로 변경(로그인 후 60분간 지속되게)
                    expires.setMinutes(expires.getMinutes()+60)
                    setCookie('usermail', `${usermail}`, {path: '/', expires});
                    setCookie('username', `${username}`, {path: '/', expires});
                    dispatch(setLogin());
                    dispatch(goToHome(navigate));       //보통 로그인하면 Home으로 가니까 home으로 가게!
                }
            })
            .catch(e=>{
                alert('이메일과 비밀번호를 확인해주세요');
            })
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <p><input type="text" name="usermail" value={loginData.usermail} onChange={onChange}/></p>
                <p><input type="password" name="userpass" value={loginData.userpass} onChange={onChange}/></p>
                <p>
                    <button type='submit'>로그인</button>
                    <Link to="/join"><button>회원가입</button></Link>
                </p>
            </form>
        </div>
    );
};

export default Login;