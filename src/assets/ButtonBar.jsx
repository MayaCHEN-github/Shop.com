import React from 'react';

const Button = ({ label, onClick }) => (
  <button onClick={onClick} style={styles.button}>{label}</button>
);


const ButtonBar = ({ buttons }) => (
  <div style={styles.buttonbar}>
    {buttons.map((button, index) => (
      <React.Fragment key={index}>
        <Button label={button.label} onClick={button.onClick} />
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


