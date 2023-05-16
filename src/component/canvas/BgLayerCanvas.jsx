import { React, useEffect, useRef } from 'react';

function BgLayerCanvas({background, canvasSize}) {
  // 가로 1280x720 400x300 4:3
  // 세로 720x900 400x500 4:5
  const CANVAS_WIDTH = canvasSize[0];
  const CANVAS_HEIGHT = canvasSize[1];
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef) return;
    const imgBackground = new Image();
    imgBackground.crossOrigin = 'Anonymous';
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "source-over";

    imgBackground.src = background;

    imgBackground.onload = function() {
      ctx.drawImage(imgBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }, [background, CANVAS_WIDTH, CANVAS_HEIGHT]
  );

  return (
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} style={{position: "absolute", left: 0, top: 0, zIndex: 0}}></canvas>
  )
}

export default BgLayerCanvas