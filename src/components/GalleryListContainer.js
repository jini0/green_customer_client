// 🧡8.5 이미지 게시판 만들기
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config/apiurl';
import { getGallery } from '../modules/gallery';

const GalleryListContainer = (props) => {
    // 얘가 스토어에 접근하는애 --> container 컴포넌트는 스토어에 접근해서 데이터를 넘겨줘야함!
    const {data, error, loading} = useSelector(state=>state.gallery);
    const dispatch = useDispatch();
    //컴포넌트 마운트 후 게시글 요청하기
    useEffect(()=>{
        dispatch(getGallery(dispatch))
    },[dispatch])
    if(loading) return <div>로딩중입니다.</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return null
    return (
        <div>
            {/* 컴포넌트 따로 만들어서 props로 넘겨줘도 되고 지금처럼 여기에 바로 작성해줘도 됨(귀차나서..) */}
            <ul>
                {data.map(da=><li>
                    <img src={`${API_URL}/upload/${da.imgurl}`} width="300" alt="" />
                    <br/><span>{da.title}</span>
                </li>)}
            </ul>
        </div>
    );
};

export default GalleryListContainer;