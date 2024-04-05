import React from "react";
import "./button.css";

const SaveButton = ({ saveImageToLocal }) => {
  return (
    <button className="savebutton" onClick={saveImageToLocal}>
      Save
    </button>
  );
};

export default SaveButton;
