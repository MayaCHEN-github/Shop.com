import React, { useState } from 'react';

const Modalbox = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Test Modalbox</button>
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeButton} onClick={handleClose}>
              <img src="src/assets/Close.svg" alt="Close" style={styles.icon}/>
              </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
    overlay: {
      zIndex: 1000, 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      position: 'relative',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '6px 6px 4px rgba(0, 0, 0, 0.5)',
      width: '80%',
      minHeight: '200px',
      maxHeight: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    content: {
      overflowY: 'auto',
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    icon: {
      width: '30px', 
      height: '30px' 
    }
};

export default Modalbox;
