import { useState } from "react";

const Toggle = (props) => {
    const [visibility,setVisibility] = useState(false)

    const hideWhenVisible = {display:visibility?'none':''}
    const showWhenVisible = {display:visibility?'':'none'}

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

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
    )
}

export default Toggle