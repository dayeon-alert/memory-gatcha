import { useEffect, useRef } from 'react';

function PersonLayerCanvas({canvasSize, paddingValue, rangeAlignValue, alignValue, onAlignChange, cropPersonImg, onPersonLayerChange}) {
  const CANVAS_WIDTH = canvasSize[0];
  const CANVAS_HEIGHT = canvasSize[1];
  const canvasRef = useRef(null);
  const imgPerson = new Image();
  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "copy";

    imgPerson.src = cropPersonImg;

    imgPerson.onload = function() {
      let personWidth = imgPerson.width / imgPerson.height * CANVAS_HEIGHT
      let personHeight = imgPerson.height / imgPerson.width * CANVAS_WIDTH
      if(personWidth > CANVAS_WIDTH) {
        personWidth = CANVAS_WIDTH * paddingValue / 100;
        personHeight = personHeight * paddingValue / 100;
      }
      else {
        personWidth = personWidth * paddingValue / 100;
        personHeight = CANVAS_HEIGHT * paddingValue / 100;
      }
      let tempAlignValue = rangeAlignValue;
      if(alignValue === -1) {
        tempAlignValue = personWidth * 100 / (CANVAS_WIDTH + personWidth);
      }
      else if(alignValue === 0) {
        tempAlignValue = 50
      }
      else if(alignValue === 1) {
        tempAlignValue = CANVAS_WIDTH * 100 / (CANVAS_WIDTH + personWidth);
      }
      onAlignChange(tempAlignValue);
      ctx.drawImage(imgPerson, -personWidth + ((CANVAS_WIDTH + personWidth) * tempAlignValue / 100), CANVAS_HEIGHT-personHeight, personWidth, personHeight);
      
      // rangeAlignValue에까지 해당 값을 반영할 경우, 소수점의 값은 제대로 반영이 되지 않아 오차가 발생.
      /*
      if(alignValue === null) {
        ctx.drawImage(imgPerson, -personWidth + ((CANVAS_WIDTH + personWidth) * rangeAlignValue / 100), CANVAS_HEIGHT-personHeight, personWidth, personHeight);
      }
      else if (alignValue === -1) {
        ctx.drawImage(imgPerson, 0, CANVAS_HEIGHT-personHeight, personWidth, personHeight);
      }
      else if (alignValue === 1) {
        ctx.drawImage(imgPerson, CANVAS_WIDTH - personWidth, CANVAS_HEIGHT-personHeight, personWidth, personHeight);
      }
      else if (alignValue === 0){
        ctx.drawImage(imgPerson, -personWidth + ((CANVAS_WIDTH + personWidth) * 50 / 100), CANVAS_HEIGHT-personHeight, personWidth, personHeight);
      }
      */
      onPersonLayerChange(canvasRef.current.toDataURL("image/png"));
    };
  });

  return (
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} style={{position: "absolute", left: 0, top: 0, zIndex: 1}}></canvas>
  )
}

export default PersonLayerCanvas