import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
//내가한거
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = (props) => {
    //내가 추가한거
    const navigate = useNavigate();

    //우편번호 관리하기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_add: data.address
        })
    }
    //팝업창 상태 관리
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);             //isPopupOpen은 지금 false가 들어가있음(초기값)
    //팝업창 상태 true로 변경
    const openPostCode = () =>{
        setIsPopupOpen(true);               //이 함수를 호출을 해주면 true로 변경해줄거임! (isPopupOpen은 setIsPopupOpen으로만 값 변경 가능)
    }
    //팝업창 상태 false로 변경(팝업창 닫음)
    const closePostCode = () =>{
        setIsPopupOpen(false);
    }
    const [ formData, setFormData ] = useState({
        // 이런 인풋이 다 있겠다!
        c_name: "",
        c_phone: "",
        c_birth: "",
        c_gender: "",
        c_add: "",
        c_adddetail: ""
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // 💙폼 submit이벤트  -  내가 한거(선생님이 알려주심)
    const onSubmit = (e) => {
        //form에 원래 연결된 이벤트를 제거 --> 다른 페이지로 넘어가지않음!!(이게 없으면 클릭시 새로운 페이지로 넘어가짐!)
        e.preventDefault();                     // 이렇게 해야 콘솔창에 값들이 잘 입력됨      
        console.log(formData);
        //input에 값이 있는지 체크하고
        //입력이 다 되어있으면 post전송   -- insert customer 해주면 됨!!!
        insertCustomer();
    }
    // 💙axios post 전송  -- 서버로 데이터 전송하기
    function insertCustomer(){
        //get 대신 post로 전송해줘야함
        //post는 값도 가져가야함   ---> formData가 가지고 있음!!!!!
        // 데이터베이스에 조회 -get
        // 데이터베이스에 입력(값을 들고가야함) -post
        // axios.post("경로",formData)
        // .then()
        // .catch()
        axios.post("http://localhost:3001/customers",formData)
        .then(result => {
            console.log(result);
            navigate("/")               
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return (
        <div>
            <h2>신규 고객 등록하기</h2>
            <form onSubmit={onSubmit}>
                {/* onSubmit이벤트를 넣어주고 실행할 함수 넣어주면 됨! */}
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="c_name" type="text" 
                                value={formData.c_name}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" 
                                value={formData.c_phone}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birth" type="date" 
                                value={formData.c_birth}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성<input name="c_gender" type="radio" 
                                value="여성"
                                onChange={onChange} />
                                남성<input name="c_gender" type="radio" 
                                value="남성"
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name="c_add" type="text" 
                                value={formData.c_add}
                                onChange={onChange} />
                                <input name="c_adddetail" type="text" 
                                value={formData.c_adddetail}
                                onChange={onChange} />
                                {/* 우편번호 검색을 클릭하면 isPopupOpen이 true가 됨 */}
                                <button type="button" onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                    {/* 중괄호 안에 넣음(자바스크립트 이용)->  &&(논리연산자 이용) : isPopupOpen이 true가 되면 저 뒤에꺼들도 나타남!! */}
                                    {isPopupOpen && (
                                        <PopupDom>
                                            {/* PopupDom 안에 PopupPostCode가 children으로 들어가있음 */}
                                            {/* closePostCode, onAddData : props로 전달하겠다! */}
                                            <PopupPostCode onClose={closePostCode}
                                            onAddData={onAddData}
                                            />
                                        </PopupDom>
                                    )}

                                </div>
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

export default CreateCustomer;