import { useState } from "react";
import PropTypes from "prop-types";

const Toggle = (props) => {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Toggle;
