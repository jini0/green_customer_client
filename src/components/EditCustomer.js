// 선생님이랑 - 수정하기
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import useAsync from '../hooks/useAsync';

const EditCustomer = (props) => {
    const { no } = useParams();
    const [ formData, setFormData ] = useState({
        c_name: "",
        c_phone: "",
        c_birth: "",
        c_gender: "",
        c_add: "",
        c_adddetail: ""
    })
    // 2. useAsync 이용 -- 선생님
    // async function getCustomer(){
    //     const response = await axios.get(`http://localhost:3001/customer/${no}`)
    //     return response.data;
    // }
    // const state = useAsync(getCustomer);
    // const { loading, error, data: customer} = state;

    // 1. get전송으로 내가 받은거!!!
    const [ customer, setCustomer ] = useState(null);
    // console.log(no);      
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

    //useEffect는 마운트 됐을 때 한번 호출됨!
    //[customer]라는 걸 넣어주면 얘가 변경되면 --> 
    useEffect(()=>{
        setFormData({
                                //나는 배열로 받아서 [0]이라는 index를 해줘야함!!  (rows로 해서 -> 선생님: rows[0]으로 주셨음!!!!)
            c_name: customer? customer[0].name: "",           //c_name에 customer가 있으면 customer의 이름을 넣어주고 없으면 "빈문자열"
            c_phone: customer? customer[0].phone: "",          
            c_birth: customer? customer[0].birth: "",           
            c_gender: customer? customer[0].gender: "",           
            c_add: customer? customer[0].add1: "",           
            c_adddetail: customer? customer[0].add2: "",        

            // 선생님 - 값을 rows[0] 배열의 값으로 받아서 이렇게 적어줘도 값이 뜸!!!!
            // c_name: customer? customer.name: "",          
            // c_phone: customer? customer.phone: "",          
            // c_birth: customer? customer.birth: "",           
            // c_gender: customer? customer.gender: "",           
            // c_add: customer? customer.add1: "",           
            // c_adddetail: customer? customer.add2: "",           

        })
    },[customer])

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
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // 💙폼 submit이벤트  
    const onSubmit = (e) => {
        //form에 원래 연결된 이벤트를 제거 --> 다른 페이지로 넘어가지않음!!(이게 없으면 클릭시 새로운 페이지로 넘어가짐!)
        e.preventDefault();                     // 이렇게 해야 콘솔창에 값들이 잘 입력됨      
        console.log(formData);

        //전화번호가 숫자인지 체크
        // isNaN : NaN인지..?
        if(isNaN(formData.c_phone)){
            alert("전화번호는 숫자만 입력해주세요");
            setFormData({
                ...formData,
                c_phone:""
            })
        }
        //input에 값이 있는지 체크하고
        //입력이 다 되어있으면 post전송   -- insert customer 해주면 됨!!!
        if(formData.c_name !== "" && formData.c_phone !== "" &&
        formData.c_birth !== "" && formData.c_gender !== "" &&
        formData.c_add !== "" && formData.c_adddetail !==""){
            updateCustomer();
        }
    }
    // 💙axios put 전송 
    function updateCustomer(){
        axios.put(`http://localhost:3001/editCustomer/${no}`,formData)
        .then(res=>{
            console.log(res);
            navigate('/');              //php의 Location이라고 생각!
        })
        .catch(e=>{
            console.log(e);
        })
    }
    // 2. useAsync 이용  -  선생님
    // // 함수는 return문이 나오면 끝임!
    // if(loading) return <div>로딩중.....</div>
    // if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    // if(!customer) return null;

    // 1. get 전송으로 받은거 
    if(!customer) return <div>로딩중입니다.....</div>
    return (
        <div>
            <h2>고객 정보 수정하기</h2>
            <form onSubmit={onSubmit}>
                {/* onSubmit이벤트를 넣어주고 실행할 함수 넣어주면 됨! */}
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="c_name" type="text" 
                                defaultValue={formData.c_name}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" 
                                defaultValue={formData.c_phone}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birth" type="date" 
                                defaultValue={formData.c_birth}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성<input name="c_gender" type="radio" 
                                value="여성"
                                onChange={onChange} 
                                checked={formData.c_gender === "여성" ? true : false}
                                />
                                남성<input name="c_gender" type="radio" 
                                value="남성"
                                onChange={onChange} 
                                checked={formData.c_gender === "남성" ? true : false}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name="c_add" type="text" 
                                defaultValue={formData.c_add}
                                onChange={onChange} />
                                <input name="c_adddetail" type="text" 
                                defaultValue={formData.c_adddetail}
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

export default EditCustomer;