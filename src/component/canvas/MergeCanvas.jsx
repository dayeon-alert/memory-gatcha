import React from 'react'
import { useEffect, useRef } from 'react';

function MergeCanvas({background, personLayer, copyrightAlign, onMergeChange, canvasSize}) {
  const CANVAS_WIDTH = canvasSize[0];
  const CANVAS_HEIGHT = canvasSize[1];
  const canvasRef = useRef(null);
  const imgBackground = new Image();
  const imgPerson = new Image();
  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    imgBackground.crossOrigin = 'Anonymous';
    imgPerson.crossOrigin = 'Anonymous';
    imgBackground.src = background;
    imgPerson.src = personLayer;

    imgBackground.onload = function() {
      ctx.drawImage(imgBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(imgPerson, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.font = "italic bold 32px Arial, sans-serif";
      ctx.fillStyle = 'white';
      ctx.textAlign = copyrightAlign[0] === -1 ? "left" : "right";
      const horizontalAlign = copyrightAlign[0] === -1 ? 0 : CANVAS_WIDTH;
      const verticalAlign = copyrightAlign[1] === -1 ? CANVAS_HEIGHT-40 : 40;
      ctx.fillText("  @j4nchun9  ", horizontalAlign, verticalAlign);
      ctx.strokeText("  @j4nchun9  ", horizontalAlign, verticalAlign);
      onMergeChange(canvasRef.current.toDataURL("image/png"));
    }

    imgPerson.onload = function() {
      ctx.drawImage(imgBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(imgPerson, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.font = "italic bold 32px Arial, sans-serif";
      ctx.fillStyle = 'white';
      ctx.textAlign = copyrightAlign[0] === -1 ? "left" : "right";
      const horizontalAlign = copyrightAlign[0] === -1 ? 0 : CANVAS_WIDTH;
      const verticalAlign = copyrightAlign[1] === -1 ? CANVAS_HEIGHT-40 : 40;
      ctx.fillText("  @j4nchun9  ", horizontalAlign, verticalAlign);
      ctx.strokeText("  @j4nchun9  ", horizontalAlign, verticalAlign);
      onMergeChange(canvasRef.current.toDataURL("image/png"));
    };
  });

  return (
    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} style={{display: "none"}}></canvas>
  )
}

export default MergeCanvas