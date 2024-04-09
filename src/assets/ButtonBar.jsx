import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ label, to }) => (
  <Link to={to}>
    <button style={styles.button}>{label}</button>
  </Link>
);

const ButtonBar = ({ buttons }) => (
  <div style={styles.buttonbar}>
    {buttons.map((button, index) => (
      <React.Fragment key={index}>
        <Button label={button.label} to={button.to} />
        {index < buttons.length - 1 && ' | '}
      </React.Fragment>
    ))}
  </div>
);

const styles = {
    button: {
        border: 'none',
        background: 'none',
        fontFamily: 'Comfortaa',
        fontSize: '16px',
        color: 'white',
        padding: 0,
    },
    buttonbar: {
        border: 'none',
        background: 'none',
        fontFamily: 'Comfortaa',
        fontSize: '20px',
        justifyContent: 'center',
        padding: '10px'
    }
}

export default ButtonBar;


