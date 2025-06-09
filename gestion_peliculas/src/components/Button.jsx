import React from "react";

const Button = ({ type = "button", onClick, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
};

export default Button;
