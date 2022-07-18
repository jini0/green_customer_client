// 7.18 💜CreateCustomer.js에서 가져와서 수정하기!
// 💜formData는 이제 안쓰니까 다 바꿔주기!
import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
// 💜props로 받을거라 다 날리기
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const CreateCustomer2 = ({ onChange, onSubmit, addCustomer, onHome }) => {
    //우편번호 관리하기
    const onAddData = (data) => {
        console.log(data);
        const postAdd = data.address;
        onChange({
            target: {                   // 💜주소가 바뀌면 target이 없음(주소 add를 바꿔줘야함) -> 그래서 CreateCustomer2.js에서 target을 만들어줌(cf. modules폴더의 customers.js 참고)
                name: 'c_add',          // e event객체가 없어서 event객체처럼 target을 만들어준거임💜
                value: postAdd
            }
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
    // 7.18 useState로 관리안할거라 지워주기! / onChange도 지워주고 다른것들도 필요없는거 지우고 변경해주기!
    // useState가 관리하던걸 store가 이제 관리함 
    // --> onChange이벤트가 발생하지 않아서 -> target을 전달해줘야함 --> target을 만들어준거임💜


    // 💙폼 submit이벤트  
    const onSubmitch = (e) => {
        //form에 원래 연결된 이벤트를 제거 --> 다른 페이지로 넘어가지않음!!(이게 없으면 클릭시 새로운 페이지로 넘어가짐!)
        e.preventDefault();                     

        //전화번호가 숫자인지 체크
        // isNaN : NaN인지..?
        if(isNaN(addCustomer.c_phone)){
            alert("전화번호는 숫자만 입력해주세요");
        }
        //input에 값이 있는지 체크하고
        //입력이 다 되어있으면 post전송   -- insert customer 해주면 됨!!!
        if(addCustomer.c_name !== "" && addCustomer.c_phone !== "" &&
        addCustomer.c_birth !== "" && addCustomer.c_gender !== "" &&
        addCustomer.c_add !== "" && addCustomer.c_adddetail !==""){
            onSubmit();
            //onSubmit 할 때, onHome(홈으로 돌려보내기)  
            onHome();
        }
    }

    return (
        <div>
            <h2>신규 고객 등록하기</h2>
            <form onSubmit={onSubmitch}>
                {/* onSubmit이벤트를 넣어주고 실행할 함수 넣어주면 됨! */}
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="c_name" type="text" 
                                value={addCustomer.c_name}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" 
                                value={addCustomer.c_phone}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birth" type="date" 
                                value={addCustomer.c_birth}
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
                                value={addCustomer.c_add}
                                onChange={onChange} />
                                <input name="c_adddetail" type="text" 
                                value={addCustomer.c_adddetail}
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

export default CreateCustomer2;