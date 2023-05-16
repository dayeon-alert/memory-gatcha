// Input 너비 수정

import React from 'react'
import { useState } from 'react';
import styled, { keyframes } from "styled-components";
import Modal from '../ui/Modal';
import MergeCanvas from '../canvas/MergeCanvas';
import BgLayerCanvas from '../canvas/BgLayerCanvas';
import PersonLayerCanvas from '../canvas/PersonLayerCanvas';
import CCLayerCanvas from '../canvas/CCLayerCanvas';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UiContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`

const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 4px;
  cursor: pointer;
`

const StyleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 80%;
  flex-direction: column;
  color: darkslategray;;
  border-radius: 4px;
  background: lightblue;
  padding: 16px;
  font-size: 14px;
  font-weight: bold;
  max-width: 368px;
`

const StyleDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const StyleGroupContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
`

const StyleOneContainer = styled.div`
  width: 50%;
  min-width: fit-content;
  margin-bottom: 8px;
`

const MergeImg = styled.img`
  width: 90%;
  max-width: ${(props) => props.canvasWidth <= 720 ? "400px" : "600px"};
  border-radius: 10px;
  margin-bottom: 16px;
`

const CanvasContainer = styled.div`
  display: none;
  position: relative;
  width: 400px;
  height: 500px;
`

const animationGlow = keyframes`
  0%{
    background-position: 0 0;
  }
  50%{ 
    background-position: 400% 0;
  }
  100%{
    background-position: 0 0;
  }
`;

const BtnMini = styled.button`
  margin: 14px;
  width: 80px;
  padding: 8px 0px;  
  font-size: 12px;
  color: #5F9CEC;
  background-color: #fff;
  border: 1px solid #5F9CEC;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    top: 1px;
    border-color: rgba(0,0,0,0.34) rgba(0,0,0,0.21) rgba(0,0,0,0.21);
    box-shadow: 0 1px 0 rgba(255,255,255,0.89),0 1px rgba(0,0,0,0.05) inset;
    position: relative;
  }
`

const BtnGradient = styled.button`
  margin: 14px;
  width: 104px;
  padding: 8px 0px;
  background: #5F9CEC;
  border: 1px solid #5F9CEC;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  z-index: 0;
  color: #fff;
  font-size: 14px;
  &:hover {
    opacity: 0.7;
  }
`

const BtnGradientGlow = styled.button`
  margin: 14px;
  width: 104px;
  padding: 8px 0px;
  position: relative;
  z-index: 0;
  border: 1px solid #5F9CEC;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  touch-action: manipulation;
  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${animationGlow} 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 5px;
  }
  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(315deg, #fc00ff 0%, rgba(118,174,241,1) 74%);
    left: 0;
    top: 0;
    border-radius: 5px;
  }
  &:hover {
    opacity: 0.7;
  }
`

const InputNum = styled.input`
  width: 32px;
  text-align: right;
  margin-left: 8px;
`

