// Importing the React library for creating React components
import React from "react";

// Importing the styles from the module file
import style from "../styles/style.module.css";

// Functional component named Chair, taking props as parameters
const Chair = ({ number, price, state, clickHandler }) => {
  // Returning JSX code for rendering a button
  return (
    <>
      {/* Button element with an onClick event handling function */}
      <button
        onClick={() => clickHandler(number)} // Invoking clickHandler with the 'number' parameter
        className={`${style["chair"]} ${style[`chair-${state}`]}`} // Applying dynamic styles based on 'state'
        title={`${price}`} // Displaying the 'price' as a tooltip
      >
        {number} {/* Displaying the 'number' inside the button */}
      </button>
    </>
  );
};

// Exporting the Chair component as the default export of this module
export default Chair;
