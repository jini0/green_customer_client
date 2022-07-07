import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material';
import Customer from './Customer';
import axios from 'axios';

// --axios--
// https://github.com/axios/axios : axios 라이브러리 - view git-hub - Read.me의 설명글 보기! (메모장참고-7.7)
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// 1. App.js에서 넣어주던 값
// const CustomerList = ({customers}) => {
const CustomerList = () => {
    // 2. mysql 데이터베이스 안의 table 값들로 불러오기 (me) - useState()와 useEffect()써서 한거💙
    //props로 넣어주던 값(App.js에서 customers 배열(안의 객체값들))을 빼주고!!!
    //axios로 mysql 데이터베이스 값들 불러오기!
    const [ customers, setCustomers ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/customers")
        .then( result =>{
            const customers = result.data;
            setCustomers(customers);
            console.log(customers);
            console.log(result);
        })
        .catch((e) =>{
            console.log(e);
        })
    },[])
    if(customers===[]) return <div>로딩중입니다....</div>

    return (
        <div>
            <h2>고객리스트</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* TableRow : tr과 같다고 생각!  ==> 그냥 table 태그 써도 되는데 한번 써보는 거임
                            TableCell : td와 같다 생각!  */}
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map(customer=>(
                        <Customer key={customer.no} customer={customer} />
                    ))}
                </TableBody>
                {/* 이렇게 밑에처럼 각각 넣어주던걸 Customer.js를 만들어서 그걸 위에 처럼 뿌려줌! */}
                {/* <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>그린</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                    </TableRow>
                </TableBody> */}
            </Table>
        </div>
    );
};

export default CustomerList;