const InputAlign = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    border-radius:10px;
    background: #4776e6; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #8e54e9,
      #4776e6
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #8e54e9,
      #4776e6
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height: 7.5px;
  }

  &:focus {
    outline: none;
  }

  &::-moz-range-track {
    -moz-appearance: none;
    background: rgba(59, 173, 227, 1);
    background: -moz-linear-gradient(
      45deg,
      rgba(59, 173, 227, 1) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgba(255, 53, 127, 1) 100%
    );
    background: -webkit-gradient(
      left bottom,
      right top,
      color-stop(0%, rgba(59, 173, 227, 1)),
      color-stop(25%, rgba(87, 111, 230, 1)),
      color-stop(51%, rgba(152, 68, 183, 1)),
      color-stop(100%, rgba(255, 53, 127, 1))
    );
    background: -webkit-linear-gradient(
      45deg,
      rgba(59, 173, 227, 1) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgba(255, 53, 127, 1) 100%
    );
    background: -o-linear-gradient(
      45deg,
      rgba(59, 173, 227, 1) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgba(255, 53, 127, 1) 100%
    );
    background: -ms-linear-gradient(
      45deg,
      rgba(59, 173, 227, 1) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgba(255, 53, 127, 1) 100%
    );
    background: linear-gradient(
      45deg,
      rgba(59, 173, 227, 1) 0%,
      rgba(87, 111, 230, 1) 25%,
      rgba(152, 68, 183, 1) 51%,
      rgba(255, 53, 127, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
    height: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 2px solid;
    border-color: rgb(152, 68, 183);
    border-radius: 50%;
    height: 20px;
    width: 20px;
    max-width: 80px;
    position: relative;
    bottom: 6px;
    background-color: white;
    cursor: -webkit-grab;

    -webkit-transition: border 1000ms ease;
    transition: border 1000ms ease;
  }

  &::-moz-range-thumb {
    -moz-appearance: none;
    border: 2px solid;
    border-color: rgb(152, 68, 183);
    border-radius: 50%;
    height: 16px;
    width: 16px;
    max-width: 80px;
    position: relative;
    bottom: 11px;
    background-color: white;
    cursor: -moz-grab;
    -moz-transition: border 1000ms ease;
    transition: border 1000ms ease;
  }

  &::-webkit-slider-thumb:active {
    cursor: -webkit-grabbing;
  }

  &::-moz-range-thumb:active {
    cursor: -moz-grabbing;
  }
`
const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: darkslateblue;
  margin-bottom: 16px;
`

const Doors = styled.div`
  display: flex;
`

const Door = styled.div`
  background: #fafafa;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.4) inset;

  width: 64px;
  height: 80px;
  overflow: hidden;
  margin: 1ch;
`

const emojiMap = {
  "🎠": "amusement park",
  "🏖️": "beach",
  "🚍": "bus window",
  "☕": "cafe",
  "🌸": "cherry blossom",
  "🏙️": "city",
  "🏜️": "desert",
  "🌆": "sunset",
  "🔥": "campfire",
  "🌼": "blossom",
  "🌲": "forest",
  "🖼️": "landscape",
  "📙": "library",
  "🌫️": "mist",
  "⛰️": "mountain",
  "🌙": "night",
  "🌈": "rainbow",
  "🌊": "sea",
  "⛄️": "winter",
  "🌠": "star",
  "🚉": "subway",
  "☀️": "afternoon",
}

function init(firstInit = true, groups = 1, duration = 1) {
  const doors = document.querySelectorAll(".door");
  let randomKey = [];
  
  for (const door of doors) {
    if (firstInit) {
      door.dataset.spinned = "0";
    }

    const boxes = door.querySelector(".boxes");
    const boxesClone = boxes.cloneNode(false);

    const pool = ["❓"];
    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...Object.keys(emojiMap));
      }
      pool.push(...shuffle(arr));

      boxesClone.addEventListener(
        "transitionstart",
        function () {
          door.dataset.spinned = "1";
          this.querySelectorAll(".box").forEach((box) => {
            box.style.filter = "blur(1px)";
          });
        },
        { once: true }
      );

      boxesClone.addEventListener(
        "transitionend",
        function () {
          this.querySelectorAll(".box").forEach((box, index) => {
            box.style.filter = "blur(0)";
            if (index > 0) this.removeChild(box);
          });
        },
        { once: true }
      );
    }

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = door.clientWidth + "px";
      box.style.height = door.clientHeight + "px";
      box.textContent = pool[i];
      boxesClone.appendChild(box);
    }
    randomKey.push(emojiMap[pool[pool.length - 1]]);
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
    boxesClone.style.transform = `translateY(-${
      door.clientHeight * (pool.length - 1)
    }px)`;
    door.replaceChild(boxesClone, boxes);
  }
  return randomKey;
}

async function handleSpin() {
  const doors = document.querySelectorAll(".door");
  const randomKey = init(false, 1, 2);
  for (const door of doors) {
    const boxes = door.querySelector(".boxes");
    const duration = parseInt(boxes.style.transitionDuration);
    boxes.style.transform = "translateY(0)";
    await new Promise((resolve) => setTimeout(resolve, duration * 100));
  }
  return randomKey;
}

function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

function MainPage() {
  // 가로 1280 x 720 16:9 400x300 4:3
  // 세로 720 x 900 400x500 4:5
  const [modalOpen, setModalOpen] = useState(false);
  const [bgModalOpen, setBgModalOpen] = useState(false);
  const [cropPersonImg, setCropPersonImg] = useState(null);
  const [rangeAlignValue, setRangeAlignValue] = useState(50);
  const [rangePaddingValue, setRangePaddingValue] = useState(75);
  const [cropBgImg, setCropBgImg] = useState("./image/initBackground.png");
  const [personLayer, setPersonLayer] = useState("");
  const [urlMergeData, setUrlMergeData] = useState("");
  const [copyrightAlign, setCopyrightAlign] = useState([1, 1]);
  const [personAlign, setPersonAlign] = useState(null);
  const [canvasSize, setCanvasSize] = useState([1280, 720]);

  const showModal = () => {
    setModalOpen(true);
  };

  const showBgModal = () => {
    setBgModalOpen(true);
  };

  const personImgCropHandler = (targetImg) => {
    setCropPersonImg(targetImg);
  }

  const bgImgCropHandler = async (targetImg) => {
    let targetImgSrc = targetImg;

    if(targetImgSrc === null) {
      const randomKey = await handleSpin();
      // ?sig=${Math.floor(Math.random() * 100) + 1} -> sig를 적용할 경우 여러 개의 키워드 중 하나만 기준으로 검색
      targetImgSrc = `https://source.unsplash.com/random/${canvasSize[0]}x${canvasSize[1]}/?${randomKey[0]},${randomKey[1]},${randomKey[2]}}`
    }

    setCropBgImg(targetImgSrc);
  }

  const alignRangeValueHandler = (align, e) => {
    let sAlignValue = align;
    if(align === null){
      sAlignValue = e.target.value.length > 5 ? e.target.value.substr(0, 5) : e.target.value;
    }
    sAlignValue = sAlignValue <= 100 ? sAlignValue : 100;

    setPersonAlign(null);
    setRangeAlignValue(sAlignValue);
  };

  const alignValueHandler = (align, e) => {
    setPersonAlign(align);
  }

  const paddingRangeValueHandler = (ratio, e) => {
    let sPaddingValue = ratio !== null ? ratio : e.target.value;
    sPaddingValue = sPaddingValue > 0 ? parseInt(sPaddingValue) : 1;
    sPaddingValue = sPaddingValue <= 200 ? parseInt(sPaddingValue) : 200;
    setRangePaddingValue(sPaddingValue);
  };

  const personLayerHandler = (personLayer) => {
    setPersonLayer(personLayer)
  }

  const urlMergeHandler = (urlMergeData) => {
    setUrlMergeData(urlMergeData);
  }

  const downloadImgHandler = () => {
    const $link = document.createElement("a");
    $link.download = "Memory_Gatcha.png";
    $link.href = urlMergeData;
    
    $link.click();
  }

  const bgCanvasSizeHandler = (arrCanvasSize) => {
    setCanvasSize(arrCanvasSize)
  }

  const ccLocateHandler = (ccLocate) => {
    setCopyrightAlign(ccLocate);
  }

  return (
    <MainContainer>
      <UiContainer>
        <BtnMini onClick={showModal}>사진 업로드</BtnMini>
        <BtnMini onClick={showBgModal}>배경 업로드</BtnMini>
      </UiContainer>
      <StyleContainer>
        <StyleGroupContainer>
          <StyleOneContainer>
            배경
            <StyleDetailContainer>
              <MenuIcon alt="" src="/image/crop_16_9.svg" onClick={(e) => {bgCanvasSizeHandler([1280, 720], e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/crop_portrait.svg" onClick={(e) => {bgCanvasSizeHandler([720, 900], e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/crop_square.svg" onClick={(e) => {bgCanvasSizeHandler([720, 720], e)}}></MenuIcon>
            </StyleDetailContainer>
          </StyleOneContainer>
          <StyleOneContainer>
            출처
            <StyleDetailContainer>
              <MenuIcon alt="" src="/image/position_top_left.svg" onClick={(e) => {ccLocateHandler([-1, 1], e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/position_bottom_left.svg" onClick={(e) => {ccLocateHandler([-1, -1], e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/position_top_right.svg" onClick={(e) => {ccLocateHandler([1, 1], e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/position_bottom_right.svg" onClick={(e) => {ccLocateHandler([1, -1], e)}}></MenuIcon>
            </StyleDetailContainer>
          </StyleOneContainer>
        </StyleGroupContainer>
        <StyleGroupContainer>
          <StyleOneContainer>
            정렬
            <StyleDetailContainer>
              <MenuIcon alt="" src="/image/align_horizontal_left.svg" onClick={(e) => {alignValueHandler(-1, e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/align_horizontal_center.svg" onClick={(e) => {alignValueHandler(0, e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/align_horizontal_right.svg" onClick={(e) => {alignValueHandler(1, e)}}></MenuIcon>
              <InputNum value={rangeAlignValue} type='number' min='0' max='100' step="0.1" onChange={e => {alignRangeValueHandler(null, e);}} />%
            </StyleDetailContainer>
            <InputAlign type="range" min="0" max="100" value={rangeAlignValue} 
              onChange={e => {alignRangeValueHandler(null, e);}}></InputAlign>
          </StyleOneContainer>
          <StyleOneContainer>
            너비
            <StyleDetailContainer>
              <MenuIcon alt="" src="/image/width_normal.svg" onClick={(e) => {paddingRangeValueHandler(50, e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/width_wide.svg" onClick={(e) => {paddingRangeValueHandler(75, e)}}></MenuIcon>
              <MenuIcon alt="" src="/image/width_full.svg" onClick={(e) => {paddingRangeValueHandler(100, e)}}></MenuIcon>
              <InputNum value={rangePaddingValue} type='number' min='1' max='200' onChange={e => {paddingRangeValueHandler(null, e);}}/>%
            </StyleDetailContainer>
            <InputAlign type="range" min="1" max="100" value={rangePaddingValue} 
            onChange={e => {paddingRangeValueHandler(null, e);}}></InputAlign>
          </StyleOneContainer>
        </StyleGroupContainer>
      </StyleContainer>
      <UiContainer>
        <BtnGradient onClick={downloadImgHandler}>다운로드</BtnGradient>
        <BtnGradientGlow onClick={(e) => {bgImgCropHandler(null, e)}}>가챠!</BtnGradientGlow>
      </UiContainer>
      <CanvasContainer>
        <BgLayerCanvas canvasSize={canvasSize} background={cropBgImg}></BgLayerCanvas>
        <PersonLayerCanvas canvasSize={canvasSize} paddingValue={rangePaddingValue} rangeAlignValue={rangeAlignValue} alignValue={personAlign} onAlignChange={alignRangeValueHandler} cropPersonImg={cropPersonImg} onPersonLayerChange={personLayerHandler} personLayer={personLayer}></PersonLayerCanvas>
        <CCLayerCanvas canvasSize={canvasSize} copyrightAlign={copyrightAlign}></CCLayerCanvas>
      </CanvasContainer>
      <SlotContainer>
        <Doors className="doors">
          <Door className="door">
            <div className="boxes">
              <div className="box" style={{width: "64px", height: "80px", filter: "blur(0px)"}}>❓</div>
            </div>
          </Door>
          <Door className="door">
            <div className="boxes">
              <div className="box" style={{width: "64px", height: "80px", filter: "blur(0px)"}}>❓</div>
            </div>
          </Door>
          <Door className="door">
            <div className="boxes">
              <div className="box" style={{width: "64px", height: "80px", filter: "blur(0px)"}}>❓</div>
            </div>
          </Door>
        </Doors>
      </SlotContainer>
      <MergeCanvas canvasSize={canvasSize} background={cropBgImg} personLayer={personLayer} copyrightAlign={copyrightAlign} urlMergeData={urlMergeData} onMergeChange={urlMergeHandler}></MergeCanvas>
      <MergeImg src={urlMergeData} canvasWidth={canvasSize[0]} alt=""></MergeImg>
      {modalOpen && <Modal setModalOpen={setModalOpen} targetImg={cropPersonImg} onImgChange={personImgCropHandler}/>}
      {bgModalOpen && <Modal setModalOpen={setBgModalOpen} targetImg={cropBgImg} onImgChange={bgImgCropHandler}/>}
    </MainContainer>
  )
}

export default MainPage