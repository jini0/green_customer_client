// 💕8.3 회원가입 추가하기! 
import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config/apiurl';      //선생님은 api_url 따로 만드셔서..
import { useNavigate } from 'react-router-dom';

const JoinForm = (props) => {
    const navigate = useNavigate();         //경로 변경해주는 navigate 객체를
    const [formData, setFormData] = useState({
        //value에 넣어주기 위해 formData의 상태관리를 통해! 값넣어줄거임
        username: "",
        userpass: "",
        userpassck: "",
        userphone: "",
        usermail: "",
        userorg: ""
    })
    // *onChange이벤트
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    // *폼 submit이벤트  --> CreateCustomer2.js에서 가져오기
    const onSubmitch = (e) => {
        //form에 원래 연결된 이벤트를 제거 --> 다른 페이지로 넘어가지않음!!(이게 없으면 클릭시 새로운 페이지로 넘어가짐!)
        e.preventDefault();                     

        //전화번호가 숫자인지 체크
        // isNaN : NaN인지..?
        if(isNaN(formData.userphone)){
            alert("전화번호는 숫자만 입력해주세요");
        }
        //input에 값이 있는지 체크하고
        //입력이 다 되어있으면 post전송   -- insert customer 해주면 됨!!!
        if(formData.username !== "" && formData.userpass !== "" && formData.userpassck !== "" &&
        formData.userphone !== "" && formData.userorg !== "" &&
        formData.usermail !== ""){
            addMember();
        }
    }
    // *addMember()함수 만들기
    function addMember(){
        // axios.post(`http://localhost:3001/join`, formData)  //직접 적어줬음
        axios.post(`${API_URL}/join`, formData)          //선생님은 api_url 따로 만드셔서!! 난 따로 안 빼서..
        .then(res=>{
            alert('등록되었습니다.');
            //응답이오면 그냥 홈(home)(/)으로 보낼거임
            navigate('/');      
        })
        .catch(e=>{
            console.log(e)
        })
    }
    return (
        <div>
            {/* CreateCustomer2.js에 있는거 긁어와서 변경해주기 / name값이 key이름이니까 server에서 mysql에 담을 때, 적어둔 값으로 바꿔줌 */}
            <form onSubmit={onSubmitch}>
                {/* onSubmit이벤트를 넣어주고 실행할 함수 넣어주면 됨! */}
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="username" type="text" 
                                value={formData.username}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>비밀번호</TableCell>
                            <TableCell>
                                <input name="userpass" type="text" 
                                value={formData.userpass}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>비밀번호체크</TableCell>
                            <TableCell>
                                <input name="userpassck" type="text" 
                                value={formData.userpassck}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="userphone" type="text" 
                                value={formData.userphone}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이메일</TableCell>
                            <TableCell>
                                <input name="usermail" type="text" 
                                value={formData.usermail}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>소속</TableCell>
                            <TableCell>
                                <input name="userorg" type="text" 
                                value={formData.userorg}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default JoinForm;