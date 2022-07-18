// 7.18
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInput, setSubmit, goToHome } from '../modules/customers';
import CreateCustomer2 from './CreateCustomer2';
import { useNavigate } from 'react-router-dom';

const CreateCustomerContainer = (props) => {
    const addCustomer = useSelector(state=> state.customers.addCustomer)
    const dispatch = useDispatch();
    // 홈으로 가게
    const navigate = useNavigate();
    const onHome = () => {                  // props로 다 전달해주기! -> onHome/onChange/onSubmit -->
        dispatch(goToHome(navigate))
    }
    const onChange = (e) => {               // 💜onChange를 해주면 e를 해줌
                    // event 객체 받아올거임 // 💜event는 target이라는 속성을 가지고 있음 --> + customers.js보기!
        dispatch(setInput(e))               // 💜setInput을 해주면 customers.js에서 { name, value } 가 target으로 가짐..!
    }
    const onSubmit = () => {
        dispatch(setSubmit())
    }
    return (
        <CreateCustomer2 onHome={onHome} onChange={onChange} onSubmit={onSubmit} addCustomer={addCustomer} />
        // 지금은 스토어로 관리해서 이런것들을 그냥 props로 전달함!
    );
};

export default CreateCustomerContainer;