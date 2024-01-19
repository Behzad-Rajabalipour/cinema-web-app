// Importing the React library for creating React components
import React from "react";

// Importing the Chair component from the "./Chair" module
import Chair from "./Chair";

// Functional component named Section, taking props as parameters
export default function Section({ data, clickHandler, sectionStyle }) {
  // Returning JSX code for rendering a div element
  return (
    <div className={sectionStyle}>
      {
        // Mapping through the 'data' array to render Chair components
        data.map((chair) => (
          <Chair
            key={chair.number} // Assigning a unique key to each Chair component
            number={chair.number} // Passing the 'number' prop to the Chair component
            price={chair.price} // Passing the 'price' prop to the Chair component
            state={chair.state} // Passing the 'state' prop to the Chair component
            clickHandler={clickHandler} // Passing the 'clickHandler' prop to the Chair component
          />
        ))
      }
    </div>
  );
}
