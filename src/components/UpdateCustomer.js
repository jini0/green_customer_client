// 수정하기 - 내가 만든거..
// react - input radio 타입 https://onu0624.tistory.com/126  : radio value값 불러오기!
import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCustomer = () => {
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
    },[])
    // 라디오 버튼 작동하도록 - 핸들러 만들어주기
    // https://onu0624.tistory.com/126
    const [ gender, setGender ] = useState("");
    const handleClickRadioButton = (e) => {
        console.log(e.target.value);
        setGender(e.target.value);
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
            c_name:form.c_name.value,
            c_phone:form.c_phone.value,
            c_birthday:form.c_birthday.value,
            c_gender:form.c_gender.value,
            c_add1:form.c_add1.value,
            c_add2:form.c_add2.value,
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
                            <TableCell><input name="c_birth" type="text" defaultValue={customer[0].birth}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                {/* input의 타입이 radio면 그냥하면 값을 못 불러와서 checked 속성 해주고! */}
                                여성<input name="c_gender" type="radio" value="여성" checked={customer[0].gender === '여성'? true : false} onChange={handleClickRadioButton} />
                                남성<input name="c_gender" type="radio" value="남성" checked={customer[0].gender === '남성'? true : false} onChange={handleClickRadioButton}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell><input name="c_add" defaultValue={customer[0].add1}/> <input name="c_adddetail" defaultValue={customer[0].add2}/></TableCell>
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