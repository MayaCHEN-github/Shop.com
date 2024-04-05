import React, { useState } from 'react';

const CustomDropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return isOpen ? (
        <div style={styles.container}>
            <div style={styles.triangle} />
            <div style={styles.list}>
                {children}
            </div>
        </div>
    ) : null;
};

const styles = {
    container: {
        position: 'relative',
        width: '200px',
        backgroundColor: '#D9D9D9',
        borderRadius: '15px',
        padding: '10px',
        fontFamily: 'Comfortaa, sans-serif',
        fontSize: '20px',
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #D9D9D9',
    },
    list: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '15px',
        padding: '10px',
    },
};

export default CustomDropdown;
