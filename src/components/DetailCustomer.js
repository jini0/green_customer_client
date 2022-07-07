import React, { useState, useEffect } from 'react';             // me - useState, useEffect 추가
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
// me - 추가
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const DetailCustomer = (props) => {
    const [ customer, setCustomer ] = useState(null);
    const { no } = useParams();   // no 값 받아오기
    // console.log(no);      
    useEffect(function(){
        axios.get(`http://localhost:3001/customer/${no}`)
        .then(result => {
            console.log(result);            // 콘솔창을 보면! {data: Array(1), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
                                            // data: Array(1)               ---> 배열에 담겨있음!!!
                                            // 0: {no: 2, name: '홍지아', phone: '010-1234-1234', birth: '1992-02-28', gender: '여성', …}   ---> 배열의 0번째에 data값들이 담겨있음!!!
                                            // length: 1
            const data = result.data;
            setCustomer(data);
        })
        .catch((e)=>{
            console.log(e);
        })
    },[])
    if(!customer) return <div>로딩중입니다.....</div>

    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        {/* <TableCell>김그린</TableCell> */}
                        <TableCell>{customer[0].name}</TableCell>
                        {/* 배열의 0번째의 값들이 담겨있어서! 배열도 적어줘야함!!! */}
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        {/* <TableCell>010-1234-1234</TableCell> */}
                        <TableCell>{customer[0].phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        {/* <TableCell>1992-02-06</TableCell> */}
                        <TableCell>{customer[0].birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        {/* <TableCell>여성</TableCell> */}
                        <TableCell>{customer[0].gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        {/* <TableCell>울산시 남구</TableCell> */}
                        <TableCell colSpan={2}>{customer[0].add1} {customer[0].add2}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;