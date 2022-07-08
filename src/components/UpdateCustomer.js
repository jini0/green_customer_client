// 수정하기 - 내가 만든거..
// react - input radio 타입 https://onu0624.tistory.com/126  : radio value값 불러오기!
import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import PopupDom from "./PopupDom";
// import PopupPostCode from "./PopupPostCode";

const UpdateCustomer = () => {
    // const [ formData, setFormData ] = useState({
    //     // 이런 인풋이 다 있겠다!
    //     c_name: "",
    //     c_phone: "",
    //     c_birth: "",
    //     c_gender: "",
    //     c_add: "",
    //     c_adddetail: ""
    // })
    // //우편번호 관리하기
    // const onAddData = (data) => {
    //     console.log(data);
    //     setFormData({
    //         ...formData,
    //         c_add: data.address
    //     })
    // }
    // //팝업창 상태 관리
    // const [ isPopupOpen, setIsPopupOpen ] = useState(false);             //isPopupOpen은 지금 false가 들어가있음(초기값)
    // //팝업창 상태 true로 변경
    // const openPostCode = () =>{
    //     setIsPopupOpen(true);               //이 함수를 호출을 해주면 true로 변경해줄거임! (isPopupOpen은 setIsPopupOpen으로만 값 변경 가능)
    // }
    // //팝업창 상태 false로 변경(팝업창 닫음)
    // const closePostCode = () =>{
    //     setIsPopupOpen(false);
    // }

    const navigate = useNavigate();
    const [ customer, setCustomer ] = useState(null);
    const { no } = useParams();   // no 값 받아오기
    // 각 항목내용 불러오기!!
    useEffect(function(){
        axios.get(`http://localhost:3001/customer/${no}`)
        .then(result => {
            console.log(result);           
            const data = result.data;
            setCustomer(data);
        })
        .catch((e)=>{
            console.log(e);
        })
    // eslint-disable-next-line
    },[])
    // 라디오 버튼 작동하도록 - 핸들러 만들어주기
    // https://onu0624.tistory.com/126
    const [ gender, setGender ] = useState("");
    const handleClickRadioButton = (e) => {
        console.log(e.target.value);
        setGender(e.target.value);
        console.log(gender);
    }

    // 폼 submit이벤트
    const onSubmit = (e)=>{
        e.preventDefault();
        insertCustomer(e.target);           //밑의 함수 호출!!!!
        //이전화면으로 이동(php의 리다이렉션)
        navigate(-1);
    }
    // axios put전송
    function insertCustomer(form) {
        axios.put(`http://localhost:3001/updateCustomer/${no}`,{
            c_name: form.c_name.value,
            c_phone: form.c_phone.value,
            c_birth: form.c_birth.value,
            c_gender: form.c_gender.value,
            c_add: form.c_add.value,
            c_adddetail: form.c_adddetail.value,
        })
        .then((result)=>{
            console.log(result);
        })
        .catch(function(err){
            console.log(err);
        })
    }

    if(!customer) return <div>로딩중입니다.....</div>
    return (
        <div>
            <h2>고객 정보 수정</h2>
            <form onSubmit={onSubmit}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>고객명</TableCell>
                            {/* ✔input에 value를 주면 수정이 안됨 --> defaultValue로 초기값을 넣어주면 수정됨! */}
                            <TableCell><input name="c_name" defaultValue={customer[0].name}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell><input name="c_phone" defaultValue={customer[0].phone}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell><input name="c_birth" type="date" defaultValue={customer[0].birth}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                {/* input의 타입이 radio면 그냥하면 값을 못 불러와서 checked 속성 해주고! */}
                                여성<input name="c_gender" type="radio" value="여성" defaultChecked={customer[0].gender} onChange={handleClickRadioButton}/>
                                남성<input name="c_gender" type="radio" value="남성" defaultChecked={customer[0].gender} onChange={handleClickRadioButton}/>
                                {/* 여성<input name="c_gender" type="radio" value="여성" checked={gender === '여성'? true : false} onChange={handleClickRadioButton}/>
                                남성<input name="c_gender" type="radio" value="남성" checked={gender === '남성'? true : false} onChange={handleClickRadioButton}/> */}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell><input name="c_add" defaultValue={customer[0].add1}/> <input name="c_adddetail" defaultValue={customer[0].add2}/></TableCell>
                            {/* <button type="button" onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode onClose={closePostCode}
                                            onAddData={onAddData}
                                            />
                                        </PopupDom>
                                    )}
                                </div> */}
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit">수정</button>
                                <button type="reset">취소</button>
                                {/* <button>고객리스트</button> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default UpdateCustomer;