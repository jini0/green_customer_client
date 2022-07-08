// 7.7 mysql 연동해서 서버 구현!
// cf. https://blog.naver.com/pink_candy02/222626707638 :  고객센터 - 수정하기
import './App.css';
import CustomerList from './components/CustomerList';
import Footer from './components/Footer';
import Header from './components/Header';
import DetailCustomer from './components/DetailCustomer';
import { Route, Routes } from "react-router-dom";
import CreateCustomer from './components/CreateCustomer';
// import UpdateCustomer from './components/UpdateCustomer';
import EditCustomer from './components/EditCustomer';

// 1. 고객리스트 항목들을 여기 안에 걸로 불러오게 하기   --> 2. 이거를 빼고 mysql workbench에 넣은 데이터값(테이블 안의 값들)으로 바꿔서 넣어주자!
// const customers = [
//   {
//     no: 1,
//     name: "고객",
//     phone: "01012345678",
//     birth: "19920206",
//     gender: "여성",
//     add: "울산시 남구"
//   },
//   {
//     no: 2,
//     name: "그린",
//     phone: "01012345678",
//     birth: "19920206",
//     gender: "남성",
//     add: "울산시 동구"
//   },
//   {
//     no: 3,
//     name: "kh",
//     phone: "01012345678",
//     birth: "19920206",
//     gender: "여성",
//     add: "울산시 남구"
//   },
// ]

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* 1. 위에 적어준 customers배열의 값들로 넣어주기 */}
        {/* <Route path="/" element={<CustomerList customers={customers} />} /> */}
        {/* 2. 데이터베이스 값들로 고객리스트 넣어주기! */}
        <Route path="/" element={<CustomerList/>} />
        <Route path="/detailview/:no" element={ <DetailCustomer/>} />
        {/* <Route path="/customer/:no" element={ <DetailCustomer/>} /> */}
        <Route path="/write" element={<CreateCustomer/>} />
        <Route path="/editcustomer/:no" element={<EditCustomer />} />
        {/* <Route path="/update/:no" element={<UpdateCustomer />} /> */}
        


        {/* 위에 적은 customers변수(배열안에 객체가 있는 구조)를 props로 전달해주기 위해 여기에 적어줌!! */}
        {/* <CustomerList customers={customers} /> */}
        {/* <DetailCustomer/> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
