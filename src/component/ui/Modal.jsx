import React from 'react';
import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import styled from "styled-components";

const ModalWrap = styled.div`
  background-color:rgba(0,0,0,.3);
  display: flex;
  justify-content:center;
  align-items:center;
  position:fixed;      
  top:0;
  left:0;
  right:0;
  bottom:0;
  padding:15px;
  z-index:3;
`;

const ModalWindow = styled.div`
  max-width: 700px;
  width: 100%;
  border-radius:10px;
  overflow:hidden;
  background-color:cadetblue;
  box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3); 
`;

const ModalHead = styled.div`
  height:50px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  padding: 0px 16px;
`;

const BtnClose = styled.span`
  color:#ffffff;
  cursor:pointer;
`;

const ModalBody = styled.div`
  width:100%;
  background-color:#ffffff;
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:32px 48px 24px;
  text-align: center;
  word-break:break-word;
  min-height:100px;
  color: darkslategray;
  @media screen and (max-width: 450px) {
    padding:32px 24px 24px;
  }
`
const ModalFoot = styled.div`
  width:100%;
  height:50px;
  display: flex;
  justify-content: stretch;
`
const ModalBtn = styled.a`
  display: inline-flex;
  height:100%;               
  justify-content:center;        
  align-items:center;    
  color:#ffffff;        
  cursor:pointer;
  flex-grow: 1;
`

const UploadBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`

const DragFile = styled.label`
  position: relative;
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed #dbdbdb;
`

const InputFile = styled.input`
  display: none;
`

const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-evenly;
`

const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 4px;
`

function Modal({setModalOpen, onImgChange}) {
  const cropperRef = useRef(null);
  const [inputImage, setInputImage] = useState(null);
  const [dragOpen, setDragOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChange = (e) => {
    setInputImage(URL.createObjectURL(e.target.files[0]));
    setDragOpen(false);
  }

  const bgFreeHandler = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.setAspectRatio(null);
  }

  const bgHorizontalHandler = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.setAspectRatio(16/9);
  }

  const bgVerticalHandler = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.setAspectRatio(4/5);
  }

  const bgSquareHandler = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.setAspectRatio(1)
  }

  const onInit = () => {
    setInputImage(null);
    setDragOpen(true);
  }

  const onApply = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    onImgChange(cropper.getCroppedCanvas().toDataURL());
    closeModal();
  }

  return (
    <ModalWrap>
        <ModalWindow>
            <ModalHead>
                <span className="head-title">이미지 업로드</span>
                <BtnClose onClick={closeModal}>✖️</BtnClose>
            </ModalHead>
            <ModalBody>
                <ContentBox>
                  <UploadBox>
                    {dragOpen 
                    ? <DragFile className="file-label" htmlFor="chooseFile">
                        <InputFile id="chooseFile" type="file" onChange={onChange} accept="image/png, image/jpeg, image/gif"></InputFile>
                        <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일 아이콘" className="image" width="40px"></img>
                          사진을 업로드해주세요.
                      </DragFile>
                    : <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "90%" }}
                        src={inputImage}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                        // null은 자유, 1은 정사각형
                      />}
                  </UploadBox>
                  <StyleContainer>
                    <MenuIcon alt="" src="/image/crop_landscape.svg" onClick={bgFreeHandler}></MenuIcon>
                    <MenuIcon alt="" src="/image/crop_16_9.svg" onClick={bgHorizontalHandler}></MenuIcon>
                    <MenuIcon alt="" src="/image/crop_portrait.svg" onClick={bgVerticalHandler}></MenuIcon>
                    <MenuIcon alt="" src="/image/crop_square.svg" onClick={bgSquareHandler}></MenuIcon>
                  </StyleContainer>
                </ContentBox>
            </ModalBody>
            <ModalFoot>
                <ModalBtn onClick={onInit}>초기화</ModalBtn>
                <ModalBtn onClick={onApply}>적용</ModalBtn>
            </ModalFoot>
        </ModalWindow>
    </ModalWrap>
  )
}

export default Modal