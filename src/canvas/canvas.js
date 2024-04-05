import React from "react";

import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Canvas = forwardRef((props, ref) => {
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setisDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.linecap = "round";

    context.lineWidth = props.s;
    contextRef.current = context;
    if (props.canvasState.reset) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      console.log("Canvas has been reset");
    }
  }, [props.canvasState]);

  const startDraw = ({ nativeEvent }) => {
    if (props.colour === "blue") {
      contextRef.current.strokeStyle = "blue";
    } else {
      contextRef.current.strokeStyle = "black";
    }
    contextRef.current.lineWidth = props.s;

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setisDrawing(true);
  };
  const stopDraw = () => {
    contextRef.current.closePath();
    contextRef.current.lineWidth = props.s;

    setisDrawing(false);
  };

  const Draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    if (props.erase) {
      contextRef.current.globalCompositeOperation = "source-over";
    }

    if (!props.erase) {
      contextRef.current.globalCompositeOperation = "destination-out";
    }
    contextRef.current.lineWidth = props.s;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  useImperativeHandle(ref, () => ({
    saveImageToLocal(event) {
      let link = event.currentTarget;
      link.setAttribute("download", "canvas.png");

      let image = canvasRef.current.toDataURL("image/png");
      link.setAttribute("href", image);
    },
  }));

  return (
    <canvas
      onMouseDown={startDraw}
      onMouseUp={stopDraw}
      onMouseMove={Draw}
      ref={canvasRef}
    ></canvas>
  );
});

export default Canvas;
