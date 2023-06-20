import React from "react";
import "./button.css";

const Button = ({props, children}) => {

    console.log(props);
  return (
     <a>
        {children}
     </a>
  );
};

export default Button;
