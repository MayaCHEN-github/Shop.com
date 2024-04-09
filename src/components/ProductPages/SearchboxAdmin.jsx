import React, { useState } from 'react';
import Title from '../../assets/Title';

const SearchBox = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={styles.container}>
            <style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')</style>
            <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap')</style>
            <div style={styles.dropdownContainer}>
                <button onClick={() => setIsOpen(!isOpen)} style={styles.filterButton}>
                        <img src="src/assets/Search.svg" alt="Search" style={styles.icon}/> 
                </button>
            </div>
            <input type="text" style={styles.input} onChange={e => props.onSearch(e.target.value)} />
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#D9D9D9',
        borderRadius: '15px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        outline: 'none',
        width: '100%',
    },
    filterButton: {
        backgroundColor: 'transparent',
        borderRight: '1px solid #333333', 
        paddingRight: '10px',
        fontFamily: 'Inter',
        outline: 'none',
        border: 'none',
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '125%',
        left: 0,
        backgroundColor: '#D9D9D9',
        padding: '10px',
        minWidth: '120%',
        boxSizing: 'border-box',
        outline: 'none',
    },
    dropdownItem: {
        fontFamily: 'Comfortaa',
        backgroundColor: 'transparent',
        display: 'block', 
        whiteSpace: 'nowrap',
        outline: 'none',
        border: 'none',
    },
    input: {
        flex: 1,
        marginLeft: '10px',
        marginRight: '10px',
        border: 'none', 
        fontSize: '18px',
        backgroundColor: 'transparent',
        outline: 'none',
    },
    icon: {
        width: '30px', 
        height: '30px',
        fontFamily: 'Comfortaa',
    }
};

export default SearchBox;
