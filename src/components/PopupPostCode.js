// https://blog.naver.com/pink_candy02/222803206842 (react 다음 주소 API사용하기) 선생님 블로그에서 그대로 가져오기!!!✔ 
// 우리가 만든게 아니고 다음에서 제공하는 API(주소제공하는 API 이용)를 붙인거라 그대로 코드 불러오고 실행되게만 해주면 됨
import React from 'react';
import DaumPostcode from "react-daum-postcode";
 
const PopupPostCode = (props) => {
    //cf. props 자리에 CreateCustomer.js에서 -> props로 담아준 closePostCode, onAddData 이 두개가 담겨있음?!
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        props.onAddData(data);          // onAddData가 실행됨! --> 여기에서 해주는거
        
    }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)',
        width: "600px",
        height: "600px",
        padding: "7px",
        border: "2px solid #666"
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} /> 
            <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>입력</button>
        </div>
    )
}
 
export default PopupPostCode;