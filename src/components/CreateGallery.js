// 🧡8.5 이미지게시판
import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../config/apiurl';
import './GalleryStyle.css';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { getCookie } from '../util/cookie';
import { useNavigate } from 'react-router-dom';

const CreateGallery = (props) => {
    const navigate = useNavigate();
    const umail = getCookie("usermail");            //getCookie쓰면 어디에서든 쿠키 불러올 수 있음
    // 2. 이젠 객체로 만들어서 다 관리하는거
    const [ formData, setformData ] = useState({
        imgurl:"",
        title:"",
        desc:"",
        usermail:umail        //받아올거임 --> cookie에 메일주소가 저장되어 있음 --> 그걸 받아올거임!
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        })
    }

    // 1. 상태관리 하나만 한거
    // const [ uploadImg, setUploadImg ] = useState("");    
    const onChangeImage = (e) => {
        const { name } = e.target;
        // 전송을 하려면 form이 필요함  -- form데이터가 감싸서 서버로 전송하니까!!!!
        const imageFormData = new FormData();
        imageFormData.append(name, e.target.files[0]);
        // 서버의 upload폴더에 이미지를 저장하고 그 이미지를 사용하겠다!  --> 이미지 넣으면 서버에도 그 이미지가 자동 저장됨!
        axios.post(`${API_URL}/upload`, imageFormData, {
            Headers: {'content-type':'multipart/form-data'},    // ❣php에서 file전송시 form에 multipart/form-data를 지정해줘야했던거 처럼!!❣
        }).then(response=>{
            // setUploadImg(response.data.imageUrl)     // 1.
            setformData({
                ...formData,
                imgurl: response.data.imageUrl          // 2.
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }
    const onSubmitch = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/gallery`, formData)
        .then(res=>{
            alert('등록되었습니다.');
            navigate('/');
        }).catch(e=>{
            console.log(e);
        })
    }
    return (
        <div>
            {/* JoinForm.js에 있는거 가져오기 */}
            <h2>이미지 게시글 등록하기</h2>
            <form onSubmit={onSubmitch}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이메일</TableCell>
                            <TableCell>
                                <input name="usermail" type="text" 
                                value={formData.usermail}
                                onChange={onChange} readOnly />
                                {/* readOnly 보이기만 하고 값 변경 안됨  --> 로그인한 애만 등록할 수 있음! */}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이미지보기</TableCell>
                            <TableCell>
                                {/* 2. */}
                                <div className='imgDiv'>
                                    <div className='imgbox'></div>
                                    {/* 우선 input을 안보이게 할거임 */}
                                    {/* 이 input의 이미지가 바뀌면 post요청을 할거임 */}
                                    <input type="file" className="imginput" name="img" onChange={onChangeImage} />
                                    {/* upload이미지가 있으면 이미지를 나타내줘! 할거임 --> && */}
                                    {
                                        formData.imgurl && <img src={`${API_URL}/upload/${formData.imgurl}`} alt="" className='imgview'/>
                                    }
                                </div>    
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>제목</TableCell>
                            <TableCell>
                                <input name="title" type="text" 
                                value={formData.title}
                                onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>내용</TableCell>
                            <TableCell>
                                <input name="desc" type="text" 
                                value={formData.desc}
                                onChange={onChange} />
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
            {/* 1. '이미지보기'에 넣어주기 */}
            {/* <form>
                <div className='imgDiv'>
                    <div className='imgbox'></div>
                    <input type="file" className="imginput" name="img" onChange={onChangeImage} />
                    {
                        uploadImg && <img src={`${API_URL}/upload/${uploadImg}`} alt="" className='imgview'/>
                    }
                </div>    
            </form>        */}
        </div>
    );
};

export default CreateGallery;