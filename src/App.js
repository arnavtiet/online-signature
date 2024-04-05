import React, { useState, useRef } from "react";
import { FaRegSave } from "react-icons/fa";
import "./App.css";

import { BsFillEraserFill } from "react-icons/bs";
import Canvas from "./canvas/canvas";

function App() {
  const [size, Setsize] = useState(0);
  const [erase, Seterase] = useState(false);
  const [color, Setcolor] = useState("black");
  const [reset, Setreset] = useState(false);
  const [colorval, Setcolorval] = useState("color-button-black");
  const [toggle, Settoggle] = useState("erasoroff");
  const canvasRef = useRef();
  const clear = () => {
    if (color === "black") {
      Setcolor("blue");
      Setcolorval("color-button-blue");
    } else {
      Setcolor("black");
      Setcolorval("color-button-black");
    }
  };

  const change = () => {
    if (reset) {
      Setreset(false);
    } else {
      Setreset(true);
    }
  };

  const erasorbutton = () => {
    if (erase) {
      Seterase(false);
      Settoggle("erasoroff");
      console.log(toggle);
    } else {
      Seterase(true);
      Settoggle("erasoron");
      console.log(toggle);
    }
    console.log(erase);
  };
  const SaveButton = ({ saveImageToLocal }) => {
    return (
      <a onClick={saveImageToLocal}>
        Save
        <FaRegSave />
      </a>
    );
  };

  return (
    <div className="App">
      <div className="toolkit">
        <div className="color">
          <button className={colorval} onClick={clear}>
            {color}
          </button>
        </div>
        <h1>Text Size</h1>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={size}
          onChange={(e) => Setsize(e.target.value)}
        ></input>
        <button>
          <SaveButton
            saveImageToLocal={(event) =>
              canvasRef.current.saveImageToLocal(event)
            }
          />
        </button>

        <div className="tool-delete">
          <button onClick={erasorbutton} className={toggle}>
            <BsFillEraserFill />
          </button>
        </div>
        <button onClick={change}>CLEAR</button>
      </div>
      <div className="canvas">
        <Canvas
          canvasState={reset}
          colour={color}
          s={size}
          reset={reset}
          erase={erase}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}

export default App;
