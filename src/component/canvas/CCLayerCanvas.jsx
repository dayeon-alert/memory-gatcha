import { React, useEffect, useRef } from 'react';

function CCLayerCanvas({copyrightAlign, canvasSize}) {
  const CANVAS_WIDTH = canvasSize[0];
  const CANVAS_HEIGHT = canvasSize[1];
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "italic bold 24px Arial, sans-serif";
    ctx.fillStyle = 'white';
    ctx.textAlign = copyrightAlign[0] === -1 ? "left" : "right";
    const horizontalAlign = copyrightAlign[0] === -1 ? 0 : CANVAS_WIDTH;
    const verticalAlign = copyrightAlign[1] === -1 ? CANVAS_HEIGHT-40 : 40;
    ctx.fillText("  @j4nchun9  ", horizontalAlign, verticalAlign);
    ctx.strokeText("  @j4nchun9  ", horizontalAlign, verticalAlign);
    }
  );
  return (
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} style={{position: "absolute", left: 0, top: 0, zIndex: 2}}></canvas>
  )
}

export default CCLayerCanvas