import React from "react";

const Inputbox = (props) => {
    const handleChange = (event) => {
        // console.log("Input value: ", event.target.value); 
        if (props.onChange) { 
            props.onChange(event); 
        }

        
    }

    const style = {
        borderRadius: '15px',
        backgroundColor: '#D9D9D9',
        height: '60.17px',
        border: 'none',
        margin: props.margin || '10px',
        width: props.width || '100%' ,
        padding: '0 20px',
    };

    return (
        <textarea
            type={ props.type ||"text" }
            value={props.value}
            style={style}
            onChange={handleChange}
        />
    );
};

export default Inputbox;