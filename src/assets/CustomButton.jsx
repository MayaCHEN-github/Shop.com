import React from 'react';

const CustomButton = ({ styleType='style1', buttonText = 'Button', onClick }) => {
  return (
    <button style={{ ...styles.button, ...styles[styleType] }} onClick={onClick}> 
      {buttonText}
    </button>
  );
};

const styles = {
    button: {
      fontFamily: 'Comfortaa',
      fontSize: '16px',
      padding: '10px 20px',
    },
    style1: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      height: '53px',
      boxShadow: '6px 9px 3px rgba(0, 0, 0, 0.7)',
      border: '2px solid #000000',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    style2: {
      backgroundColor: '#F28F33',
      borderRadius: '15px',
      height: '50px',
      boxShadow: '3px 5px 7px rgba(0, 0, 0, 0.05)',
      fontSize: '20px',
      border: 'none',
    },
    style3: {
      backgroundColor: '#FFE601',
      borderRadius: '15px',
      height: '50px',
      boxShadow: '3px 5px 7px rgba(0, 0, 0, 0.1)',
      fontSize: '20px',
      border: 'none',
    },
    style4: {
      backgroundColor: '#5AF241',
      height: '50px',
      fontSize: '20px',
      border: 'none',
    },
  };

export default CustomButton;
