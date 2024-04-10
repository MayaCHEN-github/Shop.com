import React from "react";
import { capitalize } from 'lodash';

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
        <input
            type={ props.type ||"text" }
            value={props.value}
            style={style}
            onChange={handleChange}
        />
    );
};

export const Textareabox = (props) => {
  const handleChange = (event) => {
      if (props.onChange) { 
          props.onChange(event); 
      }
  }

  const style = {
      borderRadius: '15px',
      backgroundColor: '#D9D9D9',
      height: '150px',
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

export const Selectbox = (props) => {
  const handleChange = (event) => {
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
      <select style={style} onChange={handleChange}>
          {props.options.map(
            option => props.selected === option 
              ? <option selected key={option} value={option}>{capitalize(option)}</option>
              : <option key={option} value={option}>{capitalize(option)}</option>)}
      </select>
  );
}

export default Inputbox;