import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material';
import Customer from './Customer';

const CustomerUi = ({customers}) => {
    return (
        //CustomerList.js의 내용들 가져오기!!!!
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
                    {/* 선생님은 customers 대신에 data로 적혀있었음(CustomerList.js에서) 이걸 customers로 바꾸라고 했는데, 나는 mysql에서 서버로 고객 정보 불러올때 
                    useState와 useEffect 써서..customers였나봄!*/}
                    {customers.map(customer=>(
                        <Customer key={customer.no} customer={customer} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerUi;