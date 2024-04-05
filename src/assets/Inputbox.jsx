import React, { useState } from "react";

const Inputbox = (props) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
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
        <input
            type={ props.type ||"text" }
            value={value}
            style={style}
            onChange={handleChange}
        />
    );
};

export default Inputbox;